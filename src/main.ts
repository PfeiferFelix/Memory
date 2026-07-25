import "./styles/style.scss";
import "./styles/code_vibes.scss";

const motive = [
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

//Mixing Cards

mixCards(motive);
const auswahl = motive.slice(0, 8);
let werte = [...auswahl, ...auswahl];
mixCards(werte);

function mixCards(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

const field = document.getElementById("field")!;
field.innerHTML = werte
    .map(
        (wert) => `
    <button class="card" data-value="${wert}">
    <div class="card__inner">
    <div class="card__face">
    <img src="/images/Code vibes card background.png" alt="">
    </div>
    <div class="card__face card__face--back">
    <img src="/images/${wert}" alt="${wert}">
    </div>
    </div>
    </button>
    `,
    )
    .join("");

let merker: HTMLButtonElement | null = null; // merker für die karten
let gesperrt = false;
const blauAnzeige = document.querySelector(".numberBlue")!;
let pointsBlue = 0;
const orangeAnzeige = document.querySelector(".numberOrange")!;
let pointsOrange = 0;
let aktuellerSpieler = "blau";

init();
function init() {
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", (e) => {
            onCardClick(e);
        });
    }
}

function onCardClick(e: MouseEvent) {
    const card = (e.target as HTMLElement).closest(
        ".card",
    ) as HTMLButtonElement;
    if (card) {
        if (gesperrt) return;
        card.classList.toggle("is-flipped");
        handleFlip(card);
    }
}

function handleFlip(card: HTMLButtonElement) {
    if (merker === null) {
        merker = card;
    } else if (merker.dataset.value === card.dataset.value) {
        merker = null;
        punktGeben();
    } else {
        gesperrt = true;
        rotateBack(merker, card);
        merker = null;
        spielerWechseln();
    }
}

function punktGeben() {
    if (aktuellerSpieler === "blau") {
        zaehlerBlau();
    } else {
        zaehlerOrange();
    }
}

function zaehlerBlau() {
    pointsBlue++;
    blauAnzeige.textContent = String(pointsBlue);
}

function zaehlerOrange() {
    pointsOrange++;
    orangeAnzeige.textContent = String(pointsOrange);
}

function spielerWechseln() {
    if (aktuellerSpieler === "blau") {
        aktuellerSpieler = "orange";
    } else {
        aktuellerSpieler = "blau";
    }
}

function rotateBack(a: HTMLButtonElement, b: HTMLButtonElement) {
    setTimeout(() => {
        a.classList.remove("is-flipped");
        b.classList.remove("is-flipped");
        gesperrt = false;
    }, 800);
}
