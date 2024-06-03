const openWheelButton = document.getElementById("open-wheel-button");
const closeOverlayButton = document.getElementById("close-overlay-button");
const wheelContainer = document.getElementById("wheel-container");
const spinButton = document.getElementById("spin-button");
const resultContainer = document.getElementById("result-container");
const congratsContainer = document.getElementById("congrats-container");
const closeCongratsButton = document.getElementById("close-overlay-button");
const spinMessage = document.getElementById("spin-message");

let hasSpun = false;


openWheelButton.addEventListener("click", () => {
    wheelContainer.classList.remove("hidden");
    openWheelButton.classList.add("hidden");
});

closeOverlayButton.addEventListener("click", () => {
    wheelContainer.classList.add("hidden");
    openWheelButton.classList.remove("hidden");
});

spinButton.addEventListener("click", () => {
    if (!hasSpun) {
        rotateWheel();
        hasSpun = true;
    } else {
        spinMessage.textContent = "You've already spun and you can only spin once";
        spinMessage.classList.remove("hidden");

}});


closeCongratsButton.addEventListener("click", () => {
    congratsContainer.classList.add("hidden");
});

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = ["Prijs 1", "Prijs 2", "Prijs 3", "Prijs 4", "Prijs 5", "Prijs 6", "Prijs 7", "Prijs 8"];
const colors = ["#A833FF", "#FFC300", "#3357FF", "#FF33A8", "#A833FF", "#FFC300", "#3357FF",  "#FF33A8"];
const segmentAngle = 2 * Math.PI / segments.length;
let currentAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    for (let i = 0; i < segments.length; i++) {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.fillText(segments[i], radius / 2, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    resultContainer.classList.add('hidden');
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    requestAnimationFrame(spin);
}

function spin() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    currentAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    requestAnimationFrame(spin);
}

function stopRotateWheel() {
    const degrees = currentAngle * 180 / Math.PI + 90;
    const arcd = segmentAngle * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const prizeWon = segments[index];
    congratsContainer.querySelector("#congrats-text").textContent = `Congratulations! You won ${prizeWon}!`;
    resultContainer.classList.remove('hidden');
    congratsContainer.classList.remove('hidden');
    // Draw an arrow pointing to the winning segment
function drawArrow() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const arrowLength = 30; // Length of the arrow
    const arrowWidth = 10; // Width of the arrow

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle + segmentAngle / 2); // Rotate to the center of the winning segment

    // Draw the arrow
    ctx.beginPath();
    ctx.moveTo(0, -radius + arrowLength); // Start at the top of the wheel
    ctx.lineTo(-arrowWidth / 2, -radius); // Draw left side of the arrow
    ctx.lineTo(arrowWidth / 2, -radius); // Draw right side of the arrow
    ctx.closePath();
    ctx.fillStyle = "red"; // Set arrow color
    ctx.fill();

    ctx.restore();
}

}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

drawWheel();

