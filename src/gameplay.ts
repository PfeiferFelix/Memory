/**
 * Shared game logic for every board variant (Code/Gaming theme, 16/24/32 cards).
 * The board files only build the playing field and then call init().
 */

/** The first card flipped in the current turn, or null if none is open. */
let firstCard: HTMLButtonElement | null = null;
let locked = false;
let pointsBlue = 0;
let pointsOrange = 0;
let currentPlayer = sessionStorage.getItem("startPlayer") ?? "blue";
let totalPairs = 0;
let blueDisplay = document.querySelector(".numberBlue")!;
let orangeDisplay = document.querySelector(".numberOrange")!;
let currentTheme = sessionStorage.getItem("theme") ?? "code";
let playerDisplay = document.querySelector(".currentPlayerTag img") as HTMLImageElement;
let playerTag = document.querySelector(".currentPlayerTag") as HTMLElement | null;

/**
 * Shuffles an array randomly, in place (Fisher-Yates shuffle).
 * Walks from the last element to the first and swaps each element with a
 * random earlier one. Returns nothing - the given array itself is modified.
 * @param arr The array to shuffle (e.g. the card motifs).
 */
export function mixCards(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Starts the game: stores the number of pairs, attaches one click listener to
 * the playing field (event delegation - a single listener for all cards) and
 * shows which player begins.
 * @param pairs Number of pairs in the game, needed to detect the game end.
 */
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

/**
 * Handles a click inside the playing field: finds the clicked card, ignores
 * already flipped cards and clicks during the lock, flips the card over and
 * passes it on to the match check.
 * @param e The click event coming from the playing field.
 */
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

/**
 * Evaluates a flipped card - the core of the memory game:
 * 1. If it is the first card of the turn, it is only remembered.
 * 2. If it matches the remembered card, a point is scored (same player stays).
 * 3. If it does not match, clicks are locked, both cards flip back and the
 *    other player takes over.
 * @param card The card that was just flipped.
 */
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

/** Awards the point to whichever player is currently taking the turn. */
function givePoint() {
    if (currentPlayer === "blue") {
        countBlue();
    } else {
        countOrange();
    }
}

/** Increases blue's score and writes it into the score display. */
function countBlue() {
    pointsBlue++;
    blueDisplay.textContent = String(pointsBlue);
}

/** Increases orange's score and writes it into the score display. */
function countOrange() {
    pointsOrange++;
    orangeDisplay.textContent = String(pointsOrange);
}

/** Switches the active player and refreshes the player display. */
function switchPlayer() {
    if (currentPlayer === "blue") {
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }
    updateDisplay();
}

/**
 * Flips two non-matching cards back after a short delay and releases the click
 * lock afterwards. The 800 ms give the player time to memorize the motifs.
 * @param a The card that was flipped first.
 * @param b The second, non-matching card.
 */
function rotateBack(a: HTMLButtonElement, b: HTMLButtonElement) {
    setTimeout(() => {
        a.classList.remove("is-flipped");
        b.classList.remove("is-flipped");
        locked = false;
    }, 800);
}

/**
 * Updates the display of whose turn it is: sets data-player (used by the CSS)
 * and swaps the label image. If no custom image is stored in the HTML, the
 * default label from the images folder is used instead.
 */
function updateDisplay() {
    const player = currentPlayer === "blue" ? "blue" : "orange";
    if (playerTag) {
        playerTag.dataset.player = player;
    }
    playerDisplay.src =
        playerTag?.dataset[player] ?? `${import.meta.env.BASE_URL}images/label_${player}.png`;
}

/**
 * Checks after every found pair whether all cards are gone. If so, the scores
 * are saved to sessionStorage (the game over page reads them back from there)
 * and the matching theme page is opened. The 300 ms delay lets the last card
 * animation finish first.
 */
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

/** Redirects to the game over page of the gaming theme. */
function showGamingPage() {
    window.location.href = `${import.meta.env.BASE_URL}html/game-over-gaming.html`
}

/** Redirects to the game over page of the code theme. */
function showCodePage() {
    window.location.href = `${import.meta.env.BASE_URL}html/game-over-code.html`
}
