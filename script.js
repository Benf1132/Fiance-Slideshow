/***** Moving Text Setup *****/
const movingTextContainer = document.getElementById("moving-text");
const text = "1 Day Left";
for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.textContent = text[i];
  span.classList.add("moving-letter");
  span.style.animationDelay = ${i * 0.1}s;
  movingTextContainer.appendChild(span);

  span.addEventListener("animationend", (e) => {
    const extraEffects = ["effectFade", "effectZoom", "effectSlide", "effectFlip", "effectDissolve"];
    if (extraEffects.includes(e.animationName)) {
      span.classList.remove("effect-fade", "effect-zoom", "effect-slide", "effect-flip", "effect-dissolve");
    }
  });
}

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
  // Since your photos are in the same directory, this path is correct
  images.push(placeholder${i}.jpg);
}
images.sort(() => Math.random() - 0.5);

images.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = Slideshow Image ${i + 1};
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
const slideshowContainer = document.getElementById("slideshow-container");
const controls = document.getElementById("controls");
const backgroundMusic = document.getElementById("backgroundMusic");
const playPauseMusic = document.getElementById("playPauseMusic");
const playPauseSlideshow = document.getElementById("playPauseSlideshow");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

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
  slideshowImages[currentIndex].style.animation = ${randomEffect} 1.5s ease-in-out;
  slideshowImages[currentIndex].style.display = "block";
}

function startSlideshow() {
  imagesShownCount = 0; // Reset counter
  slideshowInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

function endSlideshow() {
  clearInterval(slideshowInterval);
  backgroundMusic.pause();
  document.getElementById("finalMessage").style.display = "flex";
}

/***** Song Selector Setup *****/
const songSelector = document.getElementById("songSelector");
const songList = [
  "10,000_hours.mp3",
  "all_of_me.mp3",
  "always_you.mp3",
  "carry_you_hoome.mp3",
  "forever_and_ever.mp3",
  "just_the_way_you_are.mp3",
  "marry_me.mp3",
  "marry_you.p3",
  "perfect.mp3",
  "speechless.mp3",
  "stargazing.mp3",
  "that_part.mp3",
  "worth_the_wait.mp3",
];

function chooseRandomSong() {
  const randomIndex = Math.floor(Math.random() * songList.length);
  return songList[randomIndex];
}

function updateAudioSource() {
  let selectedSong = songSelector.value;
  if (!selectedSong) {
    selectedSong = chooseRandomSong();
  }
  backgroundMusic.src = selectedSong;
  backgroundMusic.load();
  backgroundMusic.play();
}

songSelector.addEventListener("change", updateAudioSource);

backgroundMusic.addEventListener("ended", () => {
  if (songSelector.value === "") {
    updateAudioSource();
  }
});

/***** Button Event Listeners *****/
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  slideshowContainer.style.display = "flex";
  controls.style.display = "flex";
  document.getElementById("songSelectorContainer").style.display = "block";

  updateAudioSource();
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

document.getElementById("replayButton").addEventListener("click", () => {
  document.getElementById("finalMessage").style.display = "none";
  slideshowImages.forEach(img => (img.style.display = "none"));
  currentIndex = 0;
  slideshowImages[currentIndex].style.display = "block";
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  startSlideshow();
});
