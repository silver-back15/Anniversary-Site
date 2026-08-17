// gsap.timeline()
//     .to(".splash-screen", {
//         opacity: 1,
//         duration: 1.5,
//         ease: "power2.out"
//     })
//     .to(".splash-screen", {
//         opacity: 0,
//         duration: 1.5,
//         ease: "power2.inOut",
//         delay: 1,
//         onComplete: () => {
//             document.querySelector(".splash-screen").style.display = "none";
//         }
//     });

const tl = gsap.timeline();

tl.to(".splash-screen", {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    duration: 1.5,
    ease: "power3.out"
});

tl.to(".splash-text span", {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.8");

tl.to(".splash-text", {
    textShadow: "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(108,92,231,1)",
    duration: 1,
    yoyo: true,
    repeat: 1
});

tl.to({}, { duration: 1 });

tl.to(".splash-screen", {
    opacity: 0,
    filter: "blur(8px)",
    duration: 1.5,
    ease: "power2.inOut",
    onComplete: () => {
        document.querySelector(".splash-screen").style.display = "none";
    }
});