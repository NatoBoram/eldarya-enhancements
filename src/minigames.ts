import { playFlappy, playHatchlings, playPeggle } from "./minigames/emile";

export async function loadMinigames(): Promise<void> {
  const played = [
    await loadPeggle(),
    await loadFlappy(),
    await loadHatchlings(),
  ].reduce((previous, current) => previous || current);

  if (played) {
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}

async function loadMinigame(
  selector: string,
  playGame: () => Promise<void>
): Promise<boolean> {
  const start = document.querySelector<HTMLSpanElement>(selector);
  if (!start) {
    return false;
  }

  start.classList.add("disabled");
  await playGame();
  return true;
}

function loadPeggle(): Promise<boolean> {
  return loadMinigame(
    '.minigame-start [href="/minigames/gembomb"] .nl-button',
    playPeggle
  );
}

function loadFlappy(): Promise<boolean> {
  return loadMinigame(
    '.minigame-start [href="/minigames/bubbltemple"] .nl-button',
    playFlappy
  );
}

function loadHatchlings(): Promise<boolean> {
  return loadMinigame(
    '.minigame-start [href="/minigames/cocooninpick"] .nl-button',
    playHatchlings
  );
}
