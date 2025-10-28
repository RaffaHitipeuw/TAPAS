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
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
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
// Button Scrollto

const btnReport = document.querySelectorAll("#reportSection button");

btnReport.forEach((btn) => {
  btn.addEventListener("click", () => {
    scroll.scrollTo("#contactSection");
  });
});

const imgClick = () => {
  window.location.href = "../index.html";
};

const reportClick = () => {
  scroll.scrollTo("#contactSection");
}
