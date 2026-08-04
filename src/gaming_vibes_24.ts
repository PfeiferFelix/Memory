/**
 * Gaming theme board with 24 cards: picks 12 motifs, doubles and shuffles them,
 * renders the playing field and wires up the pause popup.
 */
import "./styles/style.scss";
import "./styles/gaming_vibes.scss";
import "./styles/gaming_vibes_24.scss";
import { mixCards, init } from "./gameplay";

/** All card motifs available in the gaming theme. */
const motifs = [
    "Theme2/banana.png",
    "Theme2/card.png",
    "Theme2/CircleFigure.png",
    "Theme2/Coin.png",
    "Theme2/Controler.png",
    "Theme2/Creeper.png",
    "Theme2/dicepng.png",
    "Theme2/DriangleFigure.png",
    "Theme2/gameboy.png",
    "Theme2/Labyrinth.png",
    "Theme2/lvlup.png",
    "Theme2/Pacman.png",
    "Theme2/Pacmangold.png",
    "Theme2/play.png",
    "Theme2/puzzle.png",
    "Theme2/rectangelFigure.png",
    "Theme2/Snake.png",
    "Theme2/Tod.png",
];

// Shuffle all motifs first so every round uses a different set, take as many
// as this board needs, then double them so each motif exists twice - and
// shuffle again to spread the pairs over the field.
mixCards(motifs);
const selection = motifs.slice(0, 12);
let values = [...selection, ...selection];
mixCards(values);



// Renders one button per card: the front face shows the card back image, the
// back face the motif. data-value is what the match check compares.
const field = document.getElementById("field")!;
field.innerHTML = values
    .map(
        (value) => `
    <button class="card" data-value="${value}">
    <div class="card__inner">
    <div class="card__face">
    <img src="${import.meta.env.BASE_URL}images/Theme2/gaming_vibes_background.png" alt="">
    </div>
    <div class="card__face card__face--back">
    <img src="${import.meta.env.BASE_URL}images/${value}" alt="${value}">
    </div>
    </div>
    </button>
    `,
    )
    .join("");

init(selection.length);

const popup = document.getElementById("popup")!;
const openPopupButton = document.getElementById("openPopupButton")!;
const backToGameButton = document.getElementById("backToGameButton")!;
const exitToMenuButton = document.getElementById("exitToMenuButton")!;

openPopupButton.addEventListener("click",  openPopup);

/** Opens the pause popup by removing the "none" class. */
function openPopup(){
    popup.classList.remove("none");
}

backToGameButton.addEventListener("click", closePopup);
/** Closes the pause popup and returns to the running game. */
function closePopup(){
    popup.classList.add("none");
}

exitToMenuButton.addEventListener("click", exitToMenu);
/** Leaves the running game and goes back to the settings page. */
function exitToMenu(){
    window.location.href = "setting.html";
}