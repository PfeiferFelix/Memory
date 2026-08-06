import './styles/settings.scss';

const codeVibesRadio = document.getElementById('code_vibes_theme') as HTMLInputElement;
const gamingVibesRadio = document.getElementById('gaming_vibes_theme') as HTMLInputElement;
const theme1 = document.getElementById('Theme1') as HTMLElement;
const theme2 = document.getElementById('Theme2') as HTMLElement;
const themeOptions = document.querySelectorAll<HTMLElement>('.theme_option[data-theme]');
const player_blue = document.getElementById('character_blue') as HTMLInputElement;
const player_orange = document.getElementById('character_orange') as HTMLInputElement;
const cards_16 = document.getElementById('16_cards') as HTMLInputElement;
const cards_24 = document.getElementById('24_cards') as HTMLInputElement;
const cards_32 = document.getElementById('32_cards') as HTMLInputElement;
const startGameButton = document.getElementById('start_game_btn') as HTMLButtonElement;
type ThemeName = 'code' | 'gaming';

/**
 * Shows the preview image of one theme and hides the other one.
 * @param theme Which theme preview should be visible.
 */
function showTheme(theme: ThemeName): void {
  theme1.style.display = theme === 'code' ? 'block' : 'none';
  theme2.style.display = theme === 'code' ? 'none' : 'block';
}

/**
 * Resets the preview back to the theme that is actually selected.
 * Used after a hover/focus preview ends and on page load.
 */
function toggleImages(): void {
  showTheme(codeVibesRadio.checked ? 'code' : 'gaming');
}

/**
 * Writes the name of the selected theme into the label text.
 * Falls back to the generic "Game theme" when nothing is selected yet.
 */
function toggleVisibleGameTheme() {
  const el = document.getElementById("game_theme");
  if (!el) return;
  if (codeVibesRadio.checked && el) {
    el.innerText = "Code theme";
  } else if (gamingVibesRadio.checked && el) {
    el.innerText = "Gaming theme"
  } else {
    el.innerText = "Game theme";
  }
}

/**
 * Writes the selected starting player into the label text.
 * Falls back to the generic "Player" when nothing is selected yet.
 */
function toggleVisiblePlayer() {
  const el = document.getElementById("player");
  if (!el) return;
  if (player_blue.checked && el) {
    el.innerText = "Blue";
  } else if (player_orange.checked && el) {
    el.innerText = "Orange"
  } else {
    el.innerText = "Player";
  }
}

/**
 * Writes the selected board size into the label text.
 * Falls back to the generic "Board size" when nothing is selected yet.
 */
function toggleVisibleCards() {
  const el = document.getElementById("board");
  if (!el) return;
  if (cards_16.checked && el) {
    el.innerText = "16 Cards";
  } else if (cards_24.checked && el) {
    el.innerText = "24 Cards"
  } else if (cards_32.checked && el) {
    el.innerText = "32 Cards"
  } else {
    el.innerText = "Board size";
  }
}

/** Re-checks the theme radio that was stored in sessionStorage. */
function restoreTheme(): void {
  const saved = sessionStorage.getItem('theme');
  if (saved === 'gaming') {
    gamingVibesRadio.checked = true;
  } else if (saved === 'code') {
    codeVibesRadio.checked = true;
  }
}

/** Re-checks the starting player that was stored in sessionStorage. */
function restorePlayer(): void {
  const saved = sessionStorage.getItem('startPlayer');
  if (saved === 'orange') {
    player_orange.checked = true;
  } else if (saved === 'blue') {
    player_blue.checked = true;
  }
}

/** Re-checks the board size that was stored in sessionStorage. */
function restoreBoardSize(): void {
  const saved = sessionStorage.getItem('boardSize');
  if (saved === '16') {
    cards_16.checked = true;
  } else if (saved === '24') {
    cards_24.checked = true;
  } else if (saved === '32') {
    cards_32.checked = true;
  }
}

/**
 * Restores the whole previous selection when the page is opened again
 * (e.g. after leaving a running game) and refreshes every label and preview
 * so the UI matches the restored radio buttons.
 */
