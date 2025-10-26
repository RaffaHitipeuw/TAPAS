const overlay = document.getElementById("overlay");
const list = overlay.querySelector(".menu-list");
const btn = document.getElementById("menuBtn");

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },

  lerp: 0.08,
  gestureDirection: "both",
});

// NAV

const items = [
  { label: "HOME", href: "#" },
  { label: "CONTACT", href: "#" },
  { label: "ROUTES", href: "#" },
  { label: "ABOUT", href: "#" },
];

let isOpen = false;
const centerX = 90;
const centerY = 13;

items.forEach((item) => {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between border-b border-white pb-6 group w-[90vw] mt-[80px]";
  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.label;
  a.className =
    "font-fontspringheavy text-white lg:text-[80px] text-[40px] leading-none font-bold tracking-tight text-left group-hover:opacity-70 transition-opacity duration-300 cursor-none";
  const arrow = document.createElement("span");
  arrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2" class="w-10 h-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 17l10-10M7 7h10v10" />
    </svg>
  `;
  li.append(a, arrow);
  list.appendChild(li);
});

const hoverCircle = document.createElement("div");
hoverCircle.id = "hoverCircle";
hoverCircle.className =
  "fixed top-0 left-0 w-40 h-40 rounded-full flex flex-col items-center justify-center pointer-events-none";
hoverCircle.style.zIndex = "9999";
hoverCircle.style.background = "#E0F0FF";
hoverCircle.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
hoverCircle.style.transform = "scale(0)";
hoverCircle.innerHTML = `
  <span class="font-fontspringheavy text-[#6D94C5] text-lg select-none">GO</span>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6D94C5" stroke-width="2" class="w-6 h-6 mt-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17l10-10M7 7h10v10" />
  </svg>
`;
document.body.appendChild(hoverCircle);

const menuLinks = document.querySelectorAll(".menu-list a");
const footerLinks = document.querySelectorAll("#footer-section .footer-links");
let cursorTargetX = 0;
let cursorTargetY = 0;
let cursorX = 0;
let cursorY = 0;

menuLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    hoverCircle.style.transition =
      "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
    hoverCircle.style.transform = "scale(1)";
  });

  link.addEventListener("mouseleave", () => {
    hoverCircle.style.transition =
      "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)";
    hoverCircle.style.transform = "scale(0)";
  });
});
footerLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    hoverCircle.style.transition =
      "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
    hoverCircle.style.transform = "scale(1)";
  });

  link.addEventListener("mouseleave", () => {
    hoverCircle.style.transition =
      "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)";
    hoverCircle.style.transform = "scale(0)";
  });
});

window.addEventListener("mousemove", (e) => {
  cursorTargetX = e.clientX - 80;
  cursorTargetY = e.clientY - 80;
});

function animateCircle() {
  cursorX += (cursorTargetX - cursorX) * 0.2;
  cursorY += (cursorTargetY - cursorY) * 0.2;
  hoverCircle.style.left = `${cursorX}px`;
  hoverCircle.style.top = `${cursorY}px`;
  requestAnimationFrame(animateCircle);
}
animateCircle();

btn.addEventListener("click", () => {
  isOpen = !isOpen;
  btn.querySelector(".line1").classList.toggle("rotate-45", isOpen);
  btn.querySelector(".line1").classList.toggle("translate-y-[4px]", isOpen);
  btn.querySelector(".line2").classList.toggle("-rotate-45", isOpen);
  btn.querySelector(".line2").classList.toggle("-translate-y-[4px]", isOpen);

  if (isOpen) {
    btn.style.zIndex = "5001";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(150% at ${centerX}% ${centerY}%)`;
    });
  } else {
    overlay.style.clipPath = `circle(0% at ${centerX}% ${centerY}%)`;
    overlay.addEventListener(
      "transitionend",
      () => {
        if (!isOpen) {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
          btn.style.zIndex = "4001";
        }
      },
      { once: true }
    );
  }
});

// MISSION & VISION BUTTON :b
const missionBtn = document.getElementById("missionBtn");
const visionBtn = document.getElementById("visionBtn");
const answerMission = missionBtn.querySelector(".answer");
const answerVision = visionBtn.querySelector(".answer");

let isOpenMission = false;
let isOpenVision = false;

function setIcon(btn, open) {
  const line1 = btn.querySelector(".line1");
  const line2 = btn.querySelector(".line2");

  line1.style.transition = "transform 0.3s ease";
  line2.style.transition = "transform 0.3s ease";

  if (open) {
    line1.style.transform = "rotate(0deg)";
  } else {
    line1.style.transform = "rotate(90deg)";
  }
}

visionBtn.addEventListener("click", () => {
  isOpenVision = !isOpenVision;

  answerVision.style.height = isOpenVision ? "200px" : "0px";
  answerVision.style.opacity = isOpenVision ? "1" : "0";
  answerVision.style.transition = "all 0.3s ease";

  setIcon(visionBtn, isOpenVision);

  if (isOpenVision) {
    isOpenMission = false;
    answerMission.style.height = "0px";
    answerMission.style.opacity = "0";
    setIcon(missionBtn, false);
  }
});

