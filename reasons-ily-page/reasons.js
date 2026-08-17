const CONFIG = {
  noteCount: 120, // <-- updated to match the size (safe to keep higher)
  baseRadius: 220,
  height: 600,
  riseSpeed: 0.6,
  spinSpeed: 0.25,
};

const SAMPLE = [
  "The way you smile",
  "The way you your eyes move",
  "Your presence",
  "Your voice",
  "The way you giggle",
  "The way you light up the room when you walk",
  "The way you enjoy singing",
  "The way you nod your head while singing",
  "The way you walk",
  "The way you hold your hand bag",
  "The way you talk w me",
  "The way you get excited",
  "The way you cry",
  "The look you have you're sleepy",
  "The way you take care of people",
  "The way you lit up everyone's heart",
  "Your kindess",
  "Your care",
  "Your love",
  "Your affection",
  "The way you tie your hair",
  "When you pull out two strands of your hair, it has never suited anybody this good.",
  "When you pull your camera during all those kissies",
  "When you wear a bindhi, that's literally the best possible Desi girl this world can ever find",
  "The way you make my heart ache.",
  "The way you teach me things",
  "The way you get angry(scary but still)",
  "When you make all flowers look less prettier cuz you exist",
  "The way you sing",
  "The way your eyes look at me",
  "The way you showed me I can be respected",
  "You showed me i can be loved unconditionally",
  "You brought colors to my life, colors I didn't know existed",
  "You made sure living is fun",
  "You made me look forward for every tomorrow as long as you're in it",
  "You made remembering things such a fun activity",
  "I never knew I can't ever be tired of listening to you talk",
  "The way you talk abt the most random things on call",
  "The way you panicked when I called you the other day when you were in. The car",
  "The way you reacted when I cut my hair, only to realize all this things exist only to see you happy excited that's the purpose of my life",
  "Omg the way you pray with your eyes closed and that white Shawl over your head kneeled down.",
  "When you look at me and winked and made me forget we exist in a world Where other people exist.",
  "Getting my cheeks pinched was one of the best moments of my life and I'm glad you did it because until then I never knew I fw that",
  "Omg your chubbiness it's like one of the best experience. Tbh the best exp.",
  "The way you make every clothe feel like it was made for you and only for you.",
  "When nights felt shorter because we were on call.",
  "My nights were filled with giggles only cuz of you",
  "Ik I look super ugly when I blush but God I can't hold it back when it's you atp idc if it's ugly I can't help it",
  "The way I feel I'm home when I'm w you",
  "Have you seen those scenes where people throw their bags and ties on the floor after they come home that's just how things are w you.",
  "When you held your bag and crossed the road I had the best fuckn moments of my life that day if I was asked to die that day I fuckn would've died content",
  "The way you give me your bag when we meet. Like I didn't even have to ask you just gave it to me after a point",
  "The way you let me tuck your hair behind your ears during our second meet",
  "The way you held my hands when I was pushing my cycle",
  "When you sacrificed your sleep for me just so we could talk on video call.",
  "The way you touched my hips and pushed me and made sure the car doesn't hit me that's like such a sweet day",
  "The way you asked me kaasu iruka ila tharata when we were in vr for some reason it wasn't embarrassing at all.",
  "The way you advised me abt driving during 2021 when you told me to update you wherever I go",
  "When you asked me to wear helmet anol even though you knew I'm a coward",
  "Choosing me and accepting me despite all my physical imperfections ik I'm heavily flawed w my looks and my body and you still accepted me it was like god telling me I can be loved too",
  "When you are patient w me and that really means the most to me",
  "When I drooled over someone w wet hair I knew I was in love cuz that's smth I neve thought would happen",
  "When you brought the inner kid in me to cycle and come to church I never thought I'll do it all cuz if not for you I wouldn't have",
  "When on a random day on November you said I'll always be there for you no matter what happens.",
  "When you sat in extreme cold in Saudi and sacrificed your sleep for me just so you could talk w me.",
  "When you had diabetes and I was scared to death cuz I genuinely was afraid I was going to loose you",
  "When you left to Serbia the entire night was a reminder to me that I was in love w you.",
  "When you video called me in Serbia and you showed me all the places with the bubble gum in your mouth and coolers on your head that's my first time seeing all those beautiful places I mean I do look at you everyday but it's still fresh and new",
  "The way you trusted me with everything despite every bad shit I put you thru",
  "The way everything was abt you during the breakup wherever I go all I saw was you fragments of you splattered all over the places I go",
  "The way I saw you In me in everything I did after you left.",
  "When you made me realize words aren't just words they have the power to empower someone on a diff level.",
  "When you made me realize you're the only one that holds thr key to me.",
  "When I realized all that mattered to me was what you thought of Me",
  "The way you made me feel safe and made me dump all the worries and sadness I had all these years",
  "The way you keep pushing no matter what happens showing what a strong human looks like",
  "The way you cough even though it's sad af it's so adorable",
  "The way you eat",
  "The way you fed me and I realized I want those hands to feed me for the rest of my life I'm not sure if I'm fortunate to have that but I'm glad I had that moment in my life",
  "When I realized if I died alone there won't be a bit of regret because I met you that chapter is forever the beautiful one in anyone's life",
  "When you wished me happy bday from afar with so much joy and that's undoubtedly the best ever bday I've ever had",
  "When we stood few meters away from each other and you talking w Diana and we both knew we were looking at each other and I was standing in a place where you were there it's the most calming situation fr",
  "When I saw you In that blue dress after the breakup during June ig and you were so beautiful I wanted to jump off from the balcony that day cuz I couldn't have you",
  "The way you sacrificed so much taking the blame putting on an act just so I won't get hurt? That's Basically top tier nobility. That's one of the most beautiful act anyone can ever see",
  "The way you sucked up all the torture I gave and stayed and accepted me. I'll never forgive myself for that I wouldn't be surprise if I kms for that",
  "The way Christmas feels when you're there in my life. It just glows different and lovely. The red green yellow colors start coloring thank you so much for that sam",
  "The way you gave me a new identity, JUJU the name I'll take to my grave, a name I'm completely in love w.",
  "Being called juju by you is smth id die for happily.",
  "Feels like I was saved from that accident only to hear these stuff from you.",
  "Everytime it's a juju ma or juju kutty I melt I melt like ice placed on Sahara.",
  "The way you gave me strength when I wanted to give up so bad.",
  "I look up to you and the words you told me",
  "Idk if you saw sapta sagaradaache ello, he has a tape right I have smth similar to that of yours w me",
  "It's a voice msg and it's smth I'll carry to my grave id never delete it.",
  "Even if we had to drift apart forever it's the only thing that gives me hope keeps me running",
  "When you pamper me omg I never knew I wanted to be pampered",
  "I found parts of me I never knew I had.",
  "When I get excited sbt smth and you understand it without even having to explain it",
  "and the best part is I'm not even excited abt the situation I'm excited abt the way you react",
  "The way you understood me how happy I was when nwh trailer released",
  "and I just woke up and saw the trailer and I run to you saying bbbyyy",
  "and you were like \"I know🤭\"",
  "i think abt it all the time and I cry sometimes",
  "cuz it's smth I never thought I'll experience and I never will ever again in my life.",
  "When you stayed with me even though I was being the biggest disappointment you can ever find.",
  "Not just you anybody you still stayed with such a loser and loved him like anything",
  "When I knew if smth fucks up I can always come to you even if we aren't together you'll always be my safe place sam",
  "The way I saw you were the elixir of my life was shockingly amusing and scary",
  "because life just got darker without you and you came back it was back to light then it's back to dark",
  "Everytime i go out I realize I wasn't just raised by sujithra I was raised by samantha too",
  "it's actually a privilege not everybody gets apart from me and my kids hopefully idk",
  "The way your eyes captivate Me",
  "The way you say \"nottuvanga\"",
  "The way you say \"ahaan\" or \"adhudha\" or \"aiyo aiyo\"",
  "The way you introduced new words to my vocabulary.",
  "The way you make people feel God's presence in you.",
  "The fact that you don't need reasons to be loved"
];

