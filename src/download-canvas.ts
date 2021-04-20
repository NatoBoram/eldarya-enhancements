function downloadCanvas(canvas: HTMLCanvasElement, name: string): void {
  // Make it an image
  const image = canvas.toDataURL("image/png");

  // Create a link
  const a = document.createElement("a");
  a.setAttribute("href", image);
  a.setAttribute("download", `${name}.png`);

  // Place it on the body
  a.style.display = "none";
  document.body.appendChild(a);

  // Start the download
  a.click();

  // Remove the link
  document.body.removeChild(a);
}

export function downloadFace(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(
    "#avatar-menu-container canvas"
  );
  if (!canvas) {
    console.warn("Couldn't find the guardian's face.");
    return;
  }

  downloadCanvas(canvas, "face");
}

export function downloadGuardian(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(
    "#home-avatar-player canvas"
  );
  if (!canvas) {
    console.warn("Couldn't find the guardian.");
    return;
  }

  downloadCanvas(canvas, "guardian");
}
