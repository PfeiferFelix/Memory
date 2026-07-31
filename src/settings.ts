import './styles/settings.scss';
let isVisible: boolean = false;
let game_theme = document.getElementById('game_theme');
let player = document.getElementById('player');
let board = document.getElementById('board');


function toggleImages(): void {
  const theme1 = document.getElementById('Theme1') as HTMLElement;
  const theme2 = document.getElementById('Theme2') as HTMLElement;
  const codeVibes = document.getElementById('code_vibes_theme') as HTMLInputElement;

  if (codeVibes.checked) {
    theme1.style.display = 'block';
    theme2.style.display = 'none';
  } else {
    theme1.style.display = 'none';
    theme2.style.display = 'block';
  }
}

const codeVibesRadio = document.getElementById('code_vibes_theme') as HTMLInputElement;
const gamingVibesRadio = document.getElementById('gaming_vibes_theme') as HTMLInputElement;

codeVibesRadio.addEventListener('change', toggleImages);
gamingVibesRadio.addEventListener('change', toggleImages);

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


const startGameButton = document.getElementById('start_game_btn') as HTMLButtonElement;

function startGame() {
  sessionStorage.setItem("startPlayer", player_orange.checked ? "orange" : "blue");
  if (codeVibesRadio.checked && cards_16.checked ) {
    window.location.href = './code_vibes_16.html';
  } else if (codeVibesRadio.checked && cards_24.checked){
    window.location.href = './code_vibes_24.html';
  } else if (codeVibesRadio.checked && cards_32.checked){
    window.location.href = './code_vibes_32.html';
  }else if (gamingVibesRadio.checked && cards_16.checked){
    window.location.href = './gaming_vibes_16.html';
  }

}

startGameButton.addEventListener('click', startGame);

function blurrStartGameButton(){
  if (!codeVibesRadio.checked || !cards_16.checked || !cards_24.checked || !cards_32.checked || !player_orange.checked || !player_blue.checked){
   startGameButton.blur;
   
  }
}
