import { GetPrizesData } from "../api/get_prizes_data";
import { Packet } from "../api/packet";
import { StartGameData } from "../api/start_game_data";
import "../jquery";
import { flappy } from "./flappy";
import { hatchlings } from "./hatchlings";
import { Minigame } from "./minigame";
import { peggle } from "./peggle";

export function playPeggle(): Promise<void> {
  return play(peggle);
}

export function playFlappy(): Promise<void> {
  return play(flappy);
}

export function playHatchlings(): Promise<void> {
  return play(hatchlings);
}

async function play(minigame: Minigame): Promise<void> {
  const json = await execute(minigame);
  const gameToken = json.data;
  const score = randomInt(minigame.min, minigame.max);
  const enc_token = xorEncode(gameToken, score.toString());
  await new Promise((resolve) => setTimeout(resolve, randomInt(1000, 3000)));

  await getPrizes(minigame, gameToken, score);
  await new Promise((resolve) => setTimeout(resolve, randomInt(1000, 3000)));

  await send(enc_token, score, minigame.name.toLowerCase());
  await new Promise((resolve) => setTimeout(resolve, randomInt(1000, 3000)));
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function execute(minigame: Minigame): Promise<Packet<StartGameData>> {
  return new Promise<Packet<StartGameData>>((resolve, reject) =>
    Recaptcha.execute(`minigameStart${minigame.name}`, (token) =>
      $.ajax({
        url: "/minigames/ajax_startGame",
        type: "post",
        dataType: "json",
        data: { game: minigame.name.toLowerCase(), recaptchaToken: token },
        success: (json: Packet<StartGameData>) => resolve(json),
        error: () => reject(),
      })
    )
  );
}

function getPrizes(
  minigame: Minigame,
  gameToken: string,
  score: number
): Promise<Packet<GetPrizesData>> {
  return new Promise<Packet<GetPrizesData>>((resolve) =>
    $.post(
      "/minigames/ajax_getPrizes",
      { game: minigame.name.toLowerCase(), score: score },
      (json: Packet<GetPrizesData>) => {
        resolve(json);

        $.flavrNotif(
          `Played <strong>${minigame.name}</strong> for <strong>${json.data.maana}</strong> maanas.`
        );
      },
      "json"
    ).fail(() =>
      setTimeout(
        () => resolve(getPrizes(minigame, gameToken, score)),
        randomInt(1000, 3000)
      )
    )
  );
}

/**
 * Sécurisation de l'envoi du score
 * Basé sur l'encodage XOR : http://en.wikipedia.org/wiki/XOR_cipher
 * Effectue un XOR bit à bit entre une chaine et une clé
 */
function xorEncode(str: string, key: string) {
  // Assure que les deux paramètres soient des chaines de caractère
  str = str.toString();
  key = key.toString();

  // Encodage XOR
  let xor = "";
  for (let i = 0; i < str.length; ++i) {
    let tmp = str[i];
    for (let j = 0; j < key.length; ++j) {
      tmp = String.fromCharCode(tmp!.charCodeAt(0) ^ key.charCodeAt(j));
    }
    xor += tmp;
  }

  // Renvoie le résultat en encodant les caractères spéciaux pouvant poser problème (\n par exemple)
  return encodeURIComponent(xor);
}

function send(enc_token: string, score: number, game: string): Promise<void> {
  return new Promise((resolve) => {
    const token = decodeURIComponent(enc_token);
    Recaptcha.execute("minigameSave" + game, (recaptchaToken) =>
      $.ajax({
        type: "post",
        url: "/minigames/ajax_saveScore",
        data: {
          token: token,
          score: score,
          game: game,
          recaptchaToken: recaptchaToken,
        },
        success: () => resolve(),
        error: () =>
          setTimeout(
            () => resolve(send(enc_token, score, game)),
            randomInt(1000, 3000)
          ),
      })
    );
  });
}
