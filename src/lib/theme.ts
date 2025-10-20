export function setTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  const saved = localStorage.getItem("theme") || "catppuccin";
  document.documentElement.setAttribute("data-theme", saved);
}

export function getTheme() {
  return localStorage.getItem("theme") || "catppuccin";
}

export const themes = [
  "apprentice",
  "catppuccin",
  "ayu",
  "posterpole",
  "catppucin-light",
  "everforest-light",
];
export const themesString = `${themes.join(" ")}.`;
