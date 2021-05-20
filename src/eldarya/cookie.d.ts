declare function getCookie(c_name: CookieName): string;
declare function setCookie(
  c_name: CookieName,
  value: string,
  exdays: number,
  path: string
): void;

declare type CookieName = "el_season";