function restoreSelection(): void {
  restoreTheme();
  restorePlayer();
  restoreBoardSize();
  toggleImages();
  toggleVisibleGameTheme();
  toggleVisiblePlayer();
  toggleVisibleCards();
}

/**
 * Saves the current selection to sessionStorage so the game pages can read it.
 * @param theme The selected theme, 'code' or 'gaming'.
 * @param boardSize The selected number of cards as a string ('16' | '24' | '32').
 */
function saveSelection(theme: string, boardSize: string): void {
  sessionStorage.setItem("startPlayer", player_orange.checked ? "orange" : "blue");
  sessionStorage.setItem("theme", theme);
  sessionStorage.setItem("boardSize", boardSize);
}

/**
 * Reads theme and board size from the radio buttons, aborts while the
 * selection is still incomplete, saves it and opens the matching game page
 * (e.g. board-code-16.html).
 */
function startGame() {
  if (!isSelectionComplete()) return;
  const theme = codeVibesRadio.checked ? 'code' : 'gaming';
  const boardSize = cards_16.checked ? '16' : cards_24.checked ? '24' : '32';
  saveSelection(theme, boardSize);
  window.location.href = `./board-${theme}-${boardSize}.html`;
}

/** The radio groups that all need one checked option before the game can start. */
const requiredGroups = ['game_theme', 'player', 'board_size'];

/** True as soon as every radio group has an option checked. */
function isSelectionComplete(): boolean {
  return requiredGroups.every(
    (name) => document.querySelector(`input[name="${name}"]:checked`) !== null
  );
}

/**
 * Shows the blurred start button image while something is still missing and
 * swaps in the normal one once every group is picked. The button stays
 * disabled as long as the selection is incomplete.
 */
function updateStartButton(): void {
  const complete = isSelectionComplete();
  const image = startGameButton.querySelector<HTMLImageElement>('.start_button_default');
  startGameButton.disabled = !complete;
  if (!image) return;
  const file = complete ? 'small button.png' : 'Start_Button_Blur.png';
  image.src = `${import.meta.env.BASE_URL}images/${file}`;
}

/**
 * Adds hover and focus listeners to one theme option so the preview image
 * changes while the user hovers over or focuses it.
 * @param option The theme option element carrying the data-theme attribute.
 */
function initThemeOption(option: HTMLElement): void {
  const theme = option.dataset.theme as ThemeName;
  option.addEventListener('mouseenter', () => showTheme(theme));
  option.addEventListener('mouseleave', toggleImages);
  option.addEventListener('focusin', () => showTheme(theme));
  option.addEventListener('focusout', toggleImages);
}

/** Wires the theme radios and the hover preview of every theme option. */
function initThemeListeners(): void {
  codeVibesRadio.addEventListener('change', toggleImages);
  gamingVibesRadio.addEventListener('change', toggleImages);
  codeVibesRadio.addEventListener('change', toggleVisibleGameTheme);
  gamingVibesRadio.addEventListener('change', toggleVisibleGameTheme);
  themeOptions.forEach(initThemeOption);
}

/** Wires the starting player radios. */
function initPlayerListeners(): void {
  player_blue.addEventListener('change', toggleVisiblePlayer);
  player_orange.addEventListener('change', toggleVisiblePlayer);
}

/** Wires the board size radios. */
function initBoardListeners(): void {
  cards_16.addEventListener('change', toggleVisibleCards);
  cards_24.addEventListener('change', toggleVisibleCards);
  cards_32.addEventListener('change', toggleVisibleCards);
}

/**
 * Wires the start button and keeps its enabled state in sync with every
 * radio group on the page.
 */
function initStartButton(): void {
  startGameButton.addEventListener('click', startGame);
  document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((radio) => radio.addEventListener('change', updateStartButton));
}

/**
 * Single entry point of the settings page: registers every listener, restores
 * the previous selection and brings the start button in sync with it.
 */
function init(): void {
  initThemeListeners();
  initPlayerListeners();
  initBoardListeners();
  initStartButton();
  restoreSelection();
  updateStartButton();
}

init();

