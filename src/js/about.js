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
  { label: "HOME", href: "../index.html" },
  { label: "ABOUT", href: "../about.html" },
  { label: "ROUTES", href: "../routes.html" },
  { label: "CONTACT", href: "../contact.html" },
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

// IMPACT & GOAL REVISION :P
const btnCard = document.getElementById("cardButton");
const currentEffect = document.getElementById("currentEffect");
const textGoal = document.getElementById("goalText");
const textImpact = document.getElementById("impactText");
const cardImpact = document.getElementById("impactCard");
const cardGoal = document.getElementById("goalCard");
const cardBike = document.getElementById("cardBike");
cardImpact.style.opacity = 0;

function impactCard(params) {
  currentEffect.style.right = "50%";
  currentEffect.style.backgroundColor = "#6D94C5";
  textImpact.classList.remove("text-[#CBDCEB]");
  textImpact.classList.add("text-white");
  textGoal.classList.remove("text-white");
  textGoal.classList.add("text-[#6D94C5]");
  slideImpact();
}
function goalCard(params) {
  currentEffect.style.right = "0px";
  currentEffect.style.backgroundColor = "#CBDCEB";
  textImpact.classList.remove("text-white");
  textImpact.classList.add("text-[#CBDCEB]");
  textGoal.classList.remove("text-[#6D94C5]");
  textGoal.classList.add("text-white");
  slideGoal();
}

function slideImpact() {
  cardGoal.style.left = "-100%";
  cardImpact.style.right = "0px";
  cardBike.style.right = "70%";
  cardImpact.style.opacity = 1;
  cardGoal.style.opacity = 0;
}
function slideGoal() {
  cardGoal.style.left = "0px";
  cardImpact.style.right = "-100%";
  cardBike.style.right = "40px";
  cardImpact.style.opacity = 0;
  cardGoal.style.opacity = 1;
}

const imgClick = () => {
  window.location.href = "../index.html";
};
