/***** Moving Text Setup *****/
const movingTextContainer = document.getElementById("moving-text");
const text = "1 Day Left";
for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.textContent = text[i];
  span.classList.add("moving-letter");
  span.style.animationDelay = `${i * 0.1}s`;
  movingTextContainer.appendChild(span);
}

/***** Slideshow Setup *****/
const slideshowWrapper = document.getElementById("slideshow-wrapper");
const totalImages = 117;
let images = [];
for (let i = 1; i <= totalImages; i++) {
  images.push(`placeholder${i}.jpg`);
}
images.sort(() => Math.random() - 0.5);

images.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Slideshow Image ${i + 1}`;
  if (i === 0) {
    img.style.display = "block";
  }
  slideshowWrapper.appendChild(img);
});

const slideshowImages = document.querySelectorAll("#slideshow-wrapper img");
let currentIndex = 0;
let slideshowInterval;
let slideshowPlaying = true;
let musicPlaying = false;
let imagesShownCount = 0;

const startButton = document.getElementById("startButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const playPauseMusic = document.getElementById("playPauseMusic");
const playPauseSlideshow = document.getElementById("playPauseSlideshow");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const songSelector = document.getElementById("songSelector");

const transitions = ["fade", "zoom", "slide", "flip", "dissolve"];

function changeImage(step) {
  slideshowImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex + step + slideshowImages.length) % slideshowImages.length;
  imagesShownCount++;
  if (imagesShownCount >= totalImages) {
    endSlideshow();
    return;
  }
  const randomEffect = transitions[Math.floor(Math.random() * transitions.length)];
  slideshowImages[currentIndex].style.animation = `${randomEffect} 1.5s ease-in-out`;
  slideshowImages[currentIndex].style.display = "block";
}

function startSlideshow() {
  imagesShownCount = 0;
  slideshowInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

function endSlideshow() {
  clearInterval(slideshowInterval);
  backgroundMusic.pause();
  document.getElementById("finalMessage").style.display = "flex";
}

/***** Song Queue and Audio Setup *****/
const songList = [
  "audio/10,000_hours.mp3",
  "audio/all_of_me.mp3",
  "audio/always_you.mp3",
  "audio/carry_you_home.mp3",
  "audio/forever_and_ever.mp3",
  "audio/just_the_way_you_are.mp3",
  "audio/marry_me.mp3",
  "audio/marry_you.mp3",
  "audio/perfect.mp3",
  "audio/speechless.mp3",
  "audio/stargazing.mp3",
  "audio/worth_the_wait.mp3"
];

let shuffledQueue = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupQueue() {
  shuffledQueue = [...songList];
  shuffleArray(shuffledQueue);
  shuffledQueue.unshift("audio/that_part.mp3"); // Ensure "That Part" plays first
}

function playNextSong() {
  if (shuffledQueue.length > 0) {
    const nextSong = shuffledQueue.shift();
    backgroundMusic.src = nextSong;
    backgroundMusic.load();
    backgroundMusic.play();
  }
}

/***** Button Event Listeners *****/
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  document.getElementById("slideshow-container").style.display = "flex";
  document.getElementById("controls").style.display = "flex";
  document.getElementById("songSelectorContainer").style.display = "block";

  setupQueue(); // Setup shuffled queue with "That Part" first
  playNextSong(); // Start music immediately
  musicPlaying = true;
  playPauseMusic.textContent = "⏸ Music";

  setTimeout(() => {
    startSlideshow();
  }, 1000);
});

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

prevButton.addEventListener("click", () => changeImage(-1));
nextButton.addEventListener("click", () => changeImage(1));

songSelector.addEventListener("change", () => {
  const selectedSong = songSelector.value;
  backgroundMusic.src = selectedSong;
  backgroundMusic.load();
  backgroundMusic.play();
  musicPlaying = true;
  playPauseMusic.textContent = "⏸ Music";

  // Remove the selected song from the queue to prevent repetition
  shuffledQueue = shuffledQueue.filter(song => song !== selectedSong);
});

backgroundMusic.addEventListener("ended", playNextSong);

document.getElementById("replayButton").addEventListener("click", () => {
  document.getElementById("finalMessage").style.display = "none";
  slideshowImages.forEach(img => (img.style.display = "none"));
  currentIndex = 0;
  slideshowImages[currentIndex].style.display = "block";

  setupQueue();
  playNextSong();
  startSlideshow();
});
