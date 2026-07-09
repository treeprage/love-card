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
  console.log("✅ Фото загружены через CSS");
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
// ВЗРЫВ КНОПКИ (ГЛОБАЛЬНАЯ ФУНКЦИЯ)
// ============================================================

function explodeButton(buttonElement) {
  if (!buttonElement) return;

  const rect = buttonElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let container = document.getElementById("explosionContainer");

  // Если контейнера нет — создаём
  if (!container) {
    container = document.createElement("div");
    container.id = "explosionContainer";
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(container);
  }

  const colors = [
    "#ff6b8f",
    "#ff8aaa",
    "#ff4d6d",
    "#ff99cc",
    "#ffb3c6",
    "#ff2d55",
    "#ffd9e5",
    "#ffb347",
    "#ff6b6b",
    "#ff9f43",
    "#ff6b8f",
    "#e8486e",
  ];

  const emojis = ["❤️", "💕", "💗", "💖", "💘", "💝", "✨", "🌟", "🌸", "🎉"];

  const particlesCount = 40;

  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.className = "explosion-particle";

    const size = 8 + Math.random() * 16;
    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 250;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 50;

    const isEmoji = Math.random() > 0.6;

    if (isEmoji) {
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.fontSize = size + "px";
      particle.style.background = "none";
      particle.style.width = "auto";
      particle.style.height = "auto";
    } else {
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = size + "px";
      particle.style.height = size + "px";
    }

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";
    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");
    particle.style.animationDuration = 0.6 + Math.random() * 0.6 + "s";
    particle.style.transform = "rotate(" + Math.random() * 720 + "deg)";
    particle.style.position = "fixed";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.animation = "particleExplode 1s ease-out forwards";

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1500);
  }

  buttonElement.style.opacity = "0";
  buttonElement.style.transform = "scale(0)";
  buttonElement.style.pointerEvents = "none";
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
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${8 + Math.random() * 10}px;
      height: ${8 + Math.random() * 10}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
      animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
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
      position: absolute;
      left: ${Math.random() * 100}%;
      font-size: ${14 + Math.random() * 22}px;
      animation: floatHeart ${8 + Math.random() * 12}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      color: ${["#ff6b8f", "#ff8aaa", "#ff4d6d", "#ff99cc", "#ffb3c6"][Math.floor(Math.random() * 5)]};
      opacity: 0.4;
      user-select: none;
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

  // ===== ВОССТАНАВЛИВАЕМ КНОПКУ "НЕТ" =====
  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.style.position = "relative";
    noBtn.style.left = "0px";
    noBtn.style.top = "0px";
    noBtn.style.transition = "all 0.3s ease";
    noBtn.style.opacity = "1";
    noBtn.style.transform = "scale(1)";
    noBtn.style.pointerEvents = "auto";
  }

  // ===== ВОССТАНАВЛИВАЕМ КНОПКУ "НАЖМИ СЮДА" =====
  const btnStart = document.getElementById("btnStart");
  if (btnStart) {
    btnStart.style.opacity = "1";
    btnStart.style.transform = "scale(1)";
    btnStart.style.pointerEvents = "auto";
  }

  // ===== ВОССТАНАВЛИВАЕМ КНОПКУ "ДА!" =====
  const yesBtn = document.getElementById("yesBtn");
  if (yesBtn) {
    yesBtn.style.opacity = "1";
    yesBtn.style.transform = "scale(1)";
    yesBtn.style.pointerEvents = "auto";
  }

  // ===== ВОССТАНАВЛИВАЕМ СООБЩЕНИЕ "НЕТ" =====
  const noMessage = document.getElementById("noMessage");
  if (noMessage) {
    noMessage.style.display = "none";
    const msg = noMessage.querySelector("p");
    if (msg) {
      msg.textContent = '😆 А ты не можешь нажать "Нет"! Попробуй ещё раз 😘';
    }
  }

  // ===== СБРАСЫВАЕМ СЧЁТЧИК ПОПЫТОК =====
  const attemptCounter = document.getElementById("attemptCounter");
  if (attemptCounter) {
    attemptCounter.textContent = "";
  }

  // ===== УДАЛЯЕМ КОНФЕТТИ =====
  document.querySelectorAll(".confetti-container").forEach((el) => el.remove());

  // ===== ПЕРЕХОДИМ НА ПЕРВЫЙ ШАГ =====
  goToStep(1);
}

// ============================================================
// ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ АНИМАЦИЙ (добавляются в head)
// ============================================================

(function addExtraStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes heartBurst {
      0% { transform: scale(0) rotate(0deg); opacity: 1; }
      100% { transform: scale(1.5) rotate(720deg) translateY(-200px); opacity: 0; }
    }

    @keyframes particleExplode {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
      }
    }

    @keyframes confettiFall {
      0% {
        transform: translateY(-20px) rotate(0deg) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translateY(110vh) rotate(720deg) scale(1.2);
        opacity: 0;
      }
    }

    @keyframes floatHeart {
      0% {
        transform: translateY(100vh) scale(0.5) rotate(0deg);
        opacity: 0;
      }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% {
        transform: translateY(-10vh) scale(1.2) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
})();
