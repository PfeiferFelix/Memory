import "./styles/style.scss";
import "./styles/gaming_vibes.scss";
import "./styles/gaming_vibes_24.scss";
import { mixCards, init } from "./gameplay";

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

mixCards(motifs);
const selection = motifs.slice(0, 12);
let values = [...selection, ...selection];
mixCards(values);



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

function openPopup(){
    popup.classList.remove("none");
}

backToGameButton.addEventListener("click", closePopup);
function closePopup(){
    popup.classList.add("none");
}

exitToMenuButton.addEventListener("click", exitToMenu);
function exitToMenu(){
    window.location.href = "setting.html";
}