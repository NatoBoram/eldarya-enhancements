export interface Meta {
  event: MetaEvent;
  message: Message;
  purroshop: Purroshop;
  player: Player;
  pet: Pet;
}

type MetaEvent = "easter" | null;

interface Message {
  unread: string;
}

interface Pet {
  portrait: string;

  /** Exploration is finished */
  exploration: boolean;
}

interface Player {
  maana: Currency;
  gold: Currency;
  purropass: Purropass;
  legacyCurrency: Currency;
  xp: XP;
  dailyMaana: boolean;
  unreadNews: null;
}

interface Currency {
  value: number;
  text: string;
  change: Change;
}

interface Change {
  value: number;
  text: string;
}

interface Purropass {
  value: string;
  text: string;
  change: Change;
}

interface XP {
  value: number;
  goal: number;
  level: number;
}

interface Purroshop {
  status: PurroshopStatus;
}

enum PurroshopStatus {
  disabled = "disabled",
}
