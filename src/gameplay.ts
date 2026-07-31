
let merker: HTMLButtonElement | null = null; // merker für die karten
let gesperrt = false;
const blauAnzeige = document.querySelector(".numberBlue")!;
let pointsBlue = 0;
const orangeAnzeige = document.querySelector(".numberOrange")!;
let pointsOrange = 0;
let aktuellerSpieler = sessionStorage.getItem("startPlayer") ?? "blue";
let gesamtPaare = 0;
const spielerAnzeige = document.querySelector(".currentPlayerTag img") as HTMLImageElement;
const spielerTag = document.querySelector(".currentPlayerTag") as HTMLElement | null;

export function mixCards(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function init(paare: number) {
    gesamtPaare = paare;
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", (e) => {
            onCardClick(e);
        });
    }
    anzeigeAktualisieren();
}

function onCardClick(e: MouseEvent) {
    const card = (e.target as HTMLElement).closest(
        ".card",
    ) as HTMLButtonElement;
    if (card) {
        if (card.classList.contains("is-flipped")) {
            return;
        }
        if (gesperrt) return;
        card.classList.add("is-flipped");
        handleFlip(card);
    }
}

function handleFlip(card: HTMLButtonElement) {
    if (merker === null) {
        merker = card;
    } else if (merker.dataset.value === card.dataset.value) {
        merker = null;
        punktGeben();
        pruefeSpielende()
    } else {
        gesperrt = true;
        rotateBack(merker, card);
        merker = null;
        spielerWechseln();
    }
}

function punktGeben() {
    if (aktuellerSpieler === "blue") {
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
    if (aktuellerSpieler === "blue") {
        aktuellerSpieler = "orange";
    } else {
        aktuellerSpieler = "blue";
    }
    anzeigeAktualisieren();
}

function rotateBack(a: HTMLButtonElement, b: HTMLButtonElement) {
    setTimeout(() => {
        a.classList.remove("is-flipped");
        b.classList.remove("is-flipped");
        gesperrt = false;
    }, 800);
}

function anzeigeAktualisieren() {
    const spieler = aktuellerSpieler === "blue" ? "blue" : "orange";
    if (spielerTag) {
        spielerTag.dataset.player = spieler;
    }
    // Jedes Theme kann seine eigenen Bilder per data-blue / data-orange setzen
    spielerAnzeige.src =
        spielerTag?.dataset[spieler] ?? `/images/label_${spieler}.png`;
}
function pruefeSpielende() {
    if (pointsBlue + pointsOrange === gesamtPaare) {
        setTimeout(() => {
            if (pointsBlue > pointsOrange) {
                window.location.href = "/Html/PlayerBlueWin.html"
            } else if (pointsOrange > pointsBlue) {
                 window.location.href = "/Html/PlayerOrangeWin.html"
            } else {
                window.location.href = "/Html/Draw.html"
            }
        }, 300);
    }
}
