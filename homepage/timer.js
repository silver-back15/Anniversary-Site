// Intro fade-out
const splash = document.querySelector('.intro');
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        splash.classList.add('display-none');
    }, 2200);
});

const startDate = new Date("2020-10-01T00:00:00");

function countUp() {
    const now = new Date();
    let diff = now - startDate;

    let seconds = Math.floor(diff / 1000) % 60;
    let minutes = Math.floor(diff / (1000 * 60)) % 60;
    let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.querySelector(".years").textContent = years.toString().padStart(2, "0");
    document.querySelector(".months").textContent = months.toString().padStart(2, "0");
    document.querySelector(".days").textContent = days.toString().padStart(2, "0");
    document.querySelector(".hours").textContent = hours.toString().padStart(2, "0");
    document.querySelector(".minutes").textContent = minutes.toString().padStart(2, "0");
    document.querySelector(".seconds").textContent = seconds.toString().padStart(2, "0");
}

countUp();
setInterval(countUp, 1000);