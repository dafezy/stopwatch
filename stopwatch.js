let timer;
let seconds = 0;
const laps = [];

function updateDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.getElementById('stopwatch').textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(secs).padStart(2, '0');
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapElement.classList.add('lap');
        lapsContainer.appendChild(lapElement);
    });
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!timer) {
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

document.getElementById('resetButton').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    laps.length = 0; // Clear laps
    updateDisplay();
    displayLaps(); // Update lap display
});

document.getElementById('lapButton').addEventListener('click', () => {
    if (timer) {
        const lapTime = updateDisplay();
        laps.push(document.getElementById('stopwatch').textContent);
        displayLaps();
    }
});