
let firstCard: HTMLButtonElement | null = null;
let locked = false;
const blueDisplay = document.querySelector(".numberBlue")!;
let pointsBlue = 0;
const orangeDisplay = document.querySelector(".numberOrange")!;
let pointsOrange = 0;
let currentPlayer = sessionStorage.getItem("startPlayer") ?? "blue";
const currentTheme = sessionStorage.getItem("theme") ?? "code";
let totalPairs = 0;
const playerDisplay = document.querySelector(".currentPlayerTag img") as HTMLImageElement;
const playerTag = document.querySelector(".currentPlayerTag") as HTMLElement | null;

export function mixCards(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function init(pairs: number) {
    totalPairs = pairs;
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", (e) => {
            onCardClick(e);
        });
    }
    updateDisplay();
}

function onCardClick(e: MouseEvent) {
    const card = (e.target as HTMLElement).closest(
        ".card",
    ) as HTMLButtonElement;
    if (card) {
        if (card.classList.contains("is-flipped")) {
            return;
        }
        if (locked) return;
        card.classList.add("is-flipped");
        handleFlip(card);
    }
}

function handleFlip(card: HTMLButtonElement) {
    if (firstCard === null) {
        firstCard = card;
    } else if (firstCard.dataset.value === card.dataset.value) {
        firstCard = null;
        givePoint();
        checkGameEnd()
    } else {
        locked = true;
        rotateBack(firstCard, card);
        firstCard = null;
        switchPlayer();
    }
}

function givePoint() {
    if (currentPlayer === "blue") {
        countBlue();
    } else {
        countOrange();
    }
}

function countBlue() {
    pointsBlue++;
    blueDisplay.textContent = String(pointsBlue);
}

function countOrange() {
    pointsOrange++;
    orangeDisplay.textContent = String(pointsOrange);
}

function switchPlayer() {
    if (currentPlayer === "blue") {
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }
    updateDisplay();
}

function rotateBack(a: HTMLButtonElement, b: HTMLButtonElement) {
    setTimeout(() => {
        a.classList.remove("is-flipped");
        b.classList.remove("is-flipped");
        locked = false;
    }, 800);
}

function updateDisplay() {
    const player = currentPlayer === "blue" ? "blue" : "orange";
    if (playerTag) {
        playerTag.dataset.player = player;
    }
    playerDisplay.src =
        playerTag?.dataset[player] ?? `${import.meta.env.BASE_URL}images/label_${player}.png`;
}
function checkGameEnd() {
    if (pointsBlue + pointsOrange === totalPairs) {
        setTimeout(() => {
            sessionStorage.setItem("pointsBlue", String(pointsBlue));
            sessionStorage.setItem("pointsOrange", String(pointsOrange));
            if (currentTheme === "gaming") {
                showGamingPage();
            } else {
                showCodePage();
            }
        }, 300);
    }
}

function showGamingPage() {
    window.location.href = `${import.meta.env.BASE_URL}Html/GameOverGame.html`
}

function showCodePage() {
    window.location.href = `${import.meta.env.BASE_URL}Html/GameOver.html`
}
