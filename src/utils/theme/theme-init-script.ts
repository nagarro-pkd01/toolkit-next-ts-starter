import { THEME_CLASS, THEME_STORAGE_KEY } from "@/constants/themeConstants";

/** Runs before React hydrates to avoid a light flash on dark preference. */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle(${JSON.stringify(THEME_CLASS)},d);}catch(e){}})();`;
