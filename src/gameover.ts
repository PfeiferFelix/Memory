import "./styles/GameOver.scss";

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

function showWinnerPage() {
    if (pointsBlue > pointsOrange) {
        window.location.href = "/Html/PlayerBlueWin.html";
    } else if (pointsOrange > pointsBlue) {
        window.location.href = "/Html/PlayerOrangeWin.html";
    } else {
        window.location.href = "/Html/Draw.html";
    }
}
