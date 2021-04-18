export function loadDailies() {
  const dailyGiftContainer = document.getElementById("daily-gift-container");

  if (dailyGiftContainer) {
    dailyGiftContainer.click();
    document
      .querySelector<HTMLElement>(".first-connexion .flavr-button.default")
      ?.click();
  }
}
