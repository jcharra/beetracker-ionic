import { ColonyStatusInfo } from "./ColonyStatus";
import { JournalEntry } from "./JournalEntry";

export enum ActivityStatus {
  ACTIVE = "ACTIVE",
  DECEASED = "DECEASED",
  SOLD = "SOLD",
}

export interface Swarm {
  id?: string;
  name: string;
  created: Date;
  statusInfo?: ColonyStatusInfo;
  lastAction?: JournalEntry;
  activityStatus?: ActivityStatus;
}