const timerDisplay = document.getElementById("timerDisplay");
const toggleBtn = document.getElementById("toggleBtn");
const actionBtn = document.getElementById("actionBtn");
const lapsContainer = document.getElementById("lapsContainer");

let timer;
let running = false;
let timeElapsed = 0;

function padDigits(num, length = 2) {
    return String(num).padStart(length, "0");
}

function formatElapsedTime(time) {
    const mins = Math.floor(time / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    const millisecs = Math.floor((time % 1000) / 10);
    return `${padDigits(mins)}:${padDigits(secs)}:${padDigits(millisecs)}`;
}

function refreshTimer() {
    timerDisplay.textContent = formatElapsedTime(timeElapsed);
}

function beginTimer() {
    const start = Date.now() - timeElapsed;
    timer = setInterval(() => {
        timeElapsed = Date.now() - start;
        refreshTimer();
    }, 100);
    running = true;
}

function haltTimer() {
    clearInterval(timer);
    running = false;
}

function logLap() {
    const lapTime = formatElapsedTime(timeElapsed);
    const lapIndex = lapsContainer.children.length + 1;
    const lapElement = document.createElement("li");
    lapElement.className = "lap-entry";
    lapElement.innerHTML = `<span class="lap-index">#${lapIndex}</span><span class="lap-time">${lapTime}</span>`;
    lapsContainer.appendChild(lapElement);
}

function resetTimer() {
    haltTimer();
    timeElapsed = 0;
    refreshTimer();
    lapsContainer.innerHTML = "";
}

toggleBtn.addEventListener("click", () => {
    if (running) {
        haltTimer();
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M320-263v-438q0-15 10-24.17 10-9.16 23.33-9.16 4.34 0 8.84 1.16 4.5 1.17 8.83 3.5L715.67-510q7.66 5.33 11.5 12.33 3.83 7 3.83 15.67t-3.83 15.67q-3.84 7-11.5 12.33L371-234.33q-4.33 2.33-8.83 3.5-4.5 1.16-8.84 1.16-13.33 0-23.33-9.16Q320-248 320-263Z"/>
            </svg>
        `;
        actionBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M240-306.67v-346.66q0-27.5 19.58-47.09Q279.17-720 306.67-720h346.66q27.5 0 47.09 19.58Q720-680.83 720-653.33v346.66q0 27.5-19.58 47.09Q680.83-240 653.33-240H306.67q-27.5 0-47.09-19.58Q240-279.17 240-306.67Z"/>
            </svg>
        `;
    } else {
        beginTimer();
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M320-234h120v-492H320v492Zm200 0h120v-492H520v492Z"/>
            </svg>
        `;
        actionBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
                <path d="M240-306.67v-346.66q0-27.5 19.58-47.09Q279.17-720 306.67-720h346.66q27.5 0 47.09 19.58Q720-680.83 720-653.33v346.66q0 27.5-19.58 47.09Q680.83-240 653.33-240H306.67q-27.5 0-47.09-19.58Q240-279.17 240-306.67Z"/>
            </svg>
        `;
    }
});

actionBtn.addEventListener("click", () => {
    if (running) {
        logLap();
    } else {
        resetTimer();
    }
});
