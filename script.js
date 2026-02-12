// ===============================
// CONFIGURATION
// ===============================
// ===============================
// CONFIGURATION (Fixed to allow updates)
// ===============================
let herName = "My Love ❤️"; // Changed from const to let
let galleryPhotos = [
  // Changed from const to let
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
];

function loadFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("data");

  if (encodedData) {
    try {
      const decodedData = JSON.parse(
        decodeURIComponent(escape(atob(encodedData))),
      );
      herName = decodedData.n || "My Love ❤️";
      galleryPhotos = decodedData.p || [];

      console.log("✓ Data injected into global variables");
    } catch (e) {
      console.error("Link decoding failed:", e);
    }
  }
}
loadFromUrl(); // Must run before elements are touched

const heartfeltLetter = `My dearest ${herName},

There's something about you that I can't fully explain… and maybe I never will.

You call yourself weird sometimes, but to me, that's one of the most perfect things about you. Every little thing that makes you different is exactly what makes you unforgettable.

You don't even realize how special you are. The way you smile, the way you exist, the way you make my world feel lighter just by being in it… it's magic.

You're perfect, even in the moments you doubt yourself. Especially in those moments.

You've become someone my heart feels safe with. Someone I think about without trying. Someone I never want to lose.

I don't need perfect.

I just need you.

Even your weirdest moments are my favorite.

And if you'll let me, I want to spend my life reminding you how loved you truly are.

Forever yours ❤️`;

const surrenderThreshold = 8;

// Photo gallery images - add your image filenames here

// ===============================
// ELEMENTS (SAFE LOAD)
// ===============================

const envelope = document.getElementById("envelope");
const container = document.querySelector(".container");
const nameElement = document.getElementById("name");
const textElement = document.getElementById("text");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const music = document.getElementById("music");

if (nameElement) {
  nameElement.textContent = herName;
}

// ===============================
// PERSISTENT MUSIC SYSTEM
// ===============================

let musicStarted = false;
let musicElement = null;

function startMusicWithFade() {
  if (musicStarted) return;

  musicStarted = true;

  // Create or get the music element
  musicElement = document.getElementById("music");

  if (!musicElement) {
    musicElement = document.createElement("audio");
    musicElement.src = "Photograph.mp3";
    musicElement.id = "music";
    document.body.appendChild(musicElement);
  }

  musicElement.loop = true;
  musicElement.volume = 0;

  const playPromise = musicElement.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }

  let volume = 0;
  const target = 0.7;

  const fade = setInterval(() => {
    volume += 0.02;

    if (volume >= target) {
      musicElement.volume = target;
      clearInterval(fade);
    } else {
      musicElement.volume = volume;
    }
  }, 200);
}

// Keep music playing across screen changes
function preserveMusic() {
  if (musicElement && !document.body.contains(musicElement)) {
    document.body.appendChild(musicElement);
  }
}
// Change the interaction listeners to this:
if (document.getElementById("envelope")) {
    // Only listen for clicks to start music if the envelope is present
    document.addEventListener("click", startMusicWithFade, { once: true });
    document.addEventListener("touchstart", startMusicWithFade, { once: true });
}

// ===============================
// TYPEWRITER
// ===============================

function typeWriter(element, text, speed = 35, callback = null) {
  if (!element) return;

  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      if (text[i] === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text[i];
      }

      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }

  type();
}

// ===============================
// ENVELOPE OPEN WITH ANIMATION
// ===============================

if (envelope) {
  envelope.addEventListener("click", () => {
    // START MUSIC HERE (Only when the envelope is clicked)
    startMusicWithFade(); 

    envelope.classList.add("open");

    setTimeout(() => {
      if (container) {
        container.classList.add("letter-out");
      }
      setTimeout(() => {
        typeWriter(textElement, "Will you be my Valentine? ❤️");
      }, 800);
    }, 600);

    floatingHearts();
  });
}
// ===============================
// FLOATING HEARTS
// ===============================

function floatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = "20px";
    heart.style.animation = "floatUp 4s linear";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

// ===============================
// NO BUTTON ESCAPE
// ===============================

let noClicks = 0;

const noTexts = [
  "No 😢",
  "Are you sure? 🥺",
  "Please reconsider 💔",
  "You'll break my heart 💘",
  "I promise to love you forever ❤️",
  "Just press YES 💕",
  "You belong with me 💖",
];

