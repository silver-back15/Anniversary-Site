gsap.registerPlugin(ScrollTrigger);

// Fade up animation for menu cards
gsap.utils.toArray(".leftmenu, .rightmenu").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.5,
        },
        opacity: 0,
        y: 60,
        duration: 1,
        delay: i * 0.05,
    });
});

// Hero text subtle zoom
gsap.from(".first-sec-text", {
    duration: 1.5,
    scale: 0.9,
    opacity: 0,
    ease: "back.out(0.6)",
    delay: 0.2
});

gsap.from(".first-sec-second-text, .first-sec-third-text", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 0.6
});

// Timer container entrance
gsap.from(".timer", {
    scrollTrigger: {
        trigger: ".timer",
        start: "top 80%",
        end: "top 40%",
        scrub: 0.8,
    },
    opacity: 0,
    scale: 0.96,
    duration: 1
});

// Slideshow fade in while scrolling
gsap.from(".slideshow-whole", {
    scrollTrigger: {
        trigger: ".slideshow-whole",
        start: "top 85%",
        end: "top 40%",
        scrub: true,
    },
    opacity: 0,
    y: 40
});

// Add a tiny floating animation to title
gsap.to(".title", {
    y: 5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});