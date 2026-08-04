/**
 * Game over screen of the gaming theme: shows the final score for a moment and
 * then forwards to the winner (or draw) page.
 */
import "./styles/GameOverGame.scss";

/** How long the final score stays on screen before forwarding, in ms. */
const displayDuration = 2500;

const pointsBlue = Number(sessionStorage.getItem("pointsBlue") ?? 0);
const pointsOrange = Number(sessionStorage.getItem("pointsOrange") ?? 0);

const blueDisplay = document.querySelector(".numberBlue")!;
const orangeDisplay = document.querySelector(".numberOrange")!;

blueDisplay.textContent = String(pointsBlue);
orangeDisplay.textContent = String(pointsOrange);

setTimeout(() => {
    showWinnerPage();
}, displayDuration);

/**
 * Compares both scores and opens the matching result page of the gaming theme:
 * blue wins, orange wins, or a draw when both have the same amount of pairs.
 */
function showWinnerPage() {
    if (pointsBlue > pointsOrange) {
        window.location.href = `${import.meta.env.BASE_URL}Html/PlayerBlueWinGame.html`;
    } else if (pointsOrange > pointsBlue) {
        window.location.href = `${import.meta.env.BASE_URL}Html/PlayerOrangeWinGame.html`;
    } else {
        window.location.href = `${import.meta.env.BASE_URL}Html/DrawGame.html`;
    }
}
