import { playFlappy, playHatchlings, playPeggle } from "./minigames/emile";

export async function loadMinigames(): Promise<void> {
  const played = [
    await loadPeggle(),
    await loadFlappy(),
    await loadHatchlings(),
  ].reduce((previous, current) => previous || current);

  if (played) {
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  }
}

async function loadPeggle(): Promise<boolean> {
  const peggleStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/gembomb"] .nl-button'
  );
  if (!peggleStart) {
    return false;
  }

  peggleStart.classList.add("disabled");
  await playPeggle();
  return true;
}

async function loadFlappy(): Promise<boolean> {
  const flappyStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/bubbltemple"] .nl-button'
  );
  if (!flappyStart) {
    return false;
  }

  flappyStart.classList.add("disabled");
  await playFlappy();
  return true;
}

async function loadHatchlings(): Promise<boolean> {
  const hatchlingsStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/cocooninpick"] .nl-button'
  );
  if (!hatchlingsStart) {
    return false;
  }

  hatchlingsStart.classList.add("disabled");
  await playHatchlings();
  return true;
}
