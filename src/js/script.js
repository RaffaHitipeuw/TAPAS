const overlay = document.getElementById("overlay");
const list = overlay.querySelector(".menu-list");
const btn = document.getElementById("menuBtn");
const items = [
  { label: "HOME", href: "./index.html" },
  { label: "ABOUT", href: "./about.html" },
  { label: "ROUTES", href: "./routes.html" },
  { label: "CONTACT", href: "./contact.html" },
];

let isOpen = false;
const centerX = 90;
const centerY = 13;

let lastScrollY = 0;
let currentX = 0;
let targetX = 0;

// Tambahan fungsi deteksi mobile
function isMobileUserAgent() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

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

// Buat hover circle (cuma untuk desktop)
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

// Hanya tambahkan hoverCircle kalau bukan mobile
if (!isMobileUserAgent()) {
  document.body.appendChild(hoverCircle);

  const menuLinks = document.querySelectorAll(".menu-list a");
  const footerLinks = document.querySelectorAll(
    "#footer-section .footer-links"
  );

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
}

// tombol menu overlay
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

window.addEventListener("resize", () => scroll.update());

const marquee = document.getElementById("marquee");
const marqueeTrack = document.createElement("div");

marqueeTrack.className = "marquee-track inline-flex";
marqueeTrack.innerHTML = marquee.innerHTML + marquee.innerHTML;
marquee.innerHTML = "";
marquee.appendChild(marqueeTrack);

scroll.on("scroll", (obj) => {
  const delta = obj.scroll.y - lastScrollY;
  lastScrollY = obj.scroll.y;
  targetX += delta * 0.6;
});

function animateMarquee() {
  currentX += (targetX - currentX) * 0.1;
  const halfWidth = marqueeTrack.scrollWidth / 2;

  currentX = ((currentX % halfWidth) + halfWidth) % halfWidth;
  targetX = ((targetX % halfWidth) + halfWidth) % halfWidth;

  marqueeTrack.style.transform = `translateX(${-currentX}px)`;
  requestAnimationFrame(animateMarquee);
}
animateMarquee();

// IMAGE SLIDE
const slidesRight = document.querySelectorAll(".image-slide-right");
const slidesLeft = document.querySelectorAll(".image-slide-left");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("image-slide-right")) {
          entry.target.classList.add("translate-x-[40%]");
        } else if (entry.target.classList.contains("image-slide-left")) {
          entry.target.classList.add("translate-x-[-40%]");
        }
      } else {
        entry.target.classList.remove("translate-x-[40%]");
        entry.target.classList.remove("translate-x-[-40%]");
      }
    });
  },
  { threshold: 0.5 }
);

slidesRight.forEach((el) => observer.observe(el));
slidesLeft.forEach((el) => observer.observe(el));

// FADE UP
const fadeUpElements = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up-active");
      } else {
        entry.target.classList.remove("fade-up-active");
      }
    });
  },
  { threshold: 0.5 }
);
fadeUpElements.forEach((el) => fadeObserver.observe(el));

// QUESTION HOVER EFFECT
// ================== DESKTOP LOGIC ==================
if (window.innerWidth >= 1024) {
  const questionLinks = document.querySelectorAll("#question-section h2");

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

  const questionAnswers = {
    1: `<div class="text-center w-full transition-all duration-300 origin-center">
        <p class="text-[#6A8ACB] font-figtree text-sm mb-2">1st Question</p>
        <h3 class="font-fontspringheavy text-[#2E3A59] text-[18px] mb-3">
          What is TAPAS and how does it work?
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
        Are electric bikes effective in reducing traffic congestion?
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
        Are electric bikes safe to use on city roads?
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
        Why should I choose an electric bike over other types of transportation?
      </h3>
      <p class="text-[#6A8ACB] text-[13px] leading-relaxed font-figtree">
         E-bikes are an eco-friendly, cost-effective, and practical transportation option for urban travel. By renting an e-bike, you're supporting a sustainable lifestyle and helping to reduce the negative environmental and traffic impacts of conventional transport.
      </p>
    </div>
  `,
  };

  let qCursorTargetX = 0,
    qCursorTargetY = 0,
    qCursorX = 0,
    qCursorY = 0;

  questionLinks.forEach((q, i) => {
    q.addEventListener("mouseenter", () => {
      const qNum = i + 1;
      questionHover.innerHTML =
        questionAnswers[qNum] ||
        `<p class="text-[#6A8ACB]">No content found.</p>`;
      questionHover.style.transform = "scale(1)";
    });

    q.addEventListener("mouseleave", () => {
      questionHover.style.transform = "scale(0)";
    });
  });

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
}

