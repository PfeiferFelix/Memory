import "./styles/style.scss";
import "./styles/code_vibes.scss";
import "./styles/code_vibes_24.scss"; // TODO: auf code_vibes_32.scss umstellen, sobald die Datei existiert
import { mixCards, init } from "./gameplay";

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
const auswahl = motive.slice(0, 18);
let werte = [...auswahl, ...auswahl];
mixCards(werte);

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

init(auswahl.length);