missionBtn.addEventListener("click", () => {
  isOpenMission = !isOpenMission;

  answerMission.style.height = isOpenMission ? "400px" : "0px";
  answerMission.style.opacity = isOpenMission ? "1" : "0";
  answerMission.style.transition = "all 0.3s ease";

  setIcon(missionBtn, isOpenMission);

  if (isOpenMission) {
    isOpenVision = false;
    answerVision.style.height = "0px";
    answerVision.style.opacity = "0";
    setIcon(visionBtn, false);
  }
});


// IMPACT & GOAL
const activeEffect = document.getElementById("activeEffect");
const impactBtn = document.getElementById("impactBtn");
const goalBtn = document.getElementById("goalBtn");
const impactContent = document.getElementById("impactContent");
const goalContent = document.getElementById("goalContent");
const bottomBox = document.getElementById("bottomBox");
const slideBox = document.getElementById("slideBox");

let current = "goal";
let isAnimating = false;

// Helper animasi vertikal (HP)
function animateSlide(element, from, to, duration, callback) {
  const start = performance.now();
  function step(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = from + (to - from) * progress;
    element.style.transform = `translateY(${value}%)`;
    element.style.opacity = 1 - Math.abs(value) / 100;
    if (progress < 1) requestAnimationFrame(step);
    else if (callback) callback();
  }
  requestAnimationFrame(step);
}

// Deteksi tablet
function isTablet() {
  return window.matchMedia("(min-width: 768px)").matches;
}

// IMPACT
function switchToImpact() {
  if (isAnimating || current === "impact") return;
  isAnimating = true;
  current = "impact";
  activeEffect.style.left = "5px";
  impactBtn.style.color = "white";
  goalBtn.style.color = "#9EBCE2";

  if (isTablet()) {
    // tablet animasi
    slideBox.style.transition = "transform 0.7s cubic-bezier(0.55,0,0.1,1)";
    slideBox.style.transform = "translateX(-120%)";

    setTimeout(() => {
      slideBox.style.transition = "none";
      slideBox.style.transform = "translateX(200%)";

      goalContent.classList.add("hidden");
      impactContent.classList.remove("hidden");
      slideBox.style.backgroundColor = "#6D94C5";
      slideBox.classList.add("text-white");
      slideBox.classList.remove("text-[#4A6FA5]");

      setTimeout(() => {
        slideBox.style.transition = "transform 0.7s cubic-bezier(0.55,0,0.1,1)";
        slideBox.style.transform = "translateX(75%)";
      }, 50);
    }, 700);

    setTimeout(() => (isAnimating = false), 1500);
  } else {
    // hp animasi
    animateSlide(bottomBox, 0, 120, 400, () => {
      bottomBox.style.backgroundColor = "#6D94C5";
      goalContent.style.opacity = "0";
      impactContent.style.opacity = "1";
      goalContent.style.transform = "translateY(100%)";
      impactContent.style.transform = "translateY(0)";
      animateSlide(bottomBox, 120, 0, 400, () => (isAnimating = false));
    });
  }
}

// GOAL
function switchToGoal() {
  if (isAnimating || current === "goal") return;
  isAnimating = true;
  current = "goal";
  activeEffect.style.left = "calc(50% + 1px)";
  goalBtn.style.color = "white";
  impactBtn.style.color = "#9EBCE2";

  if (isTablet()) {
    // tablet animasi
    slideBox.style.transition = "transform 0.7s cubic-bezier(0.55,0,0.1,1)";
    slideBox.style.transform = "translateX(200%)";

    setTimeout(() => {
      slideBox.style.transition = "none";
      slideBox.style.transform = "translateX(-120%)";

      impactContent.classList.add("hidden");
      goalContent.classList.remove("hidden");
      slideBox.style.backgroundColor = "#CBDCEB";
      slideBox.classList.remove("text-white");
      slideBox.classList.add("text-[#4A6FA5]");

      setTimeout(() => {
        slideBox.style.transition = "transform 0.7s cubic-bezier(0.55,0,0.1,1)";
        slideBox.style.transform = "translateX(0%)";
      }, 50);
    }, 700);

    setTimeout(() => (isAnimating = false), 1500);
  } else {
    // hp animasi
    animateSlide(bottomBox, 0, 120, 400, () => {
      bottomBox.style.backgroundColor = "#CBDCEB";
      impactContent.style.opacity = "0";
      goalContent.style.opacity = "1";
      impactContent.style.transform = "translateY(100%)";
      goalContent.style.transform = "translateY(0)";
      animateSlide(bottomBox, 120, 0, 400, () => (isAnimating = false));
    });
  }
}

impactBtn.addEventListener("click", switchToImpact);
goalBtn.addEventListener("click", switchToGoal);