/* ============================
   DOM refs
   ============================ */
const tornadoEl = document.getElementById('tornado');
const pauseBtn = document.getElementById('pauseBtn');
const randomBtn = document.getElementById('randomizeBtn');
const resetBtn = document.getElementById('resetBtn');
const popupBg = document.getElementById('popupBg');
const popupBox = document.getElementById('popupBox');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');
const sidebarList = document.getElementById('sidebarList');

/* ============================
   State
   ============================ */
let notes = []; // { el, angle, y, speed, radius, rot, read, removed }
let globalRotation = 0;
let paused = false;
let last = performance.now();

/* ============================
   FUNCTIONS: create & init notes
   ============================ */
function createNotes(){
  // clean up
  notes = [];
  tornadoEl.innerHTML = '';

  for(let i=0;i<CONFIG.noteCount;i++){
    const el = document.createElement('div');
    el.className = 'note';
    el.tabIndex = 0;
    el.innerText = SAMPLE[i % SAMPLE.length];
    tornadoEl.appendChild(el);

    const obj = {
      el,
      angle: Math.random()*Math.PI*2,
      y: Math.random()*CONFIG.height*-1,
      speed: 0.6 + Math.random()*0.9,
      radius: CONFIG.baseRadius * (0.6 + Math.random()*0.6),
      rot: Math.random()*40-20,
      read: false,
      removed: false
    };
    notes.push(obj);

    // click handler (uses closure obj)
    el.addEventListener('click', () => onNoteClick(obj));
    el.addEventListener('keydown', (ev) => {
      if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        onNoteClick(obj);
      }
    });
  }
}

/* ============================
   Note click: popup + remove + sidebar
   ============================ */
