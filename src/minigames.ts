import { playFlappy, playHatchlings, playPeggle } from "./minigames/emile";

export function loadMinigames() {
  const played = [loadPeggle(), loadFlappy(), loadHatchlings()].reduce(
    (previous, current) => previous || current
  );

  if (played) {
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  }
}

function loadPeggle(): boolean {
  const peggleStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/gembomb"] .nl-button'
  );
  if (!peggleStart) {
    return false;
  }

  playPeggle();
  peggleStart.classList.add("disabled");
  return true;
}

function loadFlappy(): boolean {
  const flappyStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/bubbltemple"] .nl-button'
  );
  if (!flappyStart) {
    return false;
  }

  playFlappy();
  flappyStart.classList.add("disabled");
  return true;
}

function loadHatchlings(): boolean {
  const hatchlingsStart = document.querySelector<HTMLSpanElement>(
    '.minigame-start [href="/minigames/cocooninpick"] .nl-button'
  );
  if (!hatchlingsStart) {
    return false;
  }

  playHatchlings();
  hatchlingsStart.classList.add("disabled");
  return true;
}
