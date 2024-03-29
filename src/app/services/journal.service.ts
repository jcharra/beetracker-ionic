import { Injectable } from "@angular/core";
import { Database, endAt, listVal, objectVal, remove, startAt } from "@angular/fire/database";
import { limitToLast, orderByChild, push, query, ref, update } from "firebase/database";
import { from, Observable, of } from "rxjs";
import { first, map, switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "../pages/auth/auth.service";
import { JournalEntry } from "../types/JournalEntry";
import { LocalStorageKey, StorageSyncService } from "./storage-sync.service";

interface QueryConfig {
  limit?: number;
  startAt?: string;
  endAt?: string;
}

const DIGEST_SIZE = 20;

@Injectable({
  providedIn: "root",
})
export class JournalService {
  private entryCacheForColony = new Map<string, JournalEntry[]>();

  constructor(private db: Database, private authService: AuthService, private storageSync: StorageSyncService) {}

  getDigest(swarmId: string) {
    return from(this.storageSync.getFromStorage(LocalStorageKey.JOURNAL_ENTRIES, swarmId)).pipe(
      switchMap((entries) => {
        if (entries) {
          return of(entries);
        } else {
          return this.getEntries(swarmId, { limit: DIGEST_SIZE }).pipe(
            tap((entries) => {
              this.storageSync.writeToStorage(LocalStorageKey.JOURNAL_ENTRIES, entries, swarmId);
            })
          );
        }
      })
    );
  }

  getEntries(swarmId: string, config: QueryConfig = {}): Observable<JournalEntry[]> {
    const startAtDate = config.startAt || "2000-01-01";
    const endAtDate = config.endAt || "2050-12-31";
    const limit = config.limit || 1000;

    const cacheKey = `${swarmId}_${startAtDate}_${endAtDate}_${limit}`;
    return this.authService.getUser().pipe(
      switchMap((user) => {
        const cached = this.entryCacheForColony.get(cacheKey);

        if (cached) {
          return of(cached);
        }

        const entries = listVal(
          query(
            ref(this.db, `/users/${user.uid}/journals/${swarmId}/entries`),
            orderByChild("date"),
            startAt(startAtDate),
            endAt(endAtDate),
            limitToLast(limit)
          ),
          {
            keyField: "id",
          }
        ).pipe(
          take(1),
          map((data: any[]) => {
            if (!data) {
              return [];
            }

            const entries: JournalEntry[] = [];
            for (let i = 0; i < data.length; i++) {
              const item: any = data[i];
              entries.unshift({
                ...item,
                date: new Date(item.date),
              });
            }

            entries.sort((a, b) => {
              return a.date < b.date ? 1 : -1;
            });

            return limit > -1 ? entries.splice(0, limit) : entries;
          })
        );
        return entries;
      }),
      tap((entries: JournalEntry[]) => {
        this.entryCacheForColony.set(cacheKey, entries);
      })
    );
  }

  getEntry(swarmId: string, entryId: string): Observable<JournalEntry> {
    return this.authService.getUser().pipe(
      first(),
      switchMap((user) => {
        return objectVal(ref(this.db, `/users/${user.uid}/journals/${swarmId}/entries/${entryId}`), {
          keyField: "id",
        }).pipe(
          map((entry: any) => {
            if (!entry) {
              return null;
            }

            return {
              id: entry.id,
              text: entry.text,
              type: entry.type,
              date: new Date(entry.date),
              amount: entry.amount,
            };
          })
        );
      })
    );
  }

  createEntry(swarmId: string, entry: JournalEntry): Observable<any> {
    return this.authService.getUser().pipe(
      switchMap((user) => {
        this.clearCacheForColony(swarmId);

        const fbEntry = this.convertToFirebaseEntry(entry);
        return push(ref(this.db, `/users/${user.uid}/journals/${swarmId}/entries`), fbEntry);
      })
    );
  }

  updateEntry(swarmId: string, entry: JournalEntry) {
    return this.authService.getUser().pipe(
      switchMap((user) => {
        this.clearCacheForColony(swarmId);

        const fbEntry = this.convertToFirebaseEntry(entry);

        return update(ref(this.db, `/users/${user.uid}/journals/${swarmId}/entries/${fbEntry.id}`), fbEntry);
      })
    );
  }

  deleteEntry(swarmId: string, id: string) {
    return this.authService.getUser().pipe(
      switchMap((user) => {
        this.clearCacheForColony(swarmId);

        if (!id) {
          console.error("Delete without ID");
          return;
        }

        return remove(ref(this.db, `/users/${user.uid}/journals/${swarmId}/entries/${id}`));
      })
    );
  }

  private clearCacheForColony(colonyId: string) {
    const deletable = [];
    for (let k of this.entryCacheForColony.keys()) {
      if (k.startsWith(colonyId)) {
        deletable.push(k);
      }
    }
    deletable.forEach((d) => this.entryCacheForColony.delete(d));
    this.storageSync.clearFromStorage(LocalStorageKey.JOURNAL_ENTRIES, colonyId);
  }

  private convertToFirebaseEntry(e: JournalEntry) {
    const clone: any = { ...e };
    clone.date = new Date(e.date).toISOString();
    return clone;
  }
}
