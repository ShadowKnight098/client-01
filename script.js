document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const page = document.querySelector(".page");

  setTimeout(() => {
    if (loader) loader.classList.add("hide");
    if (page) page.classList.add("show");
  }, 300);
});
console.log("JS LOADED");


// =================================
//    NavBar Section 
// ==============================
const navBar = document.querySelector(".navbar");
const nav = document.querySelector(".nav")




window.addEventListener('scroll',()=>{
  if (window.scrollY >100){
    navBar.classList.add("scroll")
    nav.classList.add("scroll")
  }else{
    navBar.classList.remove("scroll")
    nav.classList.remove("scroll")
  }
})



document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // PRELOADER (FIXED)
  // ===============================
  const loader = document.querySelector(".loader");
  const page = document.querySelector(".page");

  setTimeout(() => {
    if (loader) loader.classList.add("hide");
    if (page) page.classList.add("show");
  }, 300);

  // ===============================
  // TYPING EFFECT
  // ===============================
  const text = "Imam";
  const typingElement = document.querySelector(".typing-text");

  let index = 0;
  const speed = 550;

  function typeEffect() {
    if (!typingElement) return;
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, speed);
    }
  }
  typeEffect();

  // ===============================
  // CHANGING TEXT
  // ===============================
  const words = [
    "Visual Storyteller",
    "Color Grading Artist",
    "Creative Filmmaker",
    "Cinematic Editor",
  ];

  const textElement = document.querySelector(".changing-text");
  if (textElement) {
    let wordIndex = 0;

    function updateText() {
      textElement.classList.remove("slide-in");
      textElement.classList.add("slide-out");

      setTimeout(() => {
        textElement.textContent = words[wordIndex];
        textElement.classList.remove("slide-out");
        textElement.classList.add("slide-in");
        wordIndex = (wordIndex + 1) % words.length;
      }, 400);
    }

    textElement.textContent = words[0];
    textElement.classList.add("slide-in");
    setInterval(updateText, 2500);
  }

  // ===============================
  // CAROUSEL
  // ===============================
  const slides = document.querySelectorAll(".slide");
  const videos = document.querySelectorAll(".carousel-video");
  const buttons = document.querySelectorAll("[data-carousel-button]");

  let currentIndex = 0;
  let previewTimers = [];

  function clearPreviewTimers() {
    previewTimers.forEach(clearTimeout);
    previewTimers = [];
  }

  function stopAllVideos() {
    videos.forEach(video => {
      video.pause();
      video.muted = true;
      video.currentTime = 0;
    });
    clearPreviewTimers();
  }

  function playPreview(video, duration = 5000) {
    if (!video) return;
    video.muted = true;
    video.currentTime = 0;
    video.play();
    previewTimers.push(setTimeout(() => video.pause(), duration));
  }

  function updateSlides() {
    if (!slides.length) return;

    slides.forEach(slide =>
      slide.classList.remove("prev", "active", "next")
    );

    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;

    slides[currentIndex].classList.add("active");
    slides[prevIndex].classList.add("prev");
    slides[nextIndex].classList.add("next");

    stopAllVideos();

    const activeVideo = slides[currentIndex].querySelector("video");
    if (activeVideo) {
      activeVideo.muted = false;
      activeVideo.play();
    }

    playPreview(slides[prevIndex].querySelector("video"));
    playPreview(slides[nextIndex].querySelector("video"));
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      currentIndex =
        button.dataset.carouselButton === "next"
          ? (currentIndex + 1) % slides.length
          : (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    });
  });

  updateSlides();
});
