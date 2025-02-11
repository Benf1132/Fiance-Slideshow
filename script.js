/***** Moving Text Setup *****/
const movingTextContainer = document.getElementById("moving-text");
const text = "1 Day Left";
// Create a span for each character so we can animate them individually
for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.textContent = text[i];
  span.classList.add("moving-letter");
  // Stagger the color cycle slightly per letter
  span.style.animationDelay = `${i * 0.1}s`;
  movingTextContainer.appendChild(span);

  // Remove any extra effect classes after the effect animation ends
  span.addEventListener("animationend", (e) => {
    const extraEffects = ["effectFade", "effectZoom", "effectSlide", "effectFlip", "effectDissolve"];
    if (extraEffects.includes(e.animationName)) {
      span.classList.remove("effect-fade", "effect-zoom", "effect-slide", "effect-flip", "effect-dissolve");
    }
  });
}

// On each complete loop of the square path, add a random extra effect to each letter
movingTextContainer.addEventListener("animationiteration", () => {
  const letters = document.querySelectorAll("#moving-text .moving-letter");
  const effects = ["effect-fade", "effect-zoom", "effect-slide", "effect-flip", "effect-dissolve"];
  letters.forEach(letter => {
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    letter.classList.add(randomEffect);
  });
});

/***** Slideshow Setup *****/
const slideshowWrapper = document.getElementById("slideshow-wrapper");
const totalImages = 117;
let images = [];
for (let i = 1; i <= totalImages; i++) {
  // Adjust the image path as needed
  images.push(`images/placeholder${i}.jpg`);
}
// Shuffle images randomly
images.sort(() => Math.random() - 0.5);

// Create and append image elements for the slideshow
images.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Slideshow Image ${i + 1}`;
  if (i === 0) {
    img.style.display = "block"; // Show the first image
  }
  slideshowWrapper.appendChild(img);
});

const slideshowImages = document.querySelectorAll("#slideshow-wrapper img");
let currentIndex = 0;
let slideshowInterval;
let slideshowPlaying = true;
let musicPlaying = false;

const startButton = document.getElementById("startButton");
const slideshowContainer = document.getElementById("slideshow-container");
const controls = document.getElementById("controls");
const backgroundMusic = document.getElementById("backgroundMusic");
const playPauseMusic = document.getElementById("playPauseMusic");
const playPauseSlideshow = document.getElementById("playPauseSlideshow");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// List of CSS transitions for slideshow images
const transitions = ["fade", "zoom", "slide", "flip", "dissolve"];
function changeImage(step) {
  slideshowImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex + step + slideshowImages.length) % slideshowImages.length;
  // Apply a random transition effect to the new image
  const randomEffect = transitions[Math.floor(Math.random() * transitions.length)];
  slideshowImages[currentIndex].style.animation = `${randomEffect} 1.5s ease-in-out`;
  slideshowImages[currentIndex].style.display = "block";
}

function startSlideshow() {
  slideshowInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

/***** Button Event Listeners *****/
// When the red "Press Me" button is clicked:
startButton.addEventListener("click", () => {
  startButton.style.display = "none";             // Hide the button
  slideshowContainer.style.display = "flex";       // Show the slideshow frame
  controls.style.display = "flex";                 // Show the controls
  backgroundMusic.play();                          // Start the music
  musicPlaying = true;
  playPauseMusic.textContent = "⏸ Music";
  startSlideshow();
});

// Play/Pause Music control
playPauseMusic.addEventListener("click", () => {
  if (musicPlaying) {
    backgroundMusic.pause();
    playPauseMusic.textContent = "▶ Music";
  } else {
    backgroundMusic.play();
    playPauseMusic.textContent = "⏸ Music";
  }
  musicPlaying = !musicPlaying;
});

// Play/Pause Slideshow control
playPauseSlideshow.addEventListener("click", () => {
  if (slideshowPlaying) {
    clearInterval(slideshowInterval);
    playPauseSlideshow.textContent = "▶ Slideshow";
  } else {
    startSlideshow();
    playPauseSlideshow.textContent = "⏸ Slideshow";
  }
  slideshowPlaying = !slideshowPlaying;
});

// Previous/Next Image controls
prevButton.addEventListener("click", () => changeImage(-1));
nextButton.addEventListener("click", () => changeImage(1));