// ================== MOBILE & TABLET LOGIC (Full Expand) ==================
else {
  const questionButtons = document.querySelectorAll(".questionButton");

  questionButtons.forEach((btn) => {
    const svg = btn.querySelector("svg path");
    svg.style.transition = "transform 0.3s ease";

    if (!btn.parentNode.querySelector(".answer")) {
      const answer = document.createElement("div");
      answer.className =
        "answer max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 ease-in-out text-[#6D94C5] text-sm mt-3 px-3 bg-white rounded-2xl";
      answer.innerHTML =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at vehicula odio, ut convallis justo. Donec at felis sit amet orci placerat malesuada.";
      btn.parentNode.appendChild(answer);
    }

    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.toggle("open");

      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        setTimeout(() => (answer.style.opacity = "1"), 100);
        svg.style.transform = "rotate(180deg)";
      } else {
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
        svg.style.transform = "rotate(0deg)";
      }
    });
  });
}

// Horizontal scroll pakai drag mouse
const rideScroll = document.getElementById("ride-scroll");
let isDown = false;
let startX;
let scrollLeft;

rideScroll.addEventListener("mousedown", (e) => {
  isDown = true;
  rideScroll.classList.add("active");
  startX = e.pageX - rideScroll.offsetLeft;
  scrollLeft = rideScroll.scrollLeft;
});
rideScroll.addEventListener("mouseleave", () => {
  isDown = false;
});
rideScroll.addEventListener("mouseup", () => {
  isDown = false;
});
rideScroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - rideScroll.offsetLeft;
  const walk = (x - startX) * 1.5; // speed
  rideScroll.scrollLeft = scrollLeft - walk;
});

const imgs = document.querySelectorAll(".carousel-img");
const total = imgs.length;
let center = 2;

function updateCarousel() {
  imgs.forEach((img, i) => {
    const offset = (i - center + total) % total;

    img.style.transition = "transform 0.5s ease, opacity 0.5s ease";

    // posisi awal
    if (offset === 0) {
      img.style.transform = "translateX(-50vw) scale(0.8)";
      img.style.opacity = "0.4";
      img.style.zIndex = 1;
    } else if (offset === 1) {
      img.style.transform = "translateX(-30vw) scale(0.9)";
      img.style.opacity = "0.7";
      img.style.zIndex = 3;
    } else if (offset === 2) {
      // tahap 1
      img.style.transform = "translateX(0) scale(0.9)";
      img.style.opacity = "1";
      img.style.zIndex = 10;

      // tahap 2
      setTimeout(() => {
        img.style.transition = "transform 0.4s ease";
        img.style.transform = "translateX(0) scale(1.1)";
      }, 500);
    } else if (offset === 3) {
      img.style.transform = "translateX(30vw) scale(0.9)";
      img.style.opacity = "0.7";
      img.style.zIndex = 3;
    } else if (offset === 4) {
      img.style.transform = "translateX(50vw) scale(0.8)";
      img.style.opacity = "0.4";
      img.style.zIndex = 1;
    }

    img.style.width = "70vw";
    img.style.height = "320px";
  });
}

document.getElementById("next").addEventListener("click", () => {
  center = (center + 1) % total;
  updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
  center = (center - 1 + total) % total;
  updateCarousel();
});

updateCarousel();
