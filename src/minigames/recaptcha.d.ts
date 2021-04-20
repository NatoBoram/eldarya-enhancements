declare const Recaptcha: {
  execute(
    action:
      | "minigameStartPeggle"
      | "minigameSavePeggle"
      | "minigameStartFlappy"
      | "minigameSaveFlappy"
      | "minigameStartHatchlings"
      | "minigameSaveHatchlings"
      | string,
    callback: (token: string) => void
  ): void;
};
