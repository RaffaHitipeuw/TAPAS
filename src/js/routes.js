document.querySelectorAll("li.sticky").forEach((card) => {
  const img = card.querySelector("img");
  const header = card.querySelector("h1");


  ScrollTrigger.create({
    trigger: card,
    scroller: "[data-scroll-container]",
    start: "top top",
    end: () => "+=" + card.offsetHeight,
    pin: true,
    pinSpacing: false,
    scrub: true
  });

  gsap.to(img, {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      scroller: "[data-scroll-container]",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Parallax header / title
  gsap.to(header, {
    y: -15,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      scroller: "[data-scroll-container]",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});


