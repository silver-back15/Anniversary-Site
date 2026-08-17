import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './tv.css';
const tvContainer = document.querySelector('.tv-cont');

// ---- SCENE ----
const scene = new THREE.Scene();

// ---- CAMERA ----
const camera = new THREE.PerspectiveCamera(
    45,
    tvContainer.clientWidth / tvContainer.clientHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 3);

// ---- RENDERER ----
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(tvContainer.clientWidth, tvContainer.clientHeight);
tvContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

const videos = [
    'videos/vid_edit1.mp4',
    'videos/vid_edit2.mp4',
    'videos/vid_edit3.mp4',
    'videos/vid_edit4.mp4',
    'videos/vid_edit5.mp4',
    'videos/vid_edit6.mp4',
    'videos/vid_edit7.mp4',
    'videos/vid_edit8.mp4',
];
let currentVideoIndex = 0;

const video = document.createElement('video');
video.src = videos[currentVideoIndex];
video.loop = true;
video.muted = false;
video.autoplay = false;
video.playsInline = true;
video.crossOrigin = 'anonymous';

// Error handling
video.addEventListener('error', (e) => {
    console.error('Video error:', video.error);
});

// Create VideoTexture
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// ---- LOAD TV MODEL ----
const loader = new GLTFLoader();
loader.load(
    'tv-model.glb',
    function(gltf) {
        const model = gltf.scene;
        console.log('Model loaded:', model);

        // Scale model
        model.scale.set(0.7, 0.7, 0.7);

        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        // Rotate model to face camera (adjust as needed)
        model.rotation.y = Math.PI;

        scene.add(model);

        // ---- TV SCREEN (Plane that will display video) ----
        const screenGeometry = new THREE.PlaneGeometry(1.6, 1.3); // Adjust to fit your TV model's screen
        const screenMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);

        // Position the screen in front of the TV's screen area
        // These coordinates depend on your specific model – you may need to tweak
        screenMesh.position.set(0.6, 2.5, 0);
        // If your model's screen faces a different direction, adjust rotation
        screenMesh.rotation.y = Math.PI / 2; // Example: rotate 90° left

        model.add(screenMesh); // Attach screen to TV model

        // ---- ANIMATION LOOP ----
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    function(error) {
        console.error('Model failed to load', error);
    }
);

// ---- PLAYBACK CONTROLS ----
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volUpBtn = document.getElementById('volUpBtn');
const volDownBtn = document.getElementById('volDownBtn');

playBtn.addEventListener('click', () => {
    video.play().catch(err => console.warn('Play failed:', err));
});

pauseBtn.addEventListener('click', () => {
    video.pause();
});

volUpBtn.addEventListener('click', () => {
    video.volume = Math.min(video.volume + 0.1, 1);
});

volDownBtn.addEventListener('click', () => {
    video.volume = Math.max(video.volume - 0.1, 0);
});

// Optional: Mute/unmute button
const muteBtn = document.getElementById('muteBtn');
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    });
}

// ---- CHANNEL BUTTONS ----
const channelList = document.getElementById('channelList');
videos.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.className = 'channel';
    btn.textContent = `Channel ${index + 1}`;
    btn.addEventListener('click', () => {
        currentVideoIndex = index;
        video.src = videos[currentVideoIndex];
        video.load();
        video.play();
    });
    channelList.appendChild(btn);
});
// ---- RESIZE HANDLER ----
window.addEventListener('resize', () => {
    renderer.setSize(tvContainer.clientWidth, tvContainer.clientHeight);
    camera.aspect = tvContainer.clientWidth / tvContainer.clientHeight;
    camera.updateProjectionMatrix();
});