/**
 * Code theme board with 24 cards: picks 12 motifs, doubles and shuffles them,
 * renders the playing field and wires up the pause popup.
 */
import "./styles/style.scss";
import "./styles/code_vibes.scss";
import "./styles/code_vibes_24.scss";
import { mixCards, init } from "./gameplay";

/** All card motifs available in the code theme. */
const motifs = [
    "Theme1/JS.png",
    "Theme1/TS.png",
    "Theme1/HTML.png",
    "Theme1/CSS.png",
    "Theme1/React.png",
    "Theme1/NodeJS.png",
    "Theme1/Git.png",
    "Theme1/SASS.png",
    "Theme1/Anuglar.png",
    "Theme1/Bootstrap.png",
    "Theme1/DB.png",
    "Theme1/DJ.png",
    "Theme1/Firebasepng.png",
    "Theme1/Github.png",
    "Theme1/Python.png",
    "Theme1/Terminal.png",
    "Theme1/VS_Code.png",
    "Theme1/VueJSpng.png",
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
    <img src="${import.meta.env.BASE_URL}images/Code vibes card background.png" alt="">
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

openPopupButton.addEventListener("click", openPopup);

/** Opens the pause popup by removing the "none" class. */
function openPopup() {
    popup.classList.remove("none");
}

backToGameButton.addEventListener("click", closePopup);

/** Closes the pause popup and returns to the running game. */
function closePopup() {
    popup.classList.add("none");
}

exitToMenuButton.addEventListener("click", exitToMenu);

/** Leaves the running game and goes back to the settings page. */
function exitToMenu() {
    window.location.href = "setting.html";
}
