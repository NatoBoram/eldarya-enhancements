export interface Meta {
  event: null;
  message: Message;
  purroshop: Purroshop;
  player: Player;
  pet: Pet;
}

export interface Message {
  unread: string;
}

export interface Pet {
  portrait: string;
  exploration: boolean;
}

export interface Player {
  maana: Currency;
  gold: Currency;
  purropass: Purropass;
  legacyCurrency: Currency;
  xp: XP;
  dailyMaana: boolean;
  unreadNews: null;
}

export interface Currency {
  value: number;
  text: string;
  change: Change;
}

export interface Change {
  value: number;
  text: string;
}

export interface Purropass {
  value: string;
  text: string;
  change: Change;
}

export interface XP {
  value: number;
  goal: number;
  level: number;
}

export interface Purroshop {
  status: string;
}
