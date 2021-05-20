declare global {
  const hatchingTimeLeft: number;

  /** Familiar's current energy */
  const petEnergy: number;

  /** PetRace energy of the pet, which therefore corresponds to its maximum energy */
  const petRaceEnergy: number;

  /**
   * Seconds. If the time is still ticking but there's no
   * `pendingTreasureHuntLocation`, then the exploration is in a different
   * region.
   */
  let timeLeftExploration: number | null;
}

export {};
