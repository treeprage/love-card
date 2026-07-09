// ============================================================
// ГЛАВНАЯ ЛОГИКА
// ============================================================

let currentStep = 1;
let isAnswered = false;
let noAttempts = 0;

// ============================================================
// ПЕРЕХОД МЕЖДУ ШАГАМИ
// ============================================================

function goToStep(stepNumber) {
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.remove("active");
  });

  const targetStep = document.getElementById(`step${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add("active");
    currentStep = stepNumber;
  }

  if (stepNumber === 4) {
    launchConfetti();
    createBurstHearts();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// ЗАГРУЗКА ФОТО
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const photoInput = document.getElementById("photoInput");
  const placeholder = document.getElementById("photoPlaceholder");

  // ДЕМО-ФОТО (красивая девушка с randomuser.me)
  const demoPhoto = "my_photo.jpg";

  // Сразу загружаем демо-фото
  setTimeout(() => {
    const img = document.createElement("img");
    img.src = demoPhoto;
    img.alt = "💕";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "22px";
    placeholder.innerHTML = "";
    placeholder.appendChild(img);
  }, 100);

  if (photoInput) {
    photoInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const existingImg = placeholder.querySelector("img");
          if (existingImg) {
            existingImg.src = event.target.result;
          } else {
            placeholder.innerHTML = "";
            const img = document.createElement("img");
            img.src = event.target.result;
            img.alt = "Твоя фотография ❤️";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "22px";
            placeholder.appendChild(img);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

// ============================================================
// ОБРАБОТЧИК КНОПКИ "ДА"
// ============================================================

function handleYes() {
  if (isAnswered) return;
  isAnswered = true;
  goToStep(4);
}

// ============================================================
// "УБЕГАЮЩАЯ" КНОПКА "НЕТ"
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const noBtn = document.getElementById("noBtn");
  const noMessage = document.getElementById("noMessage");
  const attemptCounter = document.getElementById("attemptCounter");
  let attempts = 0;

  if (noBtn) {
    noBtn.addEventListener("click", function (e) {
      e.preventDefault();

      attempts++;
      noAttempts = attempts;

      if (noMessage) {
        noMessage.style.display = "block";
        noMessage.style.animation = "none";
        setTimeout(() => {
          noMessage.style.animation = "shake 0.5s ease";
        }, 10);
      }

      if (attemptCounter) {
        const msgs = [
          "😅 Ну попробуй ещё раз",
          "😏 Ты не сможешь!",
          "🤭 Упрямая какая!",
          "😘 Я тебя люблю ❤️",
          "💕 Сдавайся уже!",
        ];
        const idx = Math.min(attempts - 1, msgs.length - 1);
        attemptCounter.textContent = `Попытка №${attempts}: ${msgs[idx]}`;
      }

      if (!isAnswered) {
        const btnRect = noBtn.getBoundingClientRect();
        const container = document.querySelector(".container");
        const containerRect = container.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;

        if (maxX > 10 && maxY > 10) {
          const randomX = Math.random() * maxX;
          const randomY = Math.random() * maxY;

          noBtn.style.position = "relative";
          noBtn.style.left = randomX + "px";
          noBtn.style.top = randomY + "px";
          noBtn.style.transition = "all 0.2s ease";
        }
      }
    });

    noBtn.addEventListener("mouseenter", function (e) {
      if (isAnswered) return;

      const btnRect = noBtn.getBoundingClientRect();
      if (btnRect.width === 0) return;

      const container = document.querySelector(".container");
      const containerRect = container.getBoundingClientRect();

      const maxX = containerRect.width - btnRect.width - 20;
      const maxY = containerRect.height - btnRect.height - 20;

      if (maxX > 10 && maxY > 10) {
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = "relative";
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
        noBtn.style.transition = "all 0.15s ease";
      }
    });
  }
});

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ЭФФЕКТЫ
// ============================================================

function createBurstHearts() {
  const emojis = ["❤️", "💕", "💗", "💖", "💘", "💝", "✨", "🌟", "🌸", "🌺"];

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 30}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            z-index: 999;
            animation: heartBurst ${1.5 + Math.random() * 2}s ease-out forwards;
            transform: scale(0);
        `;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

// ============================================================
// КОНФЕТТИ
// ============================================================

function launchConfetti() {
  const colors = [
    "#ff6b8f",
    "#ff8aaa",
    "#ffb3c6",
    "#ffd9e5",
    "#ff4d6d",
    "#ffb3b3",
    "#ff99cc",
    "#ff2d55",
  ];
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.cssText = `
            left: ${Math.random() * 100}%;
            top: -10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${8 + Math.random() * 10}px;
            height: ${8 + Math.random() * 10}px;
            border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
            animation-duration: ${2 + Math.random() * 3}s;
            animation-delay: ${Math.random() * 2}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.remove();
  }, 6000);
}

// ============================================================
// ФОНОВЫЕ СЕРДЕЧКИ
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const heartsContainer = document.getElementById("heartsContainer");
  if (!heartsContainer) return;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-particle";
    heart.textContent = ["❤️", "💕", "💗", "💖", "🌸", "🌺"][
      Math.floor(Math.random() * 6)
    ];
    heart.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${14 + Math.random() * 22}px;
            animation-duration: ${8 + Math.random() * 12}s;
            animation-delay: ${Math.random() * 5}s;
            color: ${["#ff6b8f", "#ff8aaa", "#ff4d6d", "#ff99cc", "#ffb3c6"][Math.floor(Math.random() * 5)]};
        `;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 22000);
  }, 250);
});

// ============================================================
// СБРОС
// ============================================================

function resetAll() {
  isAnswered = false;
  noAttempts = 0;

  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.style.position = "relative";
    noBtn.style.left = "0px";
    noBtn.style.top = "0px";
    noBtn.style.transition = "all 0.3s ease";
  }

  const noMessage = document.getElementById("noMessage");
  if (noMessage) {
    noMessage.style.display = "none";
    const msg = noMessage.querySelector("p");
    if (msg) {
      msg.textContent = '😆 А ты не можешь нажать "Нет"! Попробуй ещё раз 😘';
    }
  }

  const attemptCounter = document.getElementById("attemptCounter");
  if (attemptCounter) {
    attemptCounter.textContent = "";
  }

  document.querySelectorAll(".confetti-container").forEach((el) => el.remove());

  goToStep(1);
}

// ============================================================
// ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ АНИМАЦИЙ (если не загрузились из CSS)
// ============================================================

(function addExtraStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes heartBurst {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            100% { transform: scale(1.5) rotate(720deg) translateY(-200px); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
})();