function moveNoButton() {
  const letter = document.querySelector(".letter");

  if (!letter || !noBtn) return;

  const rect = letter.getBoundingClientRect();

  const maxX = rect.width - noBtn.offsetWidth - 20;
  const maxY = rect.height - noBtn.offsetHeight - 20;

  const x = Math.max(10, Math.random() * maxX);
  const y = Math.max(10, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

if (noBtn) {
  noBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    noClicks++;

    noBtn.textContent = noTexts[noClicks % noTexts.length];

    moveNoButton();

    if (yesBtn) {
      yesBtn.style.transform = `scale(${1 + noClicks * 0.15})`;
    }

    if (noClicks >= surrenderThreshold) {
      noBtn.style.display = "none";

      if (yesBtn) {
        yesBtn.style.transform = "scale(2)";
        yesBtn.style.animation = "pulse 1s infinite";
      }
    }
  });
}

// ===============================
// YES BUTTON FLOW
// ===============================

if (yesBtn) {
  yesBtn.addEventListener("click", showYesPopup);
}

// ===============================
// YES POPUP WITH GIF
// ===============================

function showYesPopup() {
  preserveMusic();

  document.body.innerHTML = "";
  document.body.appendChild(musicElement);

  const popup = document.createElement("div");

  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #000000 0%, #1a0a0a 100%);
    text-align: center;
  `;

  popup.innerHTML = `
    <div style="font-size:48px;color:#ff1744;margin-bottom:20px;animation:pulseText 1.5s infinite;">
  ${herName} said YESSSS!! ❤️
</div>
    </div>
    <div id="gifContainer" style="width:340px;max-width:90%;height:340px;display:flex;align-items:center;justify-content:center;margin:20px 0;">
      <div style="font-size:100px;animation:pulseHeart 0.8s infinite;">💕</div>
    </div>
    <div style="font-size:30px;color:#ff4d6d;margin-top:10px;">
      I love you so much ❤️
    </div>
  `;

  document.body.appendChild(popup);

  // Try to load the GIF
  const img = new Image();
  img.onload = function () {
    console.log("✓ GIF loaded successfully!");
    const container = document.getElementById("gifContainer");
    container.innerHTML = "";
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      box-shadow: 0 0 40px rgba(255,105,180,0.6);
    `;
    container.appendChild(img);
  };

  img.onerror = function () {
    console.error("✗ GIF failed to load");
    console.log("Looking for: yes.gif");
    console.log("In folder:", window.location.href);
    console.log("Showing animated hearts instead...");
    // Hearts already showing as fallback
  };

  img.src = "Happy Premier League GIF by Play Sports.gif";

  // Add pulse animation for hearts
  const heartStyle = document.createElement("style");
  heartStyle.innerHTML = `
    @keyframes pulseHeart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
  `;
  document.head.appendChild(heartStyle);

  confetti();

  setTimeout(showPhotoGallery, 4000);
}

// ===============================
// PHOTO GALLERY SCREEN
// ===============================

// ===============================
// PHOTO GALLERY SCREEN - INTERACTIVE POLAROIDS
// ===============================

