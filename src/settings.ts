import './styles/settings.scss';
let isVisible: boolean = false;
let game_theme = document.getElementById('game_theme');
let player = document.getElementById('player');
let board = document.getElementById('board');


const codeVibesRadio = document.getElementById('code_vibes_theme') as HTMLInputElement;
const gamingVibesRadio = document.getElementById('gaming_vibes_theme') as HTMLInputElement;

const theme1 = document.getElementById('Theme1') as HTMLElement;
const theme2 = document.getElementById('Theme2') as HTMLElement;

type ThemeName = 'code' | 'gaming';

function showTheme(theme: ThemeName): void {
  theme1.style.display = theme === 'code' ? 'block' : 'none';
  theme2.style.display = theme === 'code' ? 'none' : 'block';
}

function toggleImages(): void {
  showTheme(codeVibesRadio.checked ? 'code' : 'gaming');
}

codeVibesRadio.addEventListener('change', toggleImages);
gamingVibesRadio.addEventListener('change', toggleImages);

const themeOptions = document.querySelectorAll<HTMLElement>('.theme_option[data-theme]');

themeOptions.forEach((option) => {
  const theme = option.dataset.theme as ThemeName;

  option.addEventListener('mouseenter', () => showTheme(theme));
  option.addEventListener('mouseleave', toggleImages);
  option.addEventListener('focusin', () => showTheme(theme));
  option.addEventListener('focusout', toggleImages);
});

toggleImages();

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

codeVibesRadio.addEventListener('change', toggleVisibleGameTheme);
gamingVibesRadio.addEventListener('change', toggleVisibleGameTheme);

toggleVisibleGameTheme();





const player_blue = document.getElementById('character_blue') as HTMLInputElement;
const player_orange = document.getElementById('character_orange') as HTMLInputElement;


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

player_blue.addEventListener('change', toggleVisiblePlayer);
player_orange.addEventListener('change', toggleVisiblePlayer);

toggleVisiblePlayer();


const cards_16 = document.getElementById('16_cards') as HTMLInputElement;
const cards_24 = document.getElementById('24_cards') as HTMLInputElement;
const cards_32 = document.getElementById('32_cards') as HTMLInputElement;


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

cards_16.addEventListener('change', toggleVisibleCards);
cards_24.addEventListener('change', toggleVisibleCards);
cards_32.addEventListener('change', toggleVisibleCards);

toggleVisibleCards();


function restoreTheme(): void {
  const saved = sessionStorage.getItem('theme');
  if (saved === 'gaming') {
    gamingVibesRadio.checked = true;
  } else if (saved === 'code') {
    codeVibesRadio.checked = true;
  }
}

function restorePlayer(): void {
  const saved = sessionStorage.getItem('startPlayer');
  if (saved === 'orange') {
    player_orange.checked = true;
  } else if (saved === 'blue') {
    player_blue.checked = true;
  }
}

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

function restoreSelection(): void {
  restoreTheme();
  restorePlayer();
  restoreBoardSize();

  toggleImages();
  toggleVisibleGameTheme();
  toggleVisiblePlayer();
  toggleVisibleCards();
}

restoreSelection();


const startGameButton = document.getElementById('start_game_btn') as HTMLButtonElement;

function saveSelection(theme: string, boardSize: string): void {
  sessionStorage.setItem("startPlayer", player_orange.checked ? "orange" : "blue");
  sessionStorage.setItem("theme", theme);
  sessionStorage.setItem("boardSize", boardSize);
}

function startGame() {
  const theme = codeVibesRadio.checked ? 'code' : gamingVibesRadio.checked ? 'gaming' : null;
  const boardSize = cards_16.checked ? '16' : cards_24.checked ? '24' : cards_32.checked ? '32' : null;

  if (!theme || !boardSize) return;

  saveSelection(theme, boardSize);

  const page = theme === 'code' ? 'code_vibes' : 'gaming_vibes';
  window.location.href = `./${page}_${boardSize}.html`;
}

startGameButton.addEventListener('click', startGame);

function blurrStartGameButton(){
  if (!codeVibesRadio.checked || !cards_16.checked || !cards_24.checked || !cards_32.checked || !player_orange.checked || !player_blue.checked){
   startGameButton.blur;
   
  }
}
