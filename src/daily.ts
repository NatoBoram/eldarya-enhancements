export async function loadDailies(): Promise<void> {
  const dailyGiftContainer = document.getElementById("daily-gift-container");
  if (
    !dailyGiftContainer ||
    getComputedStyle(dailyGiftContainer).display === "none"
  )
    return;

  dailyGiftContainer.click();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  document
    .querySelector<HTMLButtonElement>(".first-connexion .flavr-button.default")
    ?.click();
}
