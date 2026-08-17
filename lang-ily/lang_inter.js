document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // Video mapping (adjust paths to your actual .mp4 files)
    const videoMap = {
        italy: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/ital.mp4',
        spanish: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/span.mp4',
        french: ' https://github.com/silver-back15/Anniversary-Site/releases/download/v1/french.mp4',
        hindi: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/hindi.mp4 ',
        telugu: ' https://github.com/silver-back15/Anniversary-Site/releases/download/v1/telugu.mp4',
        german: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/german.mp4',
        japanese: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/jap.mp4',
    };

    function getVideoSrc(card) {
        const langAttr = card.getAttribute('data-lang');
        if (langAttr && videoMap[langAttr]) return videoMap[langAttr];
        // fallback: try inner text or image name (but data-lang is reliable now)
        const img = card.querySelector('.letter-cover');
        if (img && img.src) {
            let name = img.src.split('/').pop().split('.')[0].replace(/-img$/, '');
            if (videoMap[name]) return videoMap[name];
        }
        return null;
    }

    function openVideoModal(src) {
        const existingModal = document.querySelector('.video-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'video-modal';

        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'close-modal-btn';
        closeBtn.addEventListener('click', () => modal.remove());

        modal.appendChild(video);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);

        // GSAP entrance animation
        gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(video, { scale: 0.95, y: 20 }, { scale: 1, y: 0, duration: 0.5, delay: 0.1 });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoSrc = getVideoSrc(card);
            if (videoSrc) {
                openVideoModal(videoSrc);
            } else {
                alert("💌 This language video will be added soon. Stay tuned!");
            }
        });
    });

    // Optional: GSAP fade-in for cards on load
    gsap.from(".card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(0.5)"
    });

    gsap.from(".title-sec", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});