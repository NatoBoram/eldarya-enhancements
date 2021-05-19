declare global {
  const hatchingTimeLeft: number;

  /** Familiar's current energy */
  const petEnergy: number;

  /** PetRace energy of the pet, which therefore corresponds to its maximum energy */
  const petRaceEnergy: number;

  let timeLeftExploration: number | null;
}

export {};