function onNoteClick(noteObj){
  if(noteObj.removed) return;

  // 1) slow spin for dramatic effect
  gsap.to(CONFIG, { spinSpeed: 0.05, duration: 0.42, ease: "power3.out" });

  // 2) pop animation on the element
  gsap.fromTo(noteObj.el, { scale: 1 }, { scale: 1.35, duration: 0.28, yoyo:true, repeat:1, ease:"power2.out" });

  // 3) show popup with content
  popupMessage.textContent = noteObj.el.innerText;
  popupBg.style.display = 'flex';
  popupBg.setAttribute('aria-hidden', 'false');
  gsap.killTweensOf(popupBox);
  gsap.set(popupBox, { scale: 0.86, opacity: 0 });
  gsap.to(popupBox, { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.6)" });

  // 4) Remove from tornado visually after a short delay (so pop shows)
  gsap.to(noteObj.el, {
    opacity: 0,
    scale: 0.6,
    duration: 0.5,
    delay: 0.28,
    ease: "power3.in",
    onComplete: () => {
      // Mark removed so the animation loop ignores it
      noteObj.removed = true;
      // Remove DOM node
      if(noteObj.el && noteObj.el.parentNode) noteObj.el.parentNode.removeChild(noteObj.el);
    }
  });

  // 5) mark as read & add to sidebar
  noteObj.read = true;
  addToSidebar(noteObj.el.innerText);
}

/* ============================
   Sidebar: add item and click handler
   ============================ */
function addToSidebar(text){
  const item = document.createElement('div');
  item.className = 'sidebar-note';
  item.innerText = text;

  item.addEventListener('click', () => {
    // show popup again with this content
    popupMessage.textContent = text;
    popupBg.style.display = 'flex';
    popupBg.setAttribute('aria-hidden', 'false');
    gsap.set(popupBox, { scale: 0.86, opacity: 0 });
    gsap.to(popupBox, { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.6)" });
  });

  sidebarList.appendChild(item);
}

/* ============================
   Animation loop: tornado physics
   ============================ */
   function update(delta){
    globalRotation += delta * CONFIG.spinSpeed;
  
    // Get the tornado container's center point
    const tornadoWidth = tornadoEl.offsetWidth;
    const tornadoHeight = tornadoEl.offsetHeight;
    const centerX = tornadoWidth / 2;
    const centerY = tornadoHeight / 2;
  
    for(let i=0;i<notes.length;i++){
      const n = notes[i];
      if(n.removed) continue; // skip removed notes
  
      n.y += delta * CONFIG.riseSpeed * n.speed;
      if(n.y > CONFIG.height){
        // recycle to bottom
        n.y = -20 - Math.random()*CONFIG.height*0.18;
        n.radius = CONFIG.baseRadius * (0.6 + Math.random()*0.6);
        n.angle = Math.random()*Math.PI*2;
      }
  
      const t = (n.y + CONFIG.height) / CONFIG.height; // 0..1
      const liveRadius = n.radius * (1 - 0.65 * t); // shrink as it rises
  
      // orbit - centered around (0,0)
      const x = Math.cos(n.angle + globalRotation + i*0.006) * liveRadius;
      const z = Math.sin(n.angle + globalRotation + i*0.006) * liveRadius;
      const y = n.y;
  
      // Adjust coordinates to be relative to container center
      const finalX = x + centerX;
      const finalY = y + centerY;
  
      // map z to scale/opacity for depth
      const scale = 1 + (z / (CONFIG.baseRadius * 2)) * 0.45;
      const opacity = 0.55 + (1 - t) * 0.5;
  
      // apply transform - note the -70px adjustment for the note's own height
      if(n.el){
        n.el.style.transform = `translate3d(${finalX - 70}px, ${finalY - 55}px, 0px) scale(${1 + (0.18 * (1 - t))}) rotate(${n.rot + (globalRotation*38)}deg)`;
        n.el.style.zIndex = Math.floor(1000 - z);
        n.el.style.opacity = opacity;
      }
    }
  }

function raf(now){
  const delta = (now - last) / 1000;
  last = now;
  if(!paused) update(delta);
  requestAnimationFrame(raf);
}

/* ============================
   Control handlers
   ============================ */
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
});

randomBtn.addEventListener('click', () => {
  notes.forEach(n => {
    n.angle = Math.random()*Math.PI*2;
    n.y = Math.random()*-CONFIG.height;
    n.radius = CONFIG.baseRadius * (0.6 + Math.random()*0.6);
  });
});

resetBtn.addEventListener('click', () => {
  // clear sidebar and reset scene
  sidebarList.innerHTML = '';
  createNotes();
  // restore spin speed
  gsap.to(CONFIG, { spinSpeed: 0.25, duration: 0.5, ease: "power3.out" });
});

/* ============================
   Popup close restores tornado speed
   ============================ */
function closePopupFn(){
  gsap.to(popupBox, { scale: 0.86, opacity: 0, duration: 0.28, ease: "power2.in" });
  gsap.to(CONFIG, { spinSpeed: 0.25, duration: 0.7, ease: "power3.out" });
  setTimeout(()=> {
    popupBg.style.display = 'none';
    popupBg.setAttribute('aria-hidden','true');
  }, 320);
}

closePopup.addEventListener('click', closePopupFn);
popupBg.addEventListener('click', (e) => { if(e.target === popupBg) closePopupFn(); });

/* ============================
   Init everything & start RAF
   ============================ */
createNotes();
requestAnimationFrame(raf);

// expose for debugging (optional)
window._memoryTornado = { notes, CONFIG };