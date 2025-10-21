    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.08,
    });

    window.addEventListener("resize", () => scroll.update());