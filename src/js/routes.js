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
  { label: "HOME", href: "index.html" },
  { label: "ABOUT", href: "about.html" },
  { label: "ROUTES", href: "routes.html" },
  { label: "CONTACT", href: "contact.html" },
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

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded - initializing sliders");

  // bikin fungsi biar reusable
  function initSlider(bikeId, circleId, hoursId, costId, trackId) {
    const bike = document.getElementById(bikeId);
    const circle = document.getElementById(circleId);
    const hoursDisplay = document.getElementById(hoursId);
    const costDisplay = document.getElementById(costId);
    const track = document.getElementById(trackId);

    if (!bike || !circle || !hoursDisplay || !costDisplay || !track) {
      console.warn(`Skipping slider for ${trackId}, element(s) missing.`);
      return;
    }

    const maxHours = 10;
    const pricePerHour = 6000;
    let isDragging = false;

    function initializeSlider() {
      const trackWidth = track.offsetWidth;
      const circleWidth = circle.offsetWidth;
      if (trackWidth === 0) return;
      const initialPosition = (trackWidth - circleWidth) * 0.4;
      circle.style.left = initialPosition + "px";
      updateBikePosition(initialPosition);
      updateDisplay(initialPosition, trackWidth, circleWidth);
    }

    function updateBikePosition(circlePosition) {
      const circleWidth = circle.offsetWidth;
      const bikeWidth = bike.offsetWidth;
      bike.style.left = circlePosition + circleWidth / 2 - bikeWidth / 2 + "px";
    }

    function updateDisplay(circlePosition, trackWidth, circleWidth) {
      const availableWidth = trackWidth - circleWidth;
      const ratio = circlePosition / availableWidth;
      const hours = Math.min(
        maxHours,
        Math.max(0, Math.round(ratio * maxHours))
      );
      const totalCost = hours * pricePerHour;
      hoursDisplay.textContent = hours;
      costDisplay.textContent = totalCost.toLocaleString("id-ID");
    }

    function startDrag(e) {
      isDragging = true;
      circle.style.cursor = "grabbing";
      e.preventDefault();
    }

    function stopDrag() {
      isDragging = false;
      circle.style.cursor = "grab";
    }

    function doDrag(e) {
      if (!isDragging) return;
      const trackRect = track.getBoundingClientRect();
      const trackWidth = trackRect.width;
      const circleWidth = circle.offsetWidth;
      let clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      let newPosition = clientX - trackRect.left - circleWidth / 2;
      newPosition = Math.max(
        0,
        Math.min(newPosition, trackWidth - circleWidth)
      );
      circle.style.left = newPosition + "px";
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackWidth, circleWidth);
    }

    circle.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
    circle.addEventListener("touchstart", startDrag);
    window.addEventListener("touchmove", doDrag);
    window.addEventListener("touchend", stopDrag);

    track.addEventListener("mousedown", function (e) {
      const trackRect = track.getBoundingClientRect();
      const circleWidth = circle.offsetWidth;
      let newPosition = e.clientX - trackRect.left - circleWidth / 2;
      newPosition = Math.max(
        0,
        Math.min(newPosition, trackRect.width - circleWidth)
      );
      circle.style.left = newPosition + "px";
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackRect.width, circleWidth);
    });

    track.addEventListener("touchstart", function (e) {
      const trackRect = track.getBoundingClientRect();
      const circleWidth = circle.offsetWidth;
      let newPosition = e.touches[0].clientX - trackRect.left - circleWidth / 2;
      newPosition = Math.max(
        0,
        Math.min(newPosition, trackRect.width - circleWidth)
      );
      circle.style.left = newPosition + "px";
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackRect.width, circleWidth);
    });

    setTimeout(initializeSlider, 100);
    window.addEventListener("resize", initializeSlider);
  }

  // panggil dua versi
  initSlider(
    "bike-mobile",
    "circle-mobile",
    "hours-mobile",
    "cost-mobile",
    "track-mobile"
  );
  initSlider(
    "bike-tablet",
    "circle-tablet",
    "hours-tablet",
    "cost-tablet",
    "track-tablet"
  );
});

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - initializing slider');
  
  const bike = document.getElementById('bike');
  const circle = document.getElementById('circle');
  const hoursDisplay = document.getElementById('hours');
  const costDisplay = document.getElementById('cost');
  const track = document.getElementById('track');

  const maxHours = 10;
  const pricePerHour = 6000;
  let isDragging = false;

  function initializeSlider() {
    console.log('Initializing slider position');
    const trackWidth = track.offsetWidth;
    const circleWidth = circle.offsetWidth;
    const initialPosition = (trackWidth - circleWidth) * 0.4;
    
    circle.style.left = initialPosition + 'px';
    updateBikePosition(initialPosition);
    updateDisplay(initialPosition, trackWidth, circleWidth);
  }

  function updateBikePosition(circlePosition) {
    const circleWidth = circle.offsetWidth;
    const bikeWidth = bike.offsetWidth;
    bike.style.left = (circlePosition + circleWidth / 2 - bikeWidth / 2) + 'px';
  }

  function updateDisplay(circlePosition, trackWidth, circleWidth) {
    const availableWidth = trackWidth - circleWidth;
    const ratio = circlePosition / availableWidth;
    const hours = Math.min(maxHours, Math.max(0, Math.round(ratio * maxHours)));
    const totalCost = hours * pricePerHour;
    
    hoursDisplay.textContent = hours;
    costDisplay.textContent = totalCost.toLocaleString('id-ID');
  }

  function startDrag(e) {
    isDragging = true;
    circle.style.cursor = 'grabbing';
    e.preventDefault();
  }

  function stopDrag() {
    isDragging = false;
    circle.style.cursor = 'grab';
  }

  function doDrag(e) {
    if (!isDragging) return;
    
    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const circleWidth = circle.offsetWidth;
    
    let clientX;
    if (e.type.includes('touch')) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    let newPosition = clientX - trackRect.left - (circleWidth / 2);
    newPosition = Math.max(0, Math.min(newPosition, trackWidth - circleWidth));
    
    // Update circle position
    circle.style.left = newPosition + 'px';
    
    updateBikePosition(newPosition);
    
    updateDisplay(newPosition, trackWidth, circleWidth);
  }

  circle.addEventListener('mousedown', startDrag);
  
  track.addEventListener('mousedown', function (e) {
    const trackRect = track.getBoundingClientRect();
    const circleWidth = circle.offsetWidth;
    let newPosition = e.clientX - trackRect.left - (circleWidth / 2);
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width - circleWidth));
    
    circle.style.left = newPosition + 'px';
    updateBikePosition(newPosition);
    updateDisplay(newPosition, trackRect.width, circleWidth);
  });

  window.addEventListener('mousemove', doDrag);
  window.addEventListener('mouseup', stopDrag);

  circle.addEventListener('touchstart', startDrag);
  
  track.addEventListener('touchstart', function (e) {
    const trackRect = track.getBoundingClientRect();
    const circleWidth = circle.offsetWidth;
    let newPosition = e.touches[0].clientX - trackRect.left - (circleWidth / 2);
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width - circleWidth));
    
    circle.style.left = newPosition + 'px';
    updateBikePosition(newPosition);
    updateDisplay(newPosition, trackRect.width, circleWidth);
  });

  window.addEventListener('touchmove', doDrag);
  window.addEventListener('touchend', stopDrag);

  setTimeout(initializeSlider, 100);

  window.addEventListener('resize', initializeSlider);
});
