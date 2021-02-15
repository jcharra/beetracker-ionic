export enum EntryType {
  // all varroa actions
  VARROA_CHECK_START = "VARROA_CHECK_START",
  VARROA_CHECK_END = "VARROA_CHECK_END",

  VARROA_TREATMENT = "VARROA_TREATMENT",

  // all frame actions
  FRAMES_HONEY_REMOVED = "FRAMES_HONEY_REMOVED",
  FRAMES_HONEY_INSERTED = "FRAMES_HONEY_INSERTED",
  FRAMES_DRONE_REMOVED = "FRAMES_DRONE_REMOVED",
  FRAMES_DRONE_INSERTED = "FRAMES_DRONE_INSERTED",
  FRAMES_EMPTY_PANEL_REMOVED = "FRAMES_EMPTY_PANEL_REMOVED",
  FRAMES_EMPTY_PANEL_INSERTED = "FRAMES_EMPTY_PANEL_INSERTED",
  FRAMES_EMPTY_COMBS_REMOVED = "FRAMES_EMPTY_COMBS_REMOVED",
  FRAMES_EMPTY_COMBS_INSERTED = "FRAMES_EMPTY_COMBS_INSERTED",
  FRAMES_BROOD_REMOVED = "FRAMES_BROOD_REMOVED",
  FRAMES_BROOD_INSERTED = "FRAMES_BROOD_INSERTED",
  FRAMES_FOOD_REMOVED = "FRAMES_FOOD_REMOVED",
  FRAMES_FOOD_INSERTED = "FRAMES_FOOD_INSERTED",

  FRAMES_BROOD_COUNTED = "FRAMES_BROOD_COUNTED",

  // all queen actions
  QUEEN_SPOTTED = "QUEEN_SPOTTED",
  QUEEN_ADDED = "QUEEN_ADDED",
  QUEEN_DECEASED = "QUEEN_DECEASED",
  QUEEN_EGGS_SPOTTED = "QUEEN_EGGS_SPOTTED",

  // food actions
  FOOD_ADDED = "FOOD_ADDED",
  WEIGHT_MEASURED = "WEIGHT_MEASURED",
}

export const actionsForType = {
  queen: [
    EntryType.QUEEN_SPOTTED,
    EntryType.QUEEN_ADDED,
    EntryType.QUEEN_DECEASED,
    EntryType.QUEEN_EGGS_SPOTTED,
  ],
  varroa: [
    EntryType.VARROA_CHECK_END,
    EntryType.VARROA_CHECK_START,
    EntryType.VARROA_TREATMENT,
  ],
  frames: [
    EntryType.FRAMES_BROOD_INSERTED,
    EntryType.FRAMES_BROOD_REMOVED,
    EntryType.FRAMES_DRONE_INSERTED,
    EntryType.FRAMES_DRONE_REMOVED,
    EntryType.FRAMES_EMPTY_COMBS_INSERTED,
    EntryType.FRAMES_EMPTY_COMBS_REMOVED,
    EntryType.FRAMES_EMPTY_PANEL_INSERTED,
    EntryType.FRAMES_EMPTY_PANEL_REMOVED,
    EntryType.FRAMES_HONEY_INSERTED,
    EntryType.FRAMES_HONEY_REMOVED,
  ],
  food: [EntryType.FOOD_ADDED],
  weight: [EntryType.WEIGHT_MEASURED],
};
