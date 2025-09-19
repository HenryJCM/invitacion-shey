const playButton = document.getElementById("play-button");
const audio = document.getElementById("romantic-track");
const materialIcon = playButton.querySelector(".material-symbols");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const heartsContainer = document.getElementById("hearts");
const response = document.getElementById("response");

let moving = false;
let playfulTricks = 0;

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    materialIcon.textContent = "pause";
    playButton.setAttribute("aria-label", "Pausar canción");
  } else {
    audio.pause();
    materialIcon.textContent = "play_arrow";
    playButton.setAttribute("aria-label", "Reproducir canción");
  }
}

playButton.addEventListener("click", toggleAudio);

function mischievousMove() {
  if (playfulTricks > 6) {
    noButton.textContent = "¡Por supuesto que sí!";
    noButton.classList.add("converted");
    noButton.style.transform = "translate(0, 0)";
    noButton.style.position = "";
    noButton.removeEventListener("mouseenter", mischievousMove);
    noButton.removeEventListener("touchstart", mischievousMove);
    return;
  }

  moving = true;
  playfulTricks += 1;

  const bounds = noButton.parentElement.getBoundingClientRect();
  const maxX = bounds.width - noButton.offsetWidth;
  const maxY = bounds.height - noButton.offsetHeight;

  const randomX = Math.max(0, Math.min(Math.random() * maxX, maxX));
  const randomY = Math.max(0, Math.min(Math.random() * maxY, maxY));

  noButton.style.position = "relative";
  noButton.style.transform = `translate(${randomX - maxX / 2}px, ${randomY - maxY / 2}px)`;

  setTimeout(() => {
    moving = false;
  }, 400);
}

noButton.addEventListener("mouseenter", mischievousMove);
noButton.addEventListener("touchstart", mischievousMove);

noButton.addEventListener("click", () => {
  if (!moving) {
    mischievousMove();
  }
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";
  const x = Math.random() * window.innerWidth;
  const size = Math.random() * 24 + 16;
  heart.style.left = `${x}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${Math.random() * 2 + 3}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

function celebrateYes() {
  response.hidden = false;
  response.textContent = "Sabía que dirías que sí. Prepárate para una noche inolvidable.";
  yesButton.disabled = true;
  yesButton.textContent = "¡Nos vemos en el concierto!";
  yesButton.classList.add("accepted");
  noButton.style.display = "none";

  let count = 0;
  const interval = setInterval(() => {
    createHeart();
    createHeart();
    count += 1;
    if (count > 25) {
      clearInterval(interval);
    }
  }, 120);
}

yesButton.addEventListener("click", celebrateYes);

// Reproducción automática suave (silenciosa hasta interacción)
window.addEventListener("load", () => {
  audio.volume = 0.65;
});
