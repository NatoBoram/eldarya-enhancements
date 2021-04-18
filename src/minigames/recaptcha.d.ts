declare const Recaptcha: {
  execute(
    action:
      | "minigameStartPeggle"
      | "minigameSavePeggle"
      | "minigameStartFlappy"
      | "minigameSaveFlappy"
      | "minigameStartHatchlings"
      | "minigameSaveHatchlings"
      | String,
    callback: (token: string) => void
  ): void;
};
