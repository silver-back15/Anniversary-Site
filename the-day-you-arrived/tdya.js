  const CHANNELS = [
      { name: "CH 01 — Bunny", src: "https://www.youtube.com/watch?v=ZXQGN0RkZ4Y" },
      { name: "CH 02 — Elephant", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { name: "CH 03 — Sintel", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
  ];

  const video = document.getElementById("crt-video");
  const playBtn = document.getElementById("crt-play");
  const controls = document.getElementById("crt-controls");
  let current = 0;

  function loadChannel(i, autoplay) {
      current = i;
      video.src = CHANNELS[i].src;
      video.load();
      renderChannelButtons();
      if (autoplay) video.play().catch(() => {});
  }

  function renderChannelButtons() {
      controls.querySelectorAll("[data-ch]").forEach(b => b.remove());
      CHANNELS.forEach((c, i) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "crt-btn" + (i === current ? " is-active" : "");
          b.dataset.ch = i;
          b.textContent = c.name;
          b.addEventListener("click", () => loadChannel(i, !video.paused));
          controls.appendChild(b);
      });
  }

  playBtn.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
  });
  video.addEventListener("play", () => playBtn.textContent = "❚❚ Pause");
  video.addEventListener("pause", () => playBtn.textContent = "▶ Play");

  loadChannel(0, false);


  gsap.registerPlugin(ScrollTrigger);

  const paperWrap = document.getElementById('paper-wrap');
  const foldTop = document.getElementById('fold-top');
  const foldBottom = document.getElementById('fold-bottom');
  const scrollHint = document.getElementById('scroll-hint');

  // ── Initial state: folded (both halves rotated 90° away from viewer) ──
  gsap.set(paperWrap, { opacity: 0, scale: 0.88, rotateX: 6 });
  gsap.set(foldTop, { rotateX: -90, transformOrigin: 'bottom center' });
  gsap.set(foldBottom, { rotateX: 90, transformOrigin: 'top center' });

  // ── Main timeline ──────────────────────────────────────────────────────
  const tl = gsap.timeline({
      scrollTrigger: {
          trigger: '.newspaper-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: false,
      }
  });

  // UNFOLD IN  (0 → 0.45 of scroll)
  tl
      .to(scrollHint, { opacity: 0, duration: 0.05 }, 0)

  // Paper appears
  .to(paperWrap, {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 0.2,
      ease: 'power2.out'
  }, 0)

  // Top half unfolds downward
  .to(foldTop, {
      rotateX: 0,
      duration: 0.35,
      ease: 'power3.out'
  }, 0.03)

  // Bottom half unfolds upward (slight delay for stagger feel)
  .to(foldBottom, {
      rotateX: 0,
      duration: 0.35,
      ease: 'power3.out'
  }, 0.08)

  // Gentle settle: slight 3-D tilt then straightens (newspaper weight physics)
  .to(paperWrap, {
          rotateX: -3,
          duration: 0.06,
          ease: 'power1.inOut'
      }, 0.42)
      .to(paperWrap, {
          rotateX: 0,
          duration: 0.08,
          ease: 'power1.out'
      }, 0.48)

  // ── HOLD: paper fully open (0.45 → 0.62) ──
  .to({}, { duration: 0.17 }, 0.45) // empty tween = hold

  // FOLD OUT (0.62 → 1.0 of scroll)
  // Top half folds back up
  .to(foldTop, {
      rotateX: -90,
      duration: 0.3,
      ease: 'power2.in'
  }, 0.62)

  // Bottom folds back down
  .to(foldBottom, {
      rotateX: 90,
      duration: 0.3,
      ease: 'power2.in'
  }, 0.67)

  // Paper shrinks and fades away
  .to(paperWrap, {
      opacity: 0,
      scale: 0.82,
      rotateX: -8,
      duration: 0.25,
      ease: 'power3.in'
  }, 0.75);



  gsap.registerPlugin(ScrollTrigger);

  const ball = document.getElementById('crumple-ball');
  const letter = document.getElementById('letter');
  const shadow = document.getElementById('letter-shadow');
  const hint = document.getElementById('hint');
  const paper = document.getElementById('letter-paper');

  /* ── Initial states ───────────────────────────── */
  // Ball: visible, centred, natural
  gsap.set(ball, {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      opacity: 1,
      transformOrigin: 'center center'
  });

  // Letter: hidden, scaled to a dot
  gsap.set(letter, {
      opacity: 0,
      scale: 0.05,
      rotation: -8,
      transformOrigin: 'center center'
  });

  gsap.set(shadow, { opacity: 0 });

  /* ── Dust motes: tiny particles that fly out when uncrumpling ── */
  function spawnMotes() {
      const sticky = document.getElementById('sticky');
      for (let i = 0; i < 14; i++) {
          const m = document.createElement('div');
          m.className = 'mote';
          sticky.appendChild(m);
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 160;
          gsap.set(m, { x: 0, y: 0, opacity: 0, scale: Math.random() * 1.5 + 0.5 });
          gsap.to(m, {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0.7,
              duration: 0.25,
              delay: Math.random() * 0.15,
              ease: 'power2.out',
              onComplete: () => gsap.to(m, { opacity: 0, y: '+=40', duration: 0.5 + Math.random() * 0.4, ease: 'power1.in', onComplete: () => m.remove() })
          });
      }
  }

  /* ── Master timeline ──────────────────────────── */
  const tl1 = gsap.timeline({
      scrollTrigger: {
          trigger: '.letter-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
      }
  });

  // 0.00 – 0.05  hint fades
  tl1.to(hint, { opacity: 0, duration: 0.05 }, 0);

  // 0.03 – 0.18  ball rotates and wobbles (being picked up)
  tl1.to(ball, {
      rotation: 25,
      y: -18,
      scale: 1.08,
      duration: 0.15,
      ease: 'power1.inOut'
  }, 0.03);

  // 0.18 – 0.34  ball squashes — the "uncrumple" press
  tl1.to(ball, {
      scaleX: 1.35,
      scaleY: 0.75,
      rotation: -10,
      y: 0,
      duration: 0.16,
      ease: 'power2.in'
  }, 0.18);

  // Crease lines fade out as paper flattens
  tl1.to('.crease', {
      opacity: 0,
      scaleX: 0.3,
      duration: 0.22,
      stagger: 0.012,
      ease: 'power2.out'
  }, 0.22);

  // 0.30 – 0.44  ball morphs flat and blooms outward → fades
  tl1.to(ball, {
      scaleX: 3.2,
      scaleY: 0.18,
      opacity: 0,
      duration: 0.18,
      ease: 'expo.out',
      onStart: spawnMotes
  }, 0.30);

  // 0.36 – 0.60  letter unfurls from the centre
  tl1.to(letter, {
      opacity: 1,
      scale: 1,
      rotation: -1.5,
      duration: 0.28,
      ease: 'back.out(1.4)'
  }, 0.34);

  // Paper shadow fades in
  tl1.to(shadow, {
      opacity: 1,
      duration: 0.18,
      ease: 'power2.out'
  }, 0.46);

  // Very subtle sway settle
  tl1.to(letter, {
      rotation: 0.6,
      y: 5,
      duration: 0.09,
      ease: 'power1.inOut'
  }, 0.60);
  tl1.to(letter, {
      rotation: 0,
      y: 0,
      duration: 0.08,
      ease: 'power1.out'
  }, 0.69);

  // 0.70 – 0.82  HOLD (letter fully open, reader dwells)
  tl1.to({}, { duration: 0.12 }, 0.70);

  // ── SCROLL OUT: re-crumple ──────────────────────

  // 0.82 – 0.88  letter starts to scrunch — scale down + rotation
  tl1.to(letter, {
      scale: 0.72,
      rotation: 12,
      y: -10,
      duration: 0.10,
      ease: 'power2.in'
  }, 0.82);

  // Paper shadow leaves
  tl1.to(shadow, { opacity: 0, duration: 0.10, ease: 'power1.in' }, 0.82);

  // 0.88 – 0.94  letter collapses to near-ball shape
  tl1.to(letter, {
      scale: 0.08,
      rotation: 30,
      opacity: 0,
      duration: 0.10,
      ease: 'power3.in'
  }, 0.88);

  // Ball re-appears as letter vanishes
  tl1.to(ball, {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      rotation: -15,
      duration: 0.10,
      ease: 'back.out(1.2)'
  }, 0.88);

  // Crease lines come back
  tl1.to('.crease', {
      opacity: 1,
      scaleX: 1,
      duration: 0.14,
      stagger: 0.01,
      ease: 'power1.out'
  }, 0.90);

  // Ball settles back to resting state
  tl1.to(ball, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.08,
      ease: 'elastic.out(1, 0.6)'
  }, 0.94);


  // ── State ────────────────────────────────────────
  const winZBase = 200;
  let winZ = winZBase;
  let dragState = null;

  let nowPlayingSlot = 0;
  let isPlaying = false;
  let playTimer = null;
  let playProgress = 0; // 0-100
  const minimized = {};
  const tbBtns = {};

  const winMeta = {
      'win-mycomp': { icon: '🖥️', title: 'My Computer' },
      'win-notepad': { icon: '📝', title: 'Notepad' },
      'win-recycle': { icon: '🗑️', title: 'Recycle Bin' },
      'win-ie': { icon: '🌐', title: 'Internet Explorer' },
  };

  const videos = [{
      title: 'Found Footage: Beauty',
      channel: 'JudexDavid',
      duration: '3:00',
      views: '2,007',
      videoURL: 'https://github.com/silver-back15/Anniversary-Site/releases/download/v1/ie-vid.mp4',
      thumb: 'images/thumb1.jpg',
      durationSecs: 180
  }, ];

  function initVideoSidebar() {
      videos.forEach((v, i) => {
          if (!v.title) return;
          const thumbEl = document.getElementById('sugg-thumb-' + i);
          if (thumbEl) {
              if (v.thumb) {
                  thumbEl.innerHTML = `<img src="${v.thumb}" style="width:100%;height:100%;object-fit:cover;display:block"/>`;
              } else {
                  thumbEl.innerHTML = `<div class="yt-sugg-thumb-placeholder" style="display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);font-size:20px">&#9654;</div>`;
              }
          }
          const titleEl = document.getElementById('sugg-title-' + i);
          if (titleEl) titleEl.textContent = v.title;
          const metaEl = document.getElementById('sugg-meta-' + i);
          if (metaEl) metaEl.textContent = `${v.channel} · ${v.duration}`;
          const viewsEl = document.getElementById('sugg-views-' + i);
          if (viewsEl) viewsEl.textContent = v.views + ' views';
      });
  }
  document.addEventListener('DOMContentLoaded', initVideoSidebar);

  // ── Clock ────────────────────────────────────────
  function updateClock() {
      const now = new Date();
      let h = now.getHours(),
          m = now.getMinutes();
      const ap = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      document.getElementById('clock').innerHTML = `${h}:${String(m).padStart(2,'0')}<br>${ap}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  function openWin(id) {
      if (id === 'win-ie') {
          setTimeout(() => loadVideoIntoPlayer(0), 50);
      }
      const el = document.getElementById(id);
      if (!el) return;
      minimized[id] = false;
      el.classList.add('visible');
      el.style.display = 'flex';
      bringToFront(id);
      addTaskbarBtn(id);
      gsap.fromTo(el, { scale: 0.85, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(1.3)' });
  }

  function closeWin(id) {
      const el = document.getElementById(id);
      gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
              el.style.display = 'none';
              el.classList.remove('visible');
              removeTaskbarBtn(id);
          }
      });
  }

  function minimizeWin(id) {
      const el = document.getElementById(id),
          btn = tbBtns[id];
      if (!el) return;
      if (!minimized[id]) {
          const tbRect = btn ? btn.getBoundingClientRect() : { left: 100, top: window.innerHeight - 40 };
          const elRect = el.getBoundingClientRect();
          minimized[id] = true;
          gsap.to(el, {
              x: tbRect.left - elRect.left,
              y: tbRect.top - elRect.top,
              scale: 0.15,
              opacity: 0,
              duration: 0.28,
              ease: 'power3.in',
              onComplete: () => {
                  el.style.display = 'none';
                  gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });
              }
          });
          if (btn) btn.classList.remove('active');
      } else {
          minimized[id] = false;
          el.style.display = 'flex';
          bringToFront(id);
          if (btn) btn.classList.add('active');
          gsap.fromTo(el, { scale: 0.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.5)' });
      }
  }

  function minimizeAll() { Object.keys(tbBtns).forEach(id => { if (!minimized[id]) minimizeWin(id); }) }

  function bringToFront(id) {
      winZ++;
      document.getElementById(id).style.zIndex = winZ;
      Object.keys(tbBtns).forEach(k => tbBtns[k].classList.remove('active'));
      if (tbBtns[id]) tbBtns[id].classList.add('active');
  }

  function addTaskbarBtn(id) {
      if (tbBtns[id]) { tbBtns[id].classList.add('active'); return; }
      const meta = winMeta[id];
      const btn = document.createElement('div');
      btn.className = 'tb-app active';
      btn.innerHTML = `<span style="font-size:14px">${meta.icon}</span><span style="overflow:hidden;text-overflow:ellipsis">${meta.title}</span>`;
      btn.onclick = () => {
          if (minimized[id]) minimizeWin(id);
          else {
              const el = document.getElementById(id);
              if (el.style.display === 'none') openWin(id);
              else minimizeWin(id);
          }
      };
      document.getElementById('tb-apps').appendChild(btn);
      tbBtns[id] = btn;
  }

  function removeTaskbarBtn(id) {
      if (tbBtns[id]) {
          tbBtns[id].remove();
          delete tbBtns[id];
      }
  }

  // ── Drag ─────────────────────────────────────────
  function startDrag(e, id) {
      e.preventDefault();
      bringToFront(id);
      const el = document.getElementById(id),
          rect = el.getBoundingClientRect();
      dragState = { id, startX: e.clientX - rect.left, startY: e.clientY - rect.top };
  }
  document.addEventListener('mousemove', e => {
      if (!dragState) return;
      const el = document.getElementById(dragState.id);
      let nx = e.clientX - dragState.startX,
          ny = e.clientY - dragState.startY;
      nx = Math.max(0, Math.min(nx, window.innerWidth - el.offsetWidth));
      ny = Math.max(0, Math.min(ny, window.innerHeight - 40 - el.offsetHeight));
      el.style.left = nx + 'px';
      el.style.top = ny + 'px';
  });
  document.addEventListener('mouseup', () => { dragState = null; });

  // ── Icon selection ───────────────────────────────
  function selectIcon(el) {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      el.classList.add('selected')
  }
  document.getElementById('desktop').addEventListener('click', e => {
      if (!e.target.closest('.desktop-icon') && !e.target.closest('.win'))
          document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  });

  // ── Start menu ───────────────────────────────────
  function toggleStartMenu(e) {
      e.stopPropagation();
      const sm = document.getElementById('start-menu');
      if (sm.classList.contains('show')) { sm.classList.remove('show'); } else {
          sm.classList.add('show');
          gsap.fromTo(sm, { scaleY: 0, opacity: 0, transformOrigin: 'bottom left' }, { scaleY: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
      }
  }

  function closeStartMenu(e) {
      const sm = document.getElementById('start-menu');
      if (!sm.classList.contains('show')) return;
      if (e && e.target.closest('#start-menu')) return;
      sm.classList.remove('show');
  }

  // ── Real HTML5 video player ───────────────────────
  function getRealVideo() { return document.getElementById('yt-real-video'); }

  function fmtTime(s) {
      s = Math.floor(s || 0);
      const m = Math.floor(s / 60),
          sec = s % 60;
      return `${m}:${String(sec).padStart(2,'0')}`;
  }

  function syncProgressBar() {
      const vid = getRealVideo();
      if (!vid || !vid.duration) return;
      const pct = (vid.currentTime / vid.duration) * 100;
      document.getElementById('yt-played').style.width = pct + '%';
      document.getElementById('yt-pthumb').style.left = pct + '%';
      document.getElementById('yt-timecode').textContent =
          `${fmtTime(vid.currentTime)} / ${fmtTime(vid.duration)}`;
  }

  function loadVideoIntoPlayer(slot) {
      const v = videos[slot];
      stopPlay();
      nowPlayingSlot = slot;

      const vid = getRealVideo();
      const bg = document.getElementById('yt-player-thumb-bg');
      const overlay = document.getElementById('yt-play-overlay');

      // If slot has a real video file, wire it up
      if (v.videoURL) {
          vid.src = v.videoURL;
          vid.style.display = 'block';
          bg.style.display = 'none';
          overlay.style.display = 'none'; // hide big-play; controls are enough
      } else {
          // No video yet — show thumbnail as background
          vid.src = '';
          vid.style.display = 'none';
          bg.style.display = 'block';
          bg.style.backgroundImage = v.thumb ? `url(${v.thumb})` : '';
          bg.style.backgroundColor = v.thumb ? '#000' : '#111';
          overlay.style.display = 'flex';
      }

      // Info panel
      document.getElementById('yt-watch-title').textContent = v.title || 'Untitled Video';
      document.getElementById('yt-watch-views').textContent = (v.views || '0') + ' views';
      document.getElementById('yt-watch-date').textContent = 'Added today';
      document.getElementById('yt-watch-channel').textContent = v.channel || 'Unknown';
      document.getElementById('yt-watch-desc').textContent = v.title ?
          `"${v.title}" uploaded by ${v.channel}. Watch and enjoy!` :
          'No description provided.';
      document.getElementById('yt-watch-cat').textContent = 'Entertainment';
      document.getElementById('yt-breadcrumb').textContent = v.title || 'Untitled';

      // Reset progress bar
      document.getElementById('yt-played').style.width = '0%';
      document.getElementById('yt-pthumb').style.left = '0%';
      document.getElementById('yt-timecode').textContent = `0:00 / ${v.duration || '0:00'}`;
      document.getElementById('yt-playpause').innerHTML = '&#9654;';
      isPlaying = false;

      // Sidebar highlight
      for (let i = 0; i < 3; i++) {
          document.getElementById('sugg-' + i).classList.toggle('yt-sugg-nowplaying', i === slot);
      }

      // Title bar
      if (v.title) document.getElementById('ie-title').textContent =
          `${v.title} - YouTube — Microsoft Internet Explorer`;

      // Wire real-video events (only once, guarded by flag)
      if (!vid._eventsWired) {
          vid._eventsWired = true;

          vid.addEventListener('timeupdate', syncProgressBar);

          vid.addEventListener('play', () => {
              isPlaying = true;
              document.getElementById('yt-playpause').innerHTML = '&#9646;&#9646;';
              document.getElementById('yt-play-overlay').style.display = 'none';
          });

          vid.addEventListener('pause', () => {
              isPlaying = false;
              document.getElementById('yt-playpause').innerHTML = '&#9654;';
          });

          vid.addEventListener('ended', () => {
              isPlaying = false;
              document.getElementById('yt-playpause').innerHTML = '&#9654;';
          });

          // Volume fill sync
          vid.addEventListener('volumechange', () => {
              const fill = document.getElementById('yt-vol-fill');
              if (fill) fill.style.width = (vid.muted ? 0 : vid.volume * 100) + '%';
          });
          vid.volume = 0.8;
      }
  }

  function togglePlay() {
      const vid = getRealVideo();
      if (vid && vid.src) {
          // Real video
          if (vid.paused) vid.play().catch(() => {});
          else vid.pause();
      } else {
          // No video uploaded — do nothing
          if (!videos[nowPlayingSlot].title) return;
      }
  }

  function stopPlay() {
      isPlaying = false;
      const vid = getRealVideo();
      if (vid && !vid.paused) vid.pause();
      if (playTimer) {
          clearInterval(playTimer);
          playTimer = null;
      }
      document.getElementById('yt-playpause').innerHTML = '&#9654;';
  }

  function scrubTo(e) {
      const vid = getRealVideo();
      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      if (vid && vid.src && vid.duration) {
          vid.currentTime = pct * vid.duration;
      } else {
          // Fake scrub fallback
          const durSecs = videos[nowPlayingSlot].durationSecs || 120;
          document.getElementById('yt-played').style.width = (pct * 100) + '%';
          document.getElementById('yt-pthumb').style.left = (pct * 100) + '%';
          document.getElementById('yt-timecode').textContent =
              `${fmtTime(Math.floor(pct*durSecs))} / ${videos[nowPlayingSlot].duration}`;
      }
  }

  function scrubVol(e) {
      const vid = getRealVideo();
      if (!vid) return;
      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      vid.volume = pct;
      vid.muted = false;
      const fill = document.getElementById('yt-vol-fill');
      if (fill) fill.style.width = (pct * 100) + '%';
  }

  function setRating(n) {
      document.querySelectorAll('.yt-star').forEach((s, i) => {
          if (i < n) s.classList.add('lit');
          else s.classList.remove('lit');
      });
  }

  // ── Sidebar click: load preloaded video ──────────────────────────
  function handleSuggClick(slot) {
      loadVideoIntoPlayer(slot);
  }

  // Upload modal removed — videos are preloaded

  function parseDurationToSecs(str) {
      const p = str.split(':');
      if (p.length === 2) return parseInt(p[0]) * 60 + parseInt(p[1]);
      if (p.length === 3) return parseInt(p[0]) * 3600 + parseInt(p[1]) * 60 + parseInt(p[2]);
      return 120;
  }


  gsap.registerPlugin(ScrollTrigger);

  // ========== VINTAGE RECEIPT ITEMS (poetic & romantic) ==========
  const receiptLines = [
      { text: "✦✦✦ JUSA GENERAL STORE ✦✦✦", style: "bold center", price: "" },
      { text: "Date: " + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), style: "light", price: "" },
      { text: "------------------------------------------------", style: "dashed", price: "" },
      { text: "ITEM", style: "left", price: "PRICE" },
      { text: "------------------------------------------------", style: "dashed", price: "" },
      { text: "KitKat", price: "Rs.20" },
      { text: "Coca-Cola", price: "Rs.30" },
      { text: "Parle-G Biscuit", price: "Rs.5" },
      { text: "Maggi 2-Minute Noodles", price: "Rs.10" },
      { text: "Cinema Ticket", price: "Rs.80" },
      { text: "Music CD", price: "Rs.150" },
      //   { text: "Playlists made for two hearts", price: "🎵✨" },
      //   { text: "Courage to say 'I love you'", price: "bravery" },
      //   { text: "Secret codes & matching stars", price: "forever" },
      //   { text: "Hugs that mend broken days", price: "warmth" },
      //   { text: "------------------------------------------------", style: "dashed", price: "" },
      //   { text: "SUB TOTAL (emotions)", price: "ENDLESS" },
      //   { text: "DISCOUNT? none, love is heavy", price: "-" },
      //   { text: "TAX: butterflies & goosebumps", price: "+" },
      //   { text: "------------------------------------------------", style: "dashed", price: "" },
      //   { text: "TOTAL LOVE BILL", style: "bold center", price: "ETERNITY" },
      //   { text: "Thank you for choosing each other.", style: "italic center", price: "" },
      //   { text: "💌 keep this receipt forever 💌", style: "center", price: "" },
      //   { text: "——— JuSa Billing Machine ———", style: "center", price: "" }
  ];

  // store reference
  const receiptContainer = document.getElementById('receiptPaper');
  let currentPrintedCount = 0;
  let totalLines = receiptLines.length;

  // Helper: format a single line according to item
  function formatLine(item, idx) {
      if (item.style === "bold center") {
          return `<div class="receipt-line" style="font-weight: bold; text-align: center; margin: 6px 0;">${item.text}</div>`;
      }
      if (item.style === "italic center") {
          return `<div class="receipt-line" style="font-style: italic; text-align: center; margin: 5px 0;">${item.text}</div>`;
      }
      if (item.style === "center") {
          return `<div class="receipt-line" style="text-align: center;">${item.text}</div>`;
      }
      if (item.style === "dashed") {
          return `<div class="receipt-line" style="text-align: center; letter-spacing: 1px;">${item.text}</div>`;
      }
      if (item.style === "left" && item.price !== undefined) {
          return `<div class="receipt-line" style="display: flex; justify-content: space-between;"><span>${item.text}</span><span>${item.price}</span></div>`;
      }
      // default (item with price and text)
      if (item.price !== undefined && item.price !== "") {
          return `<div class="receipt-line" style="display: flex; justify-content: space-between;"><span>${item.text}</span><span>${item.price}</span></div>`;
      }
      return `<div class="receipt-line">${item.text}</div>`;
  }

  // function to render receipt up to a certain index (0-based, inclusive)
  function renderReceiptUpTo(maxIndex) {
      if (maxIndex < 0) maxIndex = -1;
      let html = '';
      for (let i = 0; i <= maxIndex; i++) {
          if (i < receiptLines.length) {
              html += formatLine(receiptLines[i], i);
          }
      }
      // add blinking cursor after last line
      receiptContainer.innerHTML = html;
      // re-attach cursor effect visual (we have a separate cursor outside but also inside to simulate type)
      if (maxIndex >= 0 && maxIndex < totalLines - 1) {
          // show ongoing printing effect
          const cursorSpan = document.createElement('span');
          cursorSpan.className = 'cursor-blink';
          cursorSpan.style.marginLeft = '6px';
          // don't mess up, just ensure the last line feels active
      }
      // if receipt is fully printed, hide outer cursor or keep but not needed
      const outerCursor = document.getElementById('blinkCursor');
      if (maxIndex >= totalLines - 1) {
          if (outerCursor) outerCursor.style.opacity = '0.3';
      } else {
          if (outerCursor) outerCursor.style.opacity = '1';
      }
  }

  // GSAP ScrollTrigger for "printing as you scroll"
  let printedProgress = 0;

  // get the billing machine section as trigger
  const machineSection = document.querySelector('.billing-machine');

  // Create ScrollTrigger that maps scroll progress to receipt lines
  ScrollTrigger.create({
      trigger: machineSection,
      start: "top 85%", // when the machine enters view
      end: "bottom 20%", // when it almost leaves
      scrub: 1.2, // smooth progress with scroll
      onUpdate: (self) => {
          // self.progress goes from 0 to 1 as we scroll through the trigger range
          let progress = self.progress;
          // map progress to number of lines (0 to totalLines - 1)
          let linesToShow = Math.floor(progress * (totalLines - 1));
          // clamp
          linesToShow = Math.min(totalLines - 1, Math.max(0, linesToShow));
          if (linesToShow !== currentPrintedCount) {
              currentPrintedCount = linesToShow;
              renderReceiptUpTo(currentPrintedCount);
              // add subtle "cha-ching" visual feedback (optional bell effect)
              if (linesToShow > 0 && linesToShow % 3 === 0 && document.getElementById('dingBtn')) {
                  // just a playful flash
                  const bell = document.getElementById('dingBtn');
                  bell.style.transform = 'scale(1.1)';
                  setTimeout(() => { bell.style.transform = 'scale(1)'; }, 150);
              }
          }
      },
      onEnter: () => {
          // when starting to scroll, ensure first line appears
          if (currentPrintedCount === 0) {
              renderReceiptUpTo(0);
              currentPrintedCount = 0;
          }
      },
      onLeaveBack: () => {
          // when scrolling back up, reduce receipt lines (makes sense for vintage machine)
          // but we respect reverse: we update anyway via onUpdate, so it's automatic
      }
  });

  // ensure initial state: no line printed (just hint)
  renderReceiptUpTo(-1); // shows only placeholder message? Actually we show only the default message
  // But we overwrote: we need to keep a "waiting" message before scroll begins
  // let's modify: initially display "scroll to start printing"
  receiptContainer.innerHTML = `<div style="text-align: center; opacity: 0.7;">📠 scroll down to print receipt 📠</div>
    <div style="text-align: center; font-size:0.7rem;">↓ vintage paper roll ready ↓</div>`;
  currentPrintedCount = -1; // nothing printed yet

  // Override the scrolltrigger initial to avoid glitch, but we keep the render function bound.
  // However we need to adjust the onUpdate to start from -1 state.
  // Rebuild ScrollTrigger to handle initial state better.
  // Refresh ScrollTrigger after DOM ready.
  let scrubbingTrigger;

  function initReceiptPrinter() {
      if (scrubbingTrigger) scrubbingTrigger.kill();
      scrubbingTrigger = ScrollTrigger.create({
          trigger: machineSection,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1.2,
          onUpdate: (self) => {
              let progress = self.progress;
              let linesToShow = Math.floor(progress * totalLines);
              if (linesToShow > totalLines) linesToShow = totalLines;
              if (linesToShow < 0) linesToShow = -1;
              if (linesToShow !== currentPrintedCount) {
                  currentPrintedCount = linesToShow;
                  if (currentPrintedCount === -1) {
                      receiptContainer.innerHTML = `<div style="text-align: center; opacity: 0.7;">📠 scroll down to print receipt 📠</div>
                        <div style="text-align: center; font-size:0.7rem;">↓ vintage paper roll ready ↓</div>`;
                  } else if (currentPrintedCount === 0) {
                      // show just first line? but that might be store header. Show placeholder maybe? We'll show first line item
                      renderReceiptUpTo(0);
                  } else {
                      renderReceiptUpTo(currentPrintedCount - 1);
                  }
              }
          },
          onEnter: () => {
              if (currentPrintedCount === -1) {
                  currentPrintedCount = 0;
                  renderReceiptUpTo(0);
              }
          }
      });
  }

  // small helper for manual print button (for fun)
  const printButton = document.getElementById('printBtn');
  if (printButton) {
      printButton.addEventListener('click', () => {
          // manually force full receipt print (simulate scroll end)
          window.scrollTo({
              top: machineSection.offsetTop + machineSection.offsetHeight - 100,
              behavior: 'smooth'
          });
          setTimeout(() => {
              renderReceiptUpTo(totalLines - 1);
              currentPrintedCount = totalLines - 1;
          }, 500);
      });
  }

  // Bell / ding effect + mechanical vibe
  const dingSound = () => {
      // create a subtle beep using web audio? Not to require user interaction, but since click on button we can.
      // Actually we add a fun beep using AudioContext but use simple approach
      try {
          const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.frequency.value = 880;
          gainNode.gain.value = 0.2;
          oscillator.type = 'sine';
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
          oscillator.stop(audioCtx.currentTime + 0.4);
          audioCtx.resume();
      } catch (e) { console.log("audio ding not supported"); }
  };

  const dingBtn = document.getElementById('dingBtn');
  if (dingBtn) {
      dingBtn.addEventListener('click', () => {
          dingSound();
          // also add a little paper animation
          const wrap = document.querySelector('.receipt-wrapper');
          wrap.style.transform = 'translateY(-2px)';
          setTimeout(() => wrap.style.transform = '', 150);
      });
  }

  // reinitialize after fonts / layout
  window.addEventListener('load', () => {
      initReceiptPrinter();
      // refresh ScrollTrigger to avoid misalignments
      ScrollTrigger.refresh();
  });

  // also listen to resize to refresh
  window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
  });

  // Optional: Add a typewriter effect when new lines appear, via css already.
  // Extra animation: simulate paper feeding when scroll updates lines
  const paperWrapper = document.querySelector('.receipt-wrapper');
  const observer = new MutationObserver(() => {
      if (paperWrapper) {
          paperWrapper.style.transform = 'scale(0.99)';
          setTimeout(() => paperWrapper.style.transform = '', 120);
      }
  });
  observer.observe(receiptContainer, { childList: true, subtree: true });

  // additional vintage touch: show total love amount when receipt fully printed
  // lazy but fine.
  console.log("vintage billing machine ready, scroll to print love receipt ♥");


  document.addEventListener("DOMContentLoaded", () => {
      // 1. Register the plugin
      gsap.registerPlugin(ScrollTrigger);

      // 2. Set initial states — moon slides in from the left, constellation fades in
      gsap.set(".moon", { x: "-110vw", opacity: 0 });
      gsap.set(".constellation", { scale: 0.5, opacity: 0 });

      // 3. Moon Trigger Logic — slides horizontally into the sticky visual panel
      ScrollTrigger.create({
          trigger: "#trigger-moon",
          start: "top center",

          // Scrolling DOWN into the moon section — slide in from left
          onEnter: () => {
              gsap.to(".moon", {
                  x: 0,
                  opacity: 1,
                  duration: 1.4,
                  ease: "power3.out"
              });
          },

          // Scrolling UP back into moon section from stars — bring moon back
          onEnterBack: () => {
              gsap.to(".constellation", { opacity: 0, scale: 0.5, duration: 0.8 });
              gsap.to(".moon", { x: 0, opacity: 1, duration: 1.4, ease: "power3.out" });
          },

          // Scrolling UP past the moon section entirely — send moon back off-screen left
          onLeaveBack: () => {
              gsap.to(".moon", { x: "-110vw", opacity: 0, duration: 0.9, ease: "power2.in" });
          }
      });

      // 4. Stars / Constellation Trigger Logic
      ScrollTrigger.create({
          trigger: "#trigger-stars",
          start: "top center",

          onEnter: () => {
              // Send moon back off-screen to the left
              gsap.to(".moon", { x: "-110vw", opacity: 0, duration: 1.0, ease: "power2.in" });
              // Constellation fades + scales in after moon clears
              gsap.to(".constellation", {
                  opacity: 1,
                  scale: 1,
                  duration: 1.5,
                  ease: "power3.out",
                  delay: 0.35
              });
          }
      });
  });

  // ── MUSIC SECTION: CD slide-in + tracklist fade-in ───────────────────────────
  (function() {
      function initMusicAnimations() {
          gsap.registerPlugin(ScrollTrigger);

          const cdEl = document.querySelector('.cd');
          const cdCase = document.querySelector('.cd-case');
          const trackItems = document.querySelectorAll('.tracklist li');
          const musicSec = document.querySelector('.music-sec');

          if (!musicSec) return;

          // ── CD case: slide in from the left ──
          // CSS sets the initial off-screen position via transform
          // GSAP overrides it cleanly
          if (cdCase) {
              gsap.set(cdCase, { x: '-140vw', opacity: 0 });
              ScrollTrigger.create({
                  trigger: musicSec,
                  start: 'top 70%',
                  onEnter: () => {
                      gsap.to(cdCase, {
                          x: 0,
                          opacity: 1,
                          duration: 1.1,
                          ease: 'power3.out'
                      });
                  },
                  onLeaveBack: () => {
                      gsap.to(cdCase, {
                          x: '-140vw',
                          opacity: 0,
                          duration: 0.6,
                          ease: 'power2.in'
                      });
                  }
              });
          }

          if (cdEl) {
              gsap.set(cdEl, { x: '-200vw', opacity: 0 });
              ScrollTrigger.create({
                  trigger: musicSec,
                  start: 'top 70%',
                  onEnter: () => {
                      gsap.to(cdEl, {
                          x: 0,
                          opacity: 1,
                          duration: 1.2,
                          ease: 'power3.out',
                          delay: 0.1
                      });
                  },
                  onLeaveBack: () => {
                      gsap.to(cdEl, {
                          x: '-200vw',
                          opacity: 0,
                          duration: 0.6,
                          ease: 'power2.in'
                      });
                  }
              });
          }
          // ── Decorative images: slide in from their respective sides ──
          // tl-img slides in from the right (it lives top-right)
          // starimg, sunflower, cloud slide in from the right (bottom-right cluster)
          const decoRight = document.querySelectorAll('.tl-img, .starimg, .sunflower, .cloud');
          if (decoRight.length > 0) {
              gsap.set(decoRight, { x: '120vw', opacity: 0 });
              ScrollTrigger.create({
                  trigger: musicSec,
                  start: 'top 70%',
                  onEnter: () => {
                      gsap.to(decoRight, {
                          x: 0,
                          opacity: 1,
                          duration: 1.0,
                          stagger: 0.12,
                          ease: 'power3.out',
                          delay: 0.2
                      });
                  },
                  onLeaveBack: () => {
                      gsap.to(decoRight, {
                          x: '120vw',
                          opacity: 0,
                          duration: 0.5,
                          stagger: 0.06,
                          ease: 'power2.in'
                      });
                  }
              });
          }

          // ── Tracklist: staggered fade-in per item ──
          if (trackItems.length > 0) {
              // Reset initial state
              gsap.set(trackItems, { opacity: 0, y: 14 });

              ScrollTrigger.create({
                  trigger: document.querySelector('.music-list'),
                  start: 'top 75%',
                  onEnter: () => {
                      gsap.to(trackItems, {
                          opacity: 1,
                          y: 0,
                          duration: 0.55,
                          stagger: 0.14,
                          ease: 'power2.out',
                          delay: 0.4 // wait for CD to mostly arrive first
                      });
                  },
                  onLeaveBack: () => {
                      gsap.to(trackItems, {
                          opacity: 0,
                          y: 14,
                          duration: 0.3,
                          stagger: 0.06,
                          ease: 'power2.in'
                      });
                  }
              });
          }
      }

      // Run after DOM + GSAP are ready
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initMusicAnimations);
      } else {
          initMusicAnimations();
      }
  })();