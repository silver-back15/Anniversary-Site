let slideindex = 1;
let slideInterval;

function showSlides(n) {
    let slides = document.getElementsByClassName("slideshow-img");
    if (n > slides.length) slideindex = 1;
    if (n < 1) slideindex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides[slideindex - 1]) {
        slides[slideindex - 1].style.display = "block";
    }
}

function plusSlides(n) {
    clearInterval(slideInterval);
    slideindex += n;
    showSlides(slideindex);
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 8000);
}

// Initialize
showSlides(slideindex);
startAutoSlide();