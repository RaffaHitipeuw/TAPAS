// =========================================================
// 🧭 OVERLAY MENU & BUTTON LOGIC
// =========================================================
const overlay = document.getElementById("overlay");
const list = overlay.querySelector(".menu-list");
const btn = document.getElementById("menuBtn");

const items = [
  { label: "HOME", href: "index.html" },
  { label: "ABOUT", href: "about.html" },
  { label: "ROUTES", href: "routes.html" },
  { label: "CONTACT", href: "contact.html" },
];

let isOpen = false;
const centerX = 90;
const centerY = 13;

// Generate menu list secara dinamis
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"
      class="w-10 h-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 17l10-10M7 7h10v10" />
    </svg>
  `;

  li.append(a, arrow);
  list.appendChild(li);
});

// =========================================================
// 🎯 MENU BUTTON OPEN/CLOSE ANIMATION
// =========================================================
btn.addEventListener("click", () => {
  isOpen = !isOpen;

  // Animasi hamburger jadi X
  btn.querySelector(".line1").classList.toggle("rotate-45", isOpen);
  btn.querySelector(".line1").classList.toggle("translate-y-[4px]", isOpen);
  btn.querySelector(".line2").classList.toggle("-rotate-45", isOpen);
  btn.querySelector(".line2").classList.toggle("-translate-y-[4px]", isOpen);

  // Efek overlay open / close
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

// =========================================================
// 💫 MARQUEE SCROLL ANIMATION (TEXT BERJALAN)
// =========================================================
const marquee = document.getElementById("marquee");
const marqueeTrack = document.createElement("div");

// Gandakan isi marquee untuk looping tanpa putus
marqueeTrack.className = "marquee-track inline-flex";
marqueeTrack.innerHTML = marquee.innerHTML + marquee.innerHTML;
marquee.innerHTML = "";
marquee.appendChild(marqueeTrack);

// Variabel kontrol marquee
let lastScrollY = 0;
let currentX = 0;
let targetX = 0;

// =========================================================
// 🌀 LOCOMOTIVE SCROLL INITIALIZATION
// =========================================================
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: { smooth: true },
  tablet: { smooth: true },
  lerp: 0.08,
  gestureDirection: "both",
});

window.addEventListener("resize", () => scroll.update());

// Update targetX berdasarkan arah scroll
scroll.on("scroll", (obj) => {
  const delta = obj.scroll.y - lastScrollY;
  lastScrollY = obj.scroll.y;
  targetX += delta * 0.6; // kecepatan marquee relatif scroll
});

// Animasi pergerakan marquee
function animateMarquee() {
  currentX += (targetX - currentX) * 0.1;

  const halfWidth = marqueeTrack.scrollWidth / 2;

  // Normalisasi posisi biar gak ilang pas scroll jauh
  if (currentX > halfWidth) {
    currentX -= halfWidth;
    targetX -= halfWidth;
  }
  if (currentX < 0) {
    currentX += halfWidth;
    targetX += halfWidth;
  }

  marqueeTrack.style.transform = `translateX(${-currentX}px)`;
  requestAnimationFrame(animateMarquee);
}
animateMarquee();

// =========================================================
// 🖱️ CUSTOM CURSOR "GO" CIRCLE (MENU HOVER EFFECT)
// =========================================================
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
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6D94C5" stroke-width="2"
    class="w-6 h-6 mt-1">
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

// Hover in/out animasi lingkaran
[...menuLinks, ...footerLinks].forEach((link) => {
  link.addEventListener("mouseenter", () => {
    hoverCircle.style.transform = "scale(1)";
  });
  link.addEventListener("mouseleave", () => {
    hoverCircle.style.transform = "scale(0)";
  });
});

// Cursor follow animation
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

// =========================================================
// 🖼️ IMAGE SLIDE IN VIEWPORT
// =========================================================
const slidesRight = document.querySelectorAll(".image-slide-right");
const slidesLeft = document.querySelectorAll(".image-slide-left");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.toggle(
          "translate-x-[40%]",
          entry.target.classList.contains("image-slide-right")
        );
        entry.target.classList.toggle(
          "translate-x-[-40%]",
          entry.target.classList.contains("image-slide-left")
        );
      } else {
        entry.target.classList.remove(
          "translate-x-[40%]",
          "translate-x-[-40%]"
        );
      }
    });
  },
  { threshold: 0.5 }
);
slidesRight.forEach((el) => observer.observe(el));
slidesLeft.forEach((el) => observer.observe(el));

// =========================================================
// ☁️ FADE-UP EFFECT
// =========================================================
const fadeUpElements = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("fade-up-active", entry.isIntersecting);
    });
  },
  { threshold: 0.5 }
);
fadeUpElements.forEach((el) => fadeObserver.observe(el));

// =========================================================
// ↔️ HORIZONTAL SCROLL LOCK SECTION
// =========================================================
const horizontalSection = document.querySelector("#horizontal-section");
const horizontalTrack = horizontalSection.querySelector(".horizontal-track");

let inHorizontal = false;
let scrollX = 0;
let cooldown = false;
let lockTriggered = false;

document.body.style.overscrollBehavior = "none";
document.documentElement.style.overscrollBehavior = "none";

scroll.on("scroll", () => {
  const rect = horizontalSection.getBoundingClientRect();
  const vh = window.innerHeight;

  const fullyInView = rect.top <= 0 && rect.bottom >= vh;

  if (!inHorizontal && fullyInView && !lockTriggered) {
    lockTriggered = true;
    scroll.scrollTo(horizontalSection, {
      offset: 0,
      duration: 300,
      easing: [0.25, 0.1, 0.25, 1],
    });

    setTimeout(() => {
      scroll.stop();
      document.body.style.overflow = "hidden";
      inHorizontal = true;
    }, 310);
  }

  const outOfView = rect.bottom < vh * 0.95 || rect.top > vh * 0.05;
  if (inHorizontal && outOfView) {
    document.body.style.overflow = "";
    scroll.start();
    inHorizontal = false;
    lockTriggered = false;
  }
});

// Mouse wheel horizontal control
window.addEventListener(
  "wheel",
  (e) => {
    if (!inHorizontal || cooldown) return;
    e.preventDefault();

    const maxScroll =
      horizontalTrack.scrollWidth - horizontalSection.clientWidth;

    scrollX += e.deltaY * 0.8;
    scrollX = Math.max(0, Math.min(maxScroll, scrollX));
    horizontalSection.scrollLeft = scrollX;

    // Keluar ke bawah section
    if (scrollX >= maxScroll && e.deltaY > 0) {
      cooldown = true;
      setTimeout(() => {
        document.body.style.overflow = "";
        scroll.start();
        inHorizontal = false;
        lockTriggered = false;
        cooldown = false;
        scroll.scrollTo(horizontalSection.nextElementSibling, {
          offset: 0,
          duration: 500,
          easing: [0.25, 0.1, 0.25, 1],
        });
      }, 200);
    }

    // Keluar ke atas section
    if (scrollX <= 0 && e.deltaY < 0) {
      cooldown = true;
      setTimeout(() => {
        document.body.style.overflow = "";
        scroll.start();
        inHorizontal = false;
        lockTriggered = false;
        cooldown = false;
        scroll.scrollTo(horizontalSection.previousElementSibling, {
          offset: 0,
          duration: 500,
          easing: [0.25, 0.1, 0.25, 1],
        });
      }, 200);
    }
  },
  { passive: false }
);

// =========================================================
// ❓ QUESTION HOVER BUBBLE (Q&A INTERACTION)
// =========================================================
const questionLinks = document.querySelectorAll("#question-section h2");

// Bubble info muncul saat hover question
const questionHover = document.createElement("div");
questionHover.id = "questionHover";
questionHover.className =
  "fixed top-0 left-0 w-[400px] h-[400px] rounded-full flex flex-col items-center justify-center pointer-events-none p-12 text-center overflow-hidden";
questionHover.style.zIndex = "9999";
questionHover.style.background = "white";
questionHover.style.transition =
  "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
questionHover.style.transform = "scale(0)";
document.body.appendChild(questionHover);

// Isi bubble untuk setiap pertanyaan
const questionAnswers = {
  1: `<div class="text-center w-full transition-all duration-300 origin-center">
        <p class="text-[#6A8ACB] font-figtree text-sm mb-2">1st Question</p>
        <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] mb-3">
          What is an electric bike rental service and how does it work?
        </h3>
        <p class="text-[#6A8ACB] text-[13px] font-figtree">
          E-bikes produce zero tailpipe emissions, helping cut down CO₂ and fine particles from vehicles.
        </p>
      </div>`,
  2: `
    <div class="text-center w-full transition-all duration-300 origin-center">
      <p class="text-[#6A8ACB] font-figtree text-sm mb-2">2nd Question</p>
      <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] leading-snug mb-3">
        How do electric bikes help reduce air pollution?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
        E-bikes produce zero tailpipe emissions, helping cut down CO₂ and fine particles from vehicles. 
        More e-bikes on the road means cleaner air and quieter cities.
      </p>
    </div>
  `,
  3: `
    <div class="text-center w-full transition-all duration-300 origin-center">
      <p class="text-[#6A8ACB] font-figtree text-sm mb-2">3rd Question</p>
      <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] leading-snug mb-3">
        Are e-bikes effective in reducing traffic congestion?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
        Absolutely. E-bikes take up less space, reduce dependency on cars, 
        and let you skip through traffic with minimal delay.
      </p>
    </div>
  `,
  4: `
    <div class="text-center w-full transition-all duration-300 origin-center">
      <p class="text-[#6A8ACB] font-figtree text-sm mb-2">4th Question</p>
      <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] leading-snug mb-3">
        Are e-bikes safe to use on city roads?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
        Our e-bikes are equipped with high safety standards, including advanced braking systems, front and rear lights, and GPS tracking. We also encourage riders to wear helmets and follow traffic rules for everyone's safety.
      </p>
    </div>
  `,
  5: `
    <div class="text-center w-full transition-all duration-300 origin-center">
      <p class="text-[#6A8ACB] font-figtree text-sm mb-2">5th Question</p>
      <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] leading-snug mb-3">
        Is this service available across Indonesia?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
         Currently, our service is available in several major cities in Indonesia and continues to expand. You can check service availability in your city through our app or website.
      </p>
    </div>
  `,
  6: `
    <div class="text-center w-full transition-all duration-300 origin-center">
      <p class="text-[#6A8ACB] font-figtree text-sm mb-2">6th Question</p>
      <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] leading-snug mb-3">
        Why should I choose an e-bike over other types of transportation?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
         E-bikes are an eco-friendly, cost-effective, and practical transportation option for urban travel. By renting an e-bike, you're supporting a sustainable lifestyle and helping to reduce the negative environmental and traffic impacts of conventional transport.
      </p>
    </div>
  `,
};

// Hover logic untuk question section
let qCursorTargetX = 0,
  qCursorTargetY = 0,
  qCursorX = 0,
  qCursorY = 0;

function scaleTextToFit(container) {
  const el = container.querySelector("div");
  if (!el) return;
  el.style.transform = "scale(1)";
  const scale = Math.min(1, 300 / el.scrollHeight);
  el.style.transform = `scale(${scale})`;
}

questionLinks.forEach((q, i) => {
  q.addEventListener("mouseenter", () => {
    const qNum = i + 1;
    questionHover.innerHTML =
      questionAnswers[qNum] ||
      `<p class="text-[#6A8ACB]">No content found.</p>`;
    questionHover.style.transform = "scale(1)";
    scaleTextToFit(questionHover);
  });

  q.addEventListener("mouseleave", () => {
    questionHover.style.transform = "scale(0)";
  });
});

// Gerak bubble mengikuti cursor
window.addEventListener("mousemove", (e) => {
  qCursorTargetX = e.clientX - 175;
  qCursorTargetY = e.clientY - 175;
});

function animateQuestionHover() {
  qCursorX += (qCursorTargetX - qCursorX) * 0.15;
  qCursorY += (qCursorTargetY - qCursorY) * 0.15;
  questionHover.style.left = `${qCursorX}px`;
  questionHover.style.top = `${qCursorY}px`;
  requestAnimationFrame(animateQuestionHover);
}
animateQuestionHover();

// =========================================================
// 🖐️ DRAG SCROLL UNTUK SECTION RIDE
// =========================================================
const rideScroll = document.getElementById("ride-scroll");
let isDown = false;
let startX;
let scrollLeft;

// duplikat isi supaya panjang
rideScroll.innerHTML += rideScroll.innerHTML;

// fungsi untuk ngecek dan reset posisi scroll
function checkScrollLoop() {
  const scrollWidth = rideScroll.scrollWidth / 2;
  if (rideScroll.scrollLeft >= scrollWidth) {
    rideScroll.scrollLeft = 0;
  } else if (rideScroll.scrollLeft <= 0) {
    rideScroll.scrollLeft = scrollWidth;
  }
}

// event drag manual
rideScroll.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - rideScroll.offsetLeft;
  scrollLeft = rideScroll.scrollLeft;
});

rideScroll.addEventListener("mouseleave", () => (isDown = false));
rideScroll.addEventListener("mouseup", () => (isDown = false));

rideScroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - rideScroll.offsetLeft;
  const walk = (x - startX) * 1.5;
  rideScroll.scrollLeft = scrollLeft - walk;
  checkScrollLoop();
});

// event saat scroll biasa (pakai touchpad / mobile)
rideScroll.addEventListener("scroll", checkScrollLoop);
