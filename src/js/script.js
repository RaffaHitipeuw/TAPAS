const overlay = document.getElementById("overlay");
const list = overlay.querySelector(".menu-list");
const btn = document.getElementById("menuBtn");
const marquee = document.getElementById("marquee");
const track = document.createElement("div");

const items = [
  { label: "HOME", href: "#" },
  { label: "CONTACT", href: "#" },
  { label: "ROUTES", href: "#" },
  { label: "ABOUT", href: "#" },
];

let isOpen = false;
const centerX = 90;
const centerY = 13;

track.className = "marquee-track inline-flex";
track.innerHTML = marquee.innerHTML + marquee.innerHTML;
marquee.innerHTML = "";
marquee.appendChild(track);

let lastScrollY = 0;
let currentX = 0;
let targetX = 0;

items.forEach((item) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.label;
  a.className =
    "block font-fontspringheavy text-white text-[90px] leading-none font-bold hover:text-gray-400 transition-colors duration-300";
  li.appendChild(a);
  list.appendChild(li);
});

// tombol aman
btn.addEventListener("click", () => {
  isOpen = !isOpen;
  btn.querySelector(".line1").classList.toggle("rotate-45", isOpen);
  btn.querySelector(".line1").classList.toggle("translate-y-[4px]", isOpen);
  btn.querySelector(".line2").classList.toggle("-rotate-45", isOpen);
  btn.querySelector(".line2").classList.toggle("-translate-y-[4px]", isOpen);

  if (isOpen) {
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
        }
      },
      { once: true }
    );
  }
});


const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.08,
});


window.addEventListener("resize", () => scroll.update());

scroll.on("scroll", (obj) => {
  const delta = obj.scroll.y - lastScrollY;
  lastScrollY = obj.scroll.y;
  targetX += delta * 0.6;
});

function animate() {
  currentX += (targetX - currentX) * 0.1;
  const halfWidth = track.scrollWidth / 2;
  if (currentX > halfWidth) {
    currentX -= halfWidth;
    targetX -= halfWidth;
  }
  track.style.transform = `translateX(${-currentX}px)`;
  requestAnimationFrame(animate);
}
animate();