function showPhotoGallery() {
  preserveMusic();

  document.body.innerHTML = "";
  document.body.appendChild(musicElement);

  // Warmer, more attractive background palette
  document.body.style.background =
    "radial-gradient(circle, #fff5f7 0%, #fde2e4 100%)";
  document.body.style.overflow = "hidden";

  const galleryContainer = document.createElement("div");
  galleryContainer.style.cssText = `
    position: relative;
    width: 100vw;
    height: 100vh;
    perspective: 1000px;
  `;
  document.body.appendChild(galleryContainer);

  // Overlay for when a photo is focused
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.4); opacity: 0; pointer-events: none;
    transition: opacity 0.5s; z-index: 100;
  `;
  document.body.appendChild(overlay);

  let currentlyFocused = null;

  galleryPhotos.forEach((photoSrc, index) => {
    const polaroid = document.createElement("div");

    // Random scattered positions
    const randomRotation = Math.floor(Math.random() * 30) - 15;
    const randomX = Math.floor(Math.random() * 60) + 15; // 15% to 75%
    const randomY = Math.floor(Math.random() * 40) + 15; // 15% to 55%

    polaroid.style.cssText = `
      position: absolute;
      left: ${randomX}vw;
      top: ${randomY}vh;
      width: 180px;
      padding: 10px 10px 35px 10px;
      background: #fff;
      box-shadow: 0 8px 15px rgba(0,0,0,0.1);
      transform: translate(-50%, -50%) rotate(${randomRotation}deg) scale(0);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: zoom-in;
      z-index: ${index + 1};
      border: 1px solid rgba(0,0,0,0.05);
    `;

    polaroid.innerHTML = `
    <div style="width: 100%; height: 160px; background: #eee; overflow: hidden; border-radius: 4px;">
      <img src="${photoSrc}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="font-family: 'Dancing Script', cursive; text-align: center; margin-top: 10px; color: #555; font-size: 14px;">Forever ❤️</div>
  `;

    galleryContainer.appendChild(polaroid);

    // Entrance Animation
    setTimeout(() => {
      polaroid.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg) scale(1)`;
    }, index * 250);

    // CLICK TO FOCUS LOGIC
    polaroid.addEventListener("click", (e) => {
      if (currentlyFocused === polaroid) {
        // Unfocus
        polaroid.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg) scale(1)`;
        polaroid.style.zIndex = index + 1;
        overlay.style.opacity = "0";
        currentlyFocused = null;
      } else {
        // Reset previous
        if (currentlyFocused) currentlyFocused.click();

        // Focus this one
        polaroid.style.zIndex = "200";
        polaroid.style.transform = `translate(-50%, -50%) scale(2.2) rotate(0deg)`;
        polaroid.style.left = "50vw";
        polaroid.style.top = "45vh";
        overlay.style.opacity = "1";
        currentlyFocused = polaroid;
      }
    });
  });

  // Header Text
  const header = document.createElement("div");
  header.style.cssText = `
    position: absolute; top: 30px; width: 100%; text-align: center;
    color: #ff4d6d; font-size: 24px; font-weight: bold; letter-spacing: 1px;
    pointer-events: none; text-shadow: 0 1px 2px rgba(0,0,0,0.05);
  `;
  header.textContent = "Moments I Cherish";
  galleryContainer.appendChild(header);

  // Bottom Button
  const btnContainer = document.createElement("div");
  btnContainer.style.cssText = `
    position: absolute; bottom: 50px; width: 100%; display: flex;
    justify-content: center; z-index: 300;
  `;

  const continueBtn = document.createElement("button");
  continueBtn.style.cssText = `
    padding: 14px 35px; background: #ff4d6d; color: white;
    border: none; border-radius: 30px; font-size: 18px;
    cursor: pointer; box-shadow: 0 10px 20px rgba(255, 77, 109, 0.3);
    transition: transform 0.2s;
  `;
  continueBtn.innerHTML = "Continue to your letter 💌";
  continueBtn.onmouseover = () => (continueBtn.style.transform = "scale(1.05)");
  continueBtn.onmouseout = () => (continueBtn.style.transform = "scale(1)");

  btnContainer.appendChild(continueBtn);
  galleryContainer.appendChild(btnContainer);

  continueBtn.addEventListener("click", showLetterIcon);
}

// ===============================
// LETTER ICON SCREEN
// ===============================

function showLetterIcon() {
  preserveMusic();

  document.body.innerHTML = "";
  document.body.appendChild(musicElement);

  const overlay = document.createElement("div");

  overlay.style.cssText = `
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
  `;

  overlay.innerHTML = `
    <button id="openLetterBtn"
    style="background:none;border:none;color:white;cursor:pointer;text-align:center;">

      <div style="font-size:100px;animation:floatIcon 2s infinite;">💌</div>

      <div style="font-size:26px;color:#ff4d6d;">
        Tap to open your letter
      </div>

    </button>
  `;

  document.body.appendChild(overlay);

  document
    .getElementById("openLetterBtn")
    .addEventListener("click", showHeartLetter);
}

// ===============================
// FINAL LETTER SCREEN
// ===============================

function showHeartLetter() {
  preserveMusic();

  document.body.innerHTML = "";
  document.body.appendChild(musicElement);
  document.body.style.background = "#fff0f5";
  document.body.style.overflowY = "auto";

  const box = document.createElement("div");

  box.style.cssText = `
    max-width: 700px;
    margin: 60px auto;
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(255,105,180,0.5);
    white-space: pre-wrap;
    line-height: 1.8;
    font-size: 20px;
  `;

  document.body.appendChild(box);

  typeWriter(box, heartfeltLetter);
}

// ===============================
// CONFETTI
// ===============================

function confetti() {
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const c = document.createElement("div");

      c.innerHTML = "💖";

      c.style.position = "fixed";
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = "-20px";
      c.style.fontSize = "24px";
      c.style.animation = "fall 5s linear";
      c.style.zIndex = "9999";

      document.body.appendChild(c);

      setTimeout(() => c.remove(), 5000);
    }, i * 30);
  }
}

// ===============================
// ANIMATIONS
// ===============================

const style = document.createElement("style");

style.innerHTML = `
  @keyframes floatUp {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100vh); opacity: 0; }
  }

  @keyframes fall {
    from { transform: translateY(-20px); }
    to { transform: translateY(100vh); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  @keyframes pulseText {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes floatIcon {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
`;

document.head.appendChild(style);

// ===============================
// SETUP PAGE - VALENTINE MESSAGE
// ===============================

(function () {
  "use strict";

  // ===============================
  // ELEMENTS
  // ===============================

  const setupForm = document.getElementById("setupForm");
  const valentineNameInput = document.getElementById("valentineName");
  const uploadZone = document.getElementById("uploadZone");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const photoCount = document.getElementById("photoCount");
  const generateButton = document.getElementById("generateButton");
  const linkSection = document.getElementById("linkSection");
  const generatedLink = document.getElementById("generatedLink");
  const copyButton = document.getElementById("copyButton");
  const shareWhatsApp = document.getElementById("shareWhatsApp");
  const shareEmail = document.getElementById("shareEmail");
  const shareSMS = document.getElementById("shareSMS");
  const createAnother = document.getElementById("createAnother");

  // ===============================
  // STATE
  // ===============================

  let uploadedPhotos = [];
  const MAX_PHOTOS = 10;

  // ===============================
  // CHECK IF ALL ELEMENTS EXIST
  // ===============================

  if (!setupForm || !valentineNameInput || !uploadZone || !photoInput) {
    console.error("❌ Missing required elements! Check your HTML IDs.");
    return;
  }

  console.log("✅ All elements found!");

  // ===============================
  // UPLOAD ZONE CLICK
  // ===============================

  uploadZone.addEventListener("click", () => {
    photoInput.click();
  });

  // ===============================
  // FILE INPUT CHANGE
  // ===============================

  photoInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  // ===============================
  // DRAG AND DROP
  // ===============================

  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("dragover");
  });

  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  // ===============================
  // HANDLE FILE UPLOADS
  // ===============================

  function handleFiles(files) {
    if (uploadedPhotos.length >= MAX_PHOTOS) {
      alert(`Maximum ${MAX_PHOTOS} photos allowed!`);
      return;
    }

    const remainingSlots = MAX_PHOTOS - uploadedPhotos.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file!`);
        continue;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large! Please use images under 5MB.`);
        continue;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const photoData = {
          id: Date.now() + Math.random(),
          data: e.target.result,
          name: file.name,
        };

        uploadedPhotos.push(photoData);
        addPhotoPreview(photoData);
        updatePhotoCount();
      };

      reader.onerror = () => {
        alert(`Failed to read ${file.name}`);
      };

      reader.readAsDataURL(file);
    }

    // Reset input
    photoInput.value = "";
  }

  // ===============================
  // ADD PHOTO PREVIEW
  // ===============================

  function addPhotoPreview(photo) {
    const previewItem = document.createElement("div");
    previewItem.className = "photo-preview-item";
    previewItem.dataset.id = photo.id;

    previewItem.innerHTML = `
            <img src="${photo.data}" alt="${photo.name}">
            <button class="remove-photo" data-photo-id="${photo.id}" title="Remove photo">×</button>
        `;

    // Add click handler for remove button
    const removeBtn = previewItem.querySelector(".remove-photo");
    removeBtn.addEventListener("click", () => {
      removePhoto(photo.id);
    });

    photoPreview.appendChild(previewItem);
  }

  // ===============================
  // REMOVE PHOTO
  // ===============================

  function removePhoto(id) {
    uploadedPhotos = uploadedPhotos.filter((p) => p.id !== id);
    const previewItem = document.querySelector(`[data-id="${id}"]`);
    if (previewItem) {
      previewItem.style.animation = "photoDisappear 0.3s ease";
      setTimeout(() => {
        previewItem.remove();
      }, 300);
    }
    updatePhotoCount();
  }

  // ===============================
  // UPDATE PHOTO COUNT
  // ===============================

  function updatePhotoCount() {
    if (!photoCount) return;

    if (uploadedPhotos.length === 0) {
      photoCount.textContent = "No photos uploaded";
      photoCount.style.color = "#999";
    } else if (uploadedPhotos.length === 1) {
      photoCount.textContent = "1 photo uploaded ✓";
      photoCount.style.color = "#4CAF50";
    } else {
      photoCount.textContent = `${uploadedPhotos.length} photos uploaded ✓`;
      photoCount.style.color = "#4CAF50";
    }
  }

  // ===============================
  // FORM SUBMISSION
  // ===============================

  setupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = valentineNameInput.value.trim();

    if (!name) {
      alert("Please enter your valentine's name!");
      valentineNameInput.focus();
      return;
    }

    if (name.length < 2) {
      alert("Name must be at least 2 characters long!");
      valentineNameInput.focus();
      return;
    }

    generateLink(name);
  });

  // ===============================
  // GENERATE SHAREABLE LINK
  // ===============================

  async function generateLink(name) {
    // Your actual API key integrated here
    const IMGBB_API_KEY = "d403a95a40915e30e4bbfb960b731caa";
    const generateButton = document.getElementById("generateButton");
    const linkSection = document.getElementById("linkSection");
    const generatedLink = document.getElementById("generatedLink");

    generateButton.disabled = true;
    generateButton.innerHTML = "<span>⏳</span> Uploading...";

    try {
      const photoUrls = [];

      // 1. Upload each photo to ImgBB
      for (let i = 0; i < uploadedPhotos.length; i++) {
        // Remove the "data:image/jpeg;base64," part
        const base64Data = uploadedPhotos[i].data.split(",")[1];

        const formData = new FormData();
        formData.append("image", base64Data);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await response.json();
        if (result.success) {
          photoUrls.push(result.data.url); // Direct web link
        }
      }

      // 2. Package the name and photo links
      const payload = {
        n: name,
        p: photoUrls,
      };

      // 3. Convert to a safe URL string
      const jsonString = JSON.stringify(payload);
      const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

      // 4. Create the final Vercel-ready link
      const baseUrl = window.location.origin + "/valentine.html";
      const finalLink = `${baseUrl}?data=${base64Data}`;

      // Save to the global window object so Share/Copy buttons can see it
      window.currentShareLink = finalLink;

      generatedLink.value = finalLink;
      linkSection.style.display = "block";
      generateButton.innerHTML = "<span>✅</span> Link Ready!";
      generateButton.disabled = false;
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong with the upload. Please try again!");
      generateButton.disabled = false;
      generateButton.innerHTML = "Generate Link";
    }
    if (copyButton) {
      copyButton.addEventListener("click", () => {
        const textToCopy = generatedLink.value;

        // Try the modern way first
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showCopySuccess();
            })
            .catch(() => {
              fallbackCopy(textToCopy);
            });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    }

    function fallbackCopy(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showCopySuccess();
      } catch (err) {
        alert("Please long-press the link to copy it manually! ❤️");
      }
      document.body.removeChild(textArea);
    }

    function showCopySuccess() {
      copyButton.innerHTML = "✅ Copied!";
      copyButton.style.background = "#4CAF50";
      setTimeout(() => {
        copyButton.innerHTML = "<span>📋</span> Copy Link";
        copyButton.style.background = ""; // Returns to original CSS
      }, 2000);
    }
  }
  // ===============================
  // SHARE BUTTONS
  // ===============================

  if (shareWhatsApp) {
    shareWhatsApp.addEventListener("click", () => {
      if (!window.currentShareLink) {
        alert("Please generate a link first!");
        return;
      }
      const message = `💕 I made something special for you! Open this link: ${window.currentShareLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  if (shareEmail) {
    shareEmail.addEventListener("click", () => {
      if (!window.currentShareLink) {
        alert("Please generate a link first!");
        return;
      }
      const subject = `A Special Valentine Message for You 💕`;
      const body = `Hi!\n\nI made something special just for you! Click this link to see it:\n\n${window.currentShareLink}\n\nWith love ❤️`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }

  if (shareSMS) {
    shareSMS.addEventListener("click", () => {
      if (!window.currentShareLink) {
        alert("Please generate a link first!");
        return;
      }
      const message = `💕 I made something special for you! Open this: ${window.currentShareLink}`;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const smsUrl = isIOS
        ? `sms:&body=${encodeURIComponent(message)}`
        : `sms:?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl;
    });
  }

  // ===============================
  // CREATE ANOTHER
  // ===============================

  if (createAnother) {
    createAnother.addEventListener("click", () => {
      if (uploadedPhotos.length > 0 || valentineNameInput.value.trim()) {
        if (!confirm("Are you sure? This will clear your current message.")) {
          return;
        }
      }

      setupForm.reset();
      uploadedPhotos = [];
      photoPreview.innerHTML = "";
      updatePhotoCount();
      linkSection.style.display = "none";
      generatedLink.value = "";

      window.currentShareLink = null;
      window.currentShareName = null;

      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        valentineNameInput.focus();
      }, 500);
    });
  }

  // ===============================
  // INITIALIZATION
  // ===============================

  window.addEventListener("load", () => {
    valentineNameInput.focus();
  });

  window.addEventListener("beforeunload", (e) => {
    if (uploadedPhotos.length > 0 || valentineNameInput.value.trim()) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  console.log("💕 Valentine Setup Page Loaded Successfully!");
})();


