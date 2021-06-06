import "jquery";
import type { Currency } from "../api/meta";

declare global {
  const hashChangeEvent: boolean;

  function resizeCurrenciesIfNecessary(): void;

  function getCookie(c_name: CookieName): string;
  function setCookie(
    c_name: CookieName,
    value: string,
    exdays: number,
    path: string
  ): void;
  type CookieName = "el_season";

  function cleanAvatars(): void;

  /** Refresh a page without changing the hash */
  function hashRefresh(callback: () => void): void;

  /** Loading additional CSS on a page */
  function loadCSS(path: string): void;

  /** Loading an additional JS on a page */
  function loadJS(path: string, unique: boolean): void;

  /** Refreshes the player's info in the header */
  function refreshPlayerInfo(): void;

  /** Refreshes the player's portrait in the header */
  function refreshPlayerHeaderPortrait(): void;

  /** Refresh the pet portrait in the header */
  function refreshPetHeaderPortrait(): void;

  /** Refreshes the menu */
  function refreshMenu(): void;

  function nombre(): void;

  /**
   * Function allowing to format a number
   * (identical to the php function of the same name)
   */
  function number_format(
    number: number,
    decimals: number,
    dec_point: string,
    thousands_sep: string
  ): string;

  /**
   * Shuffle un array (toujours pratique !)
   * + Jonas Raoni Soares Silva
   * @ http://jsfromhell.com/array/shuffle [v1.0]
   */
  function shuffle<T>(o: T[]): T[];

  function showNotifications(
    notifications: {
      type: string;
      message: string;
      displayTime: number;
    }[]
  ): void;

  /** Method called on each ajax request response */
  function onAjaxComplete(
    event: undefined,
    xhr: JQueryXHR,
    settings: undefined
  ): void;

  function updatePlayerMaana(maana: Currency): void;
  function updatePlayerGold(gold: Currency): void;
  function updatePlayerLegacyCurrency(legacyCurrency: Currency): void;

  function addContact(contactId: number): void;
  function removeContact(contactId: number): void;
  function removeFromBlackList(contactId: number): void;
  function addToBlackList(contactId: number): void;

  function checkSunState(): void;

  function centerElement(element: HTMLElement): void;

  function hideItem(item: {
    token: string;
    key: string;
    image: string;
    y: number;
    x: number;
  }): void;
}

export {};
