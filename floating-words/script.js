// ====== Data ======
const compliments = [
    { word: "Grace", compliment: "You move like you were never taught to hesitate — like grace is just your default setting." },
    { word: "Radiance", compliment: "Rooms don't light up when you walk in. You just make the lighting redundant." },
    { word: "Charm", compliment: "A charm that can never be replaced or found ever again — they broke the mold and lost the blueprint too." },
    { word: "Poise", compliment: "You could walk through chaos in heels and somehow make it look choreographed." },
    { word: "Glow", compliment: "Your eyes do something scientists haven't named yet — some quiet kind of arson for people's hearts." },
    { word: "Elegance", compliment: "Elegance doesn't follow you around — it just moved in and never left." },
    { word: "Warmth", compliment: "Being near you feels like a snowy night with a fireplace that's been lit for hours, not minutes." },
    { word: "Beauty", compliment: "Your beauty isn't a moment — it's a timeline. Past, present, and every version still to come." },
    { word: "Confidence", compliment: "You carry yourself like someone who already knows how this story ends well." },
    { word: "Joy", compliment: "Your laugh has genuinely ruined 'fine' as an acceptable mood for everyone around you." },
    { word: "Soul", compliment: "There's a depth in you that feels less like a personality trait and more like a whole ocean nobody's fully mapped." },
    { word: "Kindness", compliment: "Your kindness is the reason the world feels survivable on its worst days." },
    { word: "Spark", compliment: "You ignite something in people that makes 'I miss you' start forming before you've even left the room." },
    { word: "Magic", compliment: "You make ordinary Tuesdays feel like they were scripted by someone who believes in main characters." },
    { word: "Light", compliment: "You don't just brighten rooms — you make the noise in people's heads go quiet for a second." },
    { word: "Dream", compliment: "You make imagination feel less like escapism and more like a preview of what's coming." },
    { word: "Heart", compliment: "Your heart runs on a kind of compassion most people have to practice for years to fake." },
    { word: "Style", compliment: "Nobody's as stylish as you in that dress. Fun fact: it's genuinely just all the dresses." },
    { word: "Peace", compliment: "You're proof that peace can be a person and not just a place you meditate toward." },
    { word: "Strength", compliment: "Moving to a different country and rebuilding a whole life is the kind of strength people write books about — you just lived it." },
    { word: "Serenity", compliment: "Being around you feels like the first deep breath after holding it in too long." },
    { word: "Muse", compliment: "You inspire creativity in people who didn't even know they had any left." },
    { word: "Aura", compliment: "There's something about you people clock the second you walk in, before you've said a single word." },
    { word: "Brilliance", compliment: "Your mind is doing just as much heavy lifting as your face, and honestly it's not close." },
    { word: "Comfort", compliment: "You make the worst days feel like they're borrowing time instead of taking over completely." },
    { word: "Fire", compliment: "There's a quiet intensity in you that never dims, it just waits for the right moment to remind people it's there." },
    { word: "Bloom", compliment: "You grow beautifully no matter where life plants you, half garden, half stubborn miracle." },
    { word: "Gracefire", compliment: "You're soft enough to comfort someone and sharp enough to still hold your ground , most people only get one setting." },
    { word: "Hope", compliment: "You make people believe things will be okay just by existing in the same room as their doubt." },
    { word: "Balance", compliment: "You hold chaos and calm in the same hand like it's nothing, when it's actually everything." },
    { word: "Depth", compliment: "There's always another layer to you, people think they've reached the bottom and then you surprise them again." },
    { word: "Presence", compliment: "You don't demand attention ,the room just quietly rearranges itself around you anyway." },
    { word: "Golden", compliment: "You have a warmth that feels rare, like something people would trade a lot to keep close." },
    { word: "Ease", compliment: "You make everything feel lighter, like the air itself relaxes a little when you're around." },
    { word: "Truth", compliment: "What you give people is always real , no filters, no performance, just you, which is somehow rarer than it should be." },
    { word: "Calm", compliment: "You steady a room without saying a word, like the noise just knows to lower itself around you." },
    { word: "Wonder", compliment: "There's always something new to discover about you, like you were built with extra rooms nobody's found yet." },
    { word: "Anchor", compliment: "You ground people when life feels like it's tipping over, without even realizing you're doing it." },
    { word: "Flair", compliment: "You turn simple, boring moments into something people replay later just to feel it again." },
    { word: "Becoming", compliment: "Watching you evolve isn't just inspiring, it's like watching someone slowly turn into the best rumor about themselves." }
];

// ====== DOM References ======
const wordsContainer = document.querySelector("#words-container");
const sidebar = document.querySelector("#sidebar");
const displayArea = document.querySelector("#display-area");

// ====== State ======
const selectedWords = new Map();

// ====== Initialize Floating Words ======
compliments.forEach(({ word }) => {
    const el = document.createElement("div");
    el.className = "floating-word";
    el.textContent = word;

    // random position
    el.style.top = Math.random() * 90 + "%";
    el.style.left = Math.random() * 90 + "%";
    el.style.animationDelay = (Math.random() * 5) + "s";

    wordsContainer.appendChild(el);
});

// ====== Word Click Handling ======
wordsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("floating-word")) {
        const word = e.target.textContent;
        const entry = compliments.find(c => c.word === word);
        if (!entry) return;

        showCompliment(entry);

        if (!selectedWords.has(word)) {
            selectedWords.set(word, entry.compliment);
            addToSidebar(entry);
        }
    }
});

sidebar.addEventListener("click", (e) => {
    if (e.target.classList.contains("sidebar-item")) {
        const word = e.target.textContent;
        const compliment = selectedWords.get(word);
        showCompliment({ word, compliment });
    }
});

// ====== Functions ======
function showCompliment({ word, compliment }) {
    displayArea.innerHTML = `
      <h2>${word}</h2>
      <p>${compliment}</p>
    `;
}

function addToSidebar({ word }) {
    const item = document.createElement("div");
    item.className = "sidebar-item";
    item.textContent = word;
    sidebar.appendChild(item);
}