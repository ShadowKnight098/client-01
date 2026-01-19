// ===============================
// SELECT ELEMENTS
// ===============================

const text = "Imam";
const typingElement = document.querySelector(".typing-text");

let index = 0;
const speed = 550; // typing speed (ms)

function typeEffect() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Visual Storyteller",
    "Color Grading Artist",
    "Creative Filmmaker",
    "Cinematic Editor"
  ];

  const textElement = document.querySelector(".changing-text");
  if (!textElement) return; // 🔥 safety check

  let index = 0;

  function updateText() {
    textElement.classList.remove("slide-in");
    textElement.classList.add("slide-out");

    setTimeout(() => {
      textElement.textContent = words[index];
      textElement.classList.remove("slide-out");
      textElement.classList.add("slide-in");

      index = (index + 1) % words.length;
    }, 400);
  }

  // initial render
  textElement.textContent = words[0];
  textElement.classList.add("slide-in");

  setInterval(updateText, 2500);
  console.log("text element:", textElement);

});

window.addEventListener("DOMContentLoaded", typeEffect);

const slides = document.querySelectorAll(".slide");
const videos = document.querySelectorAll(".carousel-video");
const buttons = document.querySelectorAll("[data-carousel-button]");

let currentIndex = 0;
let previewTimers = [];

// ===============================
// CLEAR ALL PREVIEW TIMERS
// ===============================
function clearPreviewTimers() {
  previewTimers.forEach(timer => clearTimeout(timer));
  previewTimers = [];
}

// ===============================
// STOP ALL VIDEOS
// ===============================
function stopAllVideos() {
  videos.forEach(video => {
    video.pause();
    video.muted = true;
    video.currentTime = 0;
  });
  clearPreviewTimers();
}

// ===============================
// PLAY 5s PREVIEW (SIDE VIDEOS)
// ===============================
function playPreview(video, duration = 5000) {
  if (!video) return;

  video.muted = true;
  video.currentTime = 0;
  video.play();

  const timer = setTimeout(() => {
    video.pause();
  }, duration);

  previewTimers.push(timer);
}

// ===============================
// UPDATE SLIDES (CORE LOGIC)
// ===============================
function updateSlides() {
  slides.forEach(slide => {
    slide.classList.remove("prev", "active", "next");
  });

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  slides[currentIndex].classList.add("active");
  slides[prevIndex].classList.add("prev");
  slides[nextIndex].classList.add("next");

  // Stop everything first
  stopAllVideos();

  // ▶ CENTER VIDEO (FULL PLAY WITH SOUND)
  const activeVideo = slides[currentIndex].querySelector("video");
  if (activeVideo) {
    activeVideo.muted = false;
    activeVideo.play();
  }

  // 👀 SIDE VIDEOS (5s PREVIEW, MUTED)
  const prevVideo = slides[prevIndex].querySelector("video");
  const nextVideo = slides[nextIndex].querySelector("video");

  playPreview(prevVideo);
  playPreview(nextVideo);
}

// ===============================
// BUTTON CONTROLS
// ===============================
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.carouselButton === "next") {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlides();
  });
});

// ===============================
// INITIAL LOAD
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  updateSlides();
});
