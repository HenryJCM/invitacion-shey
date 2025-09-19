const playButton = document.getElementById("play-button");
const audio = document.getElementById("romantic-track");
const materialIcon = playButton.querySelector(".material-symbols");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const heartsContainer = document.getElementById("hearts");
const response = document.getElementById("response");

let moving = false;
let playfulTricks = 0;
let celebrationActive = false;

async function toggleAudio() {
  if (audio.paused) {
    try {
      await audio.play();
      materialIcon.textContent = "pause";
      playButton.setAttribute("aria-label", "Pausar canción");
      playButton.classList.remove("error");
    } catch (error) {
      console.error("No se pudo reproducir el audio", error);
      playButton.classList.add("error");
    }
  } else {
    audio.pause();
    materialIcon.textContent = "play_arrow";
    playButton.setAttribute("aria-label", "Reproducir canción");
  }
}

playButton.addEventListener("click", toggleAudio);

audio.addEventListener("pause", () => {
  materialIcon.textContent = "play_arrow";
  playButton.setAttribute("aria-label", "Reproducir canción");
});

audio.addEventListener("play", () => {
  materialIcon.textContent = "pause";
  playButton.setAttribute("aria-label", "Pausar canción");
  playButton.classList.remove("error");
});

function mischievousMove() {
  if (playfulTricks > 6) {
    noButton.textContent = "POR SUPUESTO QUE SÍ";
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
  if (noButton.classList.contains("converted")) {
    celebrateYes(noButton);
    return;
  }

  if (!moving) {
    mischievousMove();
  }
});

function createHeart(originX, originY) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";

  const angle = Math.random() * Math.PI - Math.PI; // orienta mayormente hacia arriba
  const distance = Math.random() * 220 + 80;
  const translateX = Math.cos(angle) * distance;
  const translateY = Math.sin(angle) * distance;

  const scale = (Math.random() * 0.5 + 0.85).toFixed(2);
  const rotation = `${Math.random() * 120 - 60}deg`;
  const duration = `${Math.random() * 0.6 + 1.6}s`;
  const colors = ["#ff9fba", "#ffd6e0", "#ff6f91", "#f8a1d1"];

  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.left = `${originX}px`;
  heart.style.top = `${originY}px`;
  heart.style.fontSize = `${Math.random() * 18 + 18}px`;
  heart.style.setProperty("--tx", `${translateX}px`);
  heart.style.setProperty("--ty", `${translateY}px`);
  heart.style.setProperty("--scale", scale);
  heart.style.setProperty("--rz", rotation);
  heart.style.setProperty("--duration", duration);

  heartsContainer.appendChild(heart);

  const lifespan = (parseFloat(duration) + 0.4) * 1000;
  setTimeout(() => {
    heart.remove();
  }, lifespan);
}

function launchHeartConfetti(sourceElement) {
  const rect = sourceElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  let bursts = 0;
  const confettiInterval = setInterval(() => {
    for (let i = 0; i < 6; i += 1) {
      createHeart(originX, originY);
    }

    bursts += 1;
    if (bursts >= 12) {
      clearInterval(confettiInterval);
    }
  }, 90);
}

function celebrateYes(triggerElement = yesButton) {
  if (celebrationActive) {
    return;
  }

  celebrationActive = true;
  launchHeartConfetti(triggerElement);
  setTimeout(() => launchHeartConfetti(yesButton), 180);

  response.hidden = false;
  response.textContent = "Sabía que dirías que sí. Prepárate para una noche inolvidable.";
  yesButton.disabled = true;
  yesButton.textContent = "¡Nos vemos en el concierto!";
  yesButton.classList.add("accepted");

  noButton.style.pointerEvents = "none";
  noButton.style.opacity = "0";
  setTimeout(() => {
    noButton.style.display = "none";
  }, 600);
}

yesButton.addEventListener("click", () => celebrateYes(yesButton));

// Reproducción automática suave (silenciosa hasta interacción)
window.addEventListener("load", () => {
  audio.volume = 0.65;
});
