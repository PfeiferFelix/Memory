import "./styles/style.scss";
import "./styles/gaming_vibes.scss";
import "./styles/gaming_vibes_16.scss";
import { mixCards, init } from "./gameplay";

const motive = [
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

//Mixing Cards

mixCards(motive);
const auswahl = motive.slice(0, 8);
let werte = [...auswahl, ...auswahl];
mixCards(werte);



const field = document.getElementById("field")!;
field.innerHTML = werte
    .map(
        (wert) => `
    <button class="card" data-value="${wert}">
    <div class="card__inner">
    <div class="card__face">
    <img src="/images/Theme2/gaming_vibes_background.png" alt="">
    </div>
    <div class="card__face card__face--back">
    <img src="/images/${wert}" alt="${wert}">
    </div>
    </div>
    </button>
    `,
    )
    .join("");

init(auswahl.length);

// Popup
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