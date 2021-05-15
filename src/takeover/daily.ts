export async function loadDailies(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const dailyGiftContainer = document.getElementById("daily-gift-container");
    if (
      !dailyGiftContainer ||
      getComputedStyle(dailyGiftContainer).display === "none"
    ) {
      resolve(false);
      return;
    }

    dailyGiftContainer.click();

    const interval = setInterval(() => {
      const button = document.querySelector<HTMLButtonElement>(
        ".first-connexion .flavr-button.default"
      );

      if (button) {
        clearInterval(interval);
        button.click();
        resolve(true);
      }
    }, 250);
  });
}
