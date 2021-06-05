import type { AutoExploreLocation } from "../local_storage/auto_explore_location";

export type StartExploration =
  | {
      exploring: false;
      selected: AutoExploreLocation | null;
    }
  | {
      exploring: true;
      selected: AutoExploreLocation;
    };
