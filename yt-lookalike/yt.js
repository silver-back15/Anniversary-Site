// yt-look.js
// Video data array – replace with your actual video details
const playlistVideos = [{
        src: 'https://github.com/judedavid-create/Anniversary-Site/releases/download/v1/mariposa.mp4',
        title: 'Mariposa - Peach Tree Rascals',
        channel: 'JUDExDAVID',
        thumbnail: 'https://via.placeholder.com/50x70?text=Mariposa'
    },
    {
        src: 'https://github.com/judedavid-create/Anniversary-Site/releases/download/v1/Cloud.9.final.mp4',
        title: 'Cloud 9 - Beach Bunny',
        channel: 'JUDExDAVID',
        thumbnail: 'https://via.placeholder.com/50x70?text=Cloud+9'
    },
    {
        src: 'https://github.com/judedavid-create/Anniversary-Site/releases/download/v1/Irresistible.mp4',
        title: 'Irresistible - One Direction',
        channel: 'JUDExDAVID',
        thumbnail: 'https://via.placeholder.com/50x70?text=Irresistible'
    },
    {
        src: 'https://github.com/judedavid-create/Anniversary-Site/releases/download/v1/No.judgement.mp4',
        title: 'No Judgement - Niall Horan',
        channel: 'JUDExDAVID',
        thumbnail: 'https://via.placeholder.com/50x70?text=No+Judgement'
    },
    // add more videos as needed
];

// Render the playlist from the array, preserving your CSS classes
function renderPlaylist() {
    const playlistContainer = document.querySelector('.playlist-video');
    if (!playlistContainer) return;

    // Keep the heading and close button, remove all other children
    const heading = playlistContainer.querySelector('h1');
    const closeButton = playlistContainer.querySelector('.close-button');
    Array.from(playlistContainer.children).forEach(child => {
        if (child !== heading && child !== closeButton) {
            playlistContainer.removeChild(child);
        }
    });

    // Create a new .indi-desc wrapper for each video
    playlistVideos.forEach(video => {
        const wrapper = document.createElement('div');
        wrapper.className = 'indi-desc';

        const link = document.createElement('a');
        link.href = '#'; // prevents page reload

        // Thumbnail
        const img = document.createElement('img');
        img.className = 'video-img';
        img.src = video.thumbnail;
        img.alt = 'thumbnail';

        // Title
        const titleElem = document.createElement('h3');
        titleElem.className = 'video-info';
        titleElem.textContent = video.title;

        // Channel name
        const channelElem = document.createElement('h6');
        channelElem.className = 'yt-channel';
        channelElem.textContent = video.channel;

        // Horizontal rule
        const hr = document.createElement('hr');

        link.appendChild(img);
        link.appendChild(titleElem);
        link.appendChild(channelElem);
        link.appendChild(hr);

        wrapper.appendChild(link);

        // Click handler to load the selected video
        link.addEventListener('click', (e) => {
            e.preventDefault();
            playVideo(video);
        });

        playlistContainer.appendChild(wrapper);
    });
}

// Load a video into the main player and update the description
function playVideo(video) {
    const mainVideo = document.querySelector('.main-video');
    const videoDesc = document.querySelector('.video-desc');

    if (mainVideo) {
        mainVideo.src = video.src;
        mainVideo.load(); // required after changing src
        // Optional: auto-play (may be blocked if not muted)
        // mainVideo.play().catch(e => console.log('Auto-play prevented:', e));
    }

    if (videoDesc) {
        videoDesc.textContent = video.title;
    }
}

// Initialise everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderPlaylist();

    // Automatically load the first video as the default
    if (playlistVideos.length > 0) {
        playVideo(playlistVideos[0]);
    }
});