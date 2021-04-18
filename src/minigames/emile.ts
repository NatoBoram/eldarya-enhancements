import "../jquery";
import { flappy } from "./flappy";
import { hatchlings } from "./hatchlings";
import { Minigame } from "./minigame";
import { peggle } from "./peggle";

export function playPeggle() {
  execute(peggle);
}

export function playFlappy() {
  execute(flappy);
}

export function playHatchlings() {
  execute(hatchlings);
}

function execute(minigame: Minigame) {
  Recaptcha.execute(`minigameStart${minigame.name}`, (token) => {
    $.ajax({
      url: "/minigames/ajax_startGame",
      type: "post",
      dataType: "json",
      data: { game: minigame.name.toLowerCase(), recaptchaToken: token },
      success: function (json) {
        if (json.result === "success") {
          const gameToken = json.data;
          const score = randomInt(minigame.min, minigame.max);

          getPrizes(minigame, gameToken, score);
        }
      },
    });
  });
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPrizes(minigame: Minigame, gameToken: string, score: Number) {
  $.post(
    "/minigames/ajax_getPrizes",
    { game: minigame.name.toLowerCase(), score: score },
    (json) => {
      var enc_token = xorEncode(gameToken, score.toString());
      send(enc_token, score, minigame.name.toLowerCase());

      $.flavrNotif(`Played ${minigame.name} for ${json.data.maana} maanas.`);
    },
    "json"
  );
}

function xorEncode(str: string, key: string) {
  str = str.toString();
  key = key.toString();

  // Encodage XOR
  var xor = "";
  for (var i = 0; i < str.length; ++i) {
    let tmp = str[i];
    for (var j = 0; j < key.length; ++j) {
      tmp = String.fromCharCode(tmp!.charCodeAt(0) ^ key.charCodeAt(j));
    }
    xor += tmp;
  }

  // Renvoie le résultat en encodant les caractères spéciaux pouvant poser problème (\n par exemple)
  return encodeURIComponent(xor);
}

function send(enc_token: string, score: Number, game: string) {
  var token = decodeURIComponent(enc_token);
  Recaptcha.execute("minigameSave" + game, function (recaptchaToken) {
    $.ajax({
      type: "post",
      url: "/minigames/ajax_saveScore",
      data: {
        token: token,
        score: score,
        game: game,
        recaptchaToken: recaptchaToken,
      },
      complete: () => {},
    });
  });
}
