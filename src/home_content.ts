export function loadHomeContent(): void {
  const homeContentSmalls = document.getElementById("home-content-smalls");
  if (!homeContentSmalls) return;

  document.getElementById("home-bank")?.remove();
}
