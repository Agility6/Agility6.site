// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Agility6";
export const SITE_DESCRIPTION =
  "Agility6 Blog";
export const TWITTER_HANDLE = "Agility6";
export const MY_NAME = "Agility6";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
