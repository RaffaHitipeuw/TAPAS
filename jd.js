const items = [
  { label: "HOME", href: "#" },
  { label: "CONTACT", href: "#" },
  { label: "ROUTES", href: "#" },
  { label: "ABOUT", href: "#" },
];

const overlay = document.getElementById("overlay");
const list = overlay.querySelector(".menu-list");
const btn = document.getElementById("menuBtn");
let isOpen = false;

// render menu items
items.forEach((item) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.label;
  a.className = `
    block text-white text-[90px] leading-none 
    font-fontspringmedium hover:text-gray-400 
    transition-colors duration-300 
  `;
  li.appendChild(a);
  list.appendChild(li);
});

btn.addEventListener("click", () => {
  isOpen = !isOpen;

  btn.querySelector(".line1").style.transform = isOpen
    ? "translateY(4px) rotate(45deg)"
    : "none";
  btn.querySelector(".line2").style.transform = isOpen
    ? "translateY(-4px) rotate(-45deg)"
    : "none";

if (isOpen) {
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    overlay.style.clipPath = 'circle(150% at 95% 10%)';
  });
} else {
  overlay.style.clipPath = 'circle(0% at 91% 11.5%)';
  overlay.addEventListener(
    'transitionend',
    () => overlay.classList.add('hidden'),
    { once: true }
  );
}

});
