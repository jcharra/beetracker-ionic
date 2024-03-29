import { Injectable } from "@angular/core";
import { Database, objectVal, remove } from "@angular/fire/database";
import { ref, update } from "firebase/database";
import { first, map, switchMap } from "rxjs/operators";
import { AuthService } from "../pages/auth/auth.service";

export enum Race {
  CARNICA = "CARNICA",
  BUCKFAST = "BUCKFAST",
  DARK_BEE = "DARK_BEE",
  CAUCASUS = "CAUCASUS",
  AFRICAN = "AFRICAN",
  OTHER = "OTHER",
  UNKNOWN = "UNKNOWN",
}
export interface QueenStatus {
  birthYear: number;
  lastSeen?: Date | string;
  eggsSeen?: Date | string;
  race?: Race;
}

@Injectable({
  providedIn: "root",
})
export class QueenService {
  constructor(private db: Database, private authService: AuthService) {}

  getStatus(colonyId: string) {
    return this.authService.getUser().pipe(
      first(),
      switchMap((user) => {
        return objectVal(ref(this.db, `/users/${user.uid}/queen/${colonyId}`), {
          keyField: "id",
        }).pipe(
          map((status: any) => {
            if (!status) {
              return null;
            }

            return {
              birthYear: status.birthYear,
              lastSeen: status.lastSeen ? new Date(status.lastSeen) : null,
              eggsSeen: status.eggsSeen ? new Date(status.eggsSeen) : null,
              race: status.race,
            };
          })
        );
      })
    );
  }

  saveStatus(colonyId: string, status: QueenStatus) {
    return this.authService.getUser().pipe(
      first(),
      switchMap((user) => {
        return update(ref(this.db, `/users/${user.uid}/queen/${colonyId}`), {
          birthYear: status.birthYear,
          lastSeen: status.lastSeen ? new Date(status.lastSeen).toISOString() : null,
          eggsSeen: status.eggsSeen ? new Date(status.eggsSeen).toISOString() : null,
          race: status.race,
        });
      })
    );
  }

  clearStatus(colonyId: string) {
    return this.authService.getUser().pipe(
      first(),
      switchMap((user) => {
        return remove(ref(this.db, `/users/${user.uid}/queen/${colonyId}`));
      })
    );
  }
}
