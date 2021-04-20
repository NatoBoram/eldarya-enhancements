export async function loadDailies(): Promise<void> {
  const dailyGiftContainer = document.getElementById("daily-gift-container");

  if (dailyGiftContainer) {
    dailyGiftContainer.click();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    document
      .querySelector<HTMLButtonElement>(
        ".first-connexion .flavr-button.default"
      )
      ?.click();
  }
}
