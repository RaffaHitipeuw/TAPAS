document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - initializing sliders');

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
      let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      let newPosition = clientX - trackRect.left - (circleWidth / 2);
      newPosition = Math.max(0, Math.min(newPosition, trackWidth - circleWidth));
      circle.style.left = newPosition + 'px';
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackWidth, circleWidth);
    }

    circle.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);
    circle.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', doDrag);
    window.addEventListener('touchend', stopDrag);

    track.addEventListener('mousedown', function (e) {
      const trackRect = track.getBoundingClientRect();
      const circleWidth = circle.offsetWidth;
      let newPosition = e.clientX - trackRect.left - (circleWidth / 2);
      newPosition = Math.max(0, Math.min(newPosition, trackRect.width - circleWidth));
      circle.style.left = newPosition + 'px';
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackRect.width, circleWidth);
    });

    track.addEventListener('touchstart', function (e) {
      const trackRect = track.getBoundingClientRect();
      const circleWidth = circle.offsetWidth;
      let newPosition = e.touches[0].clientX - trackRect.left - (circleWidth / 2);
      newPosition = Math.max(0, Math.min(newPosition, trackRect.width - circleWidth));
      circle.style.left = newPosition + 'px';
      updateBikePosition(newPosition);
      updateDisplay(newPosition, trackRect.width, circleWidth);
    });

    setTimeout(initializeSlider, 100);
    window.addEventListener('resize', initializeSlider);
  }

  // panggil dua versi
  initSlider('bike-mobile', 'circle-mobile', 'hours-mobile', 'cost-mobile', 'track-mobile');
  initSlider('bike-tablet', 'circle-tablet', 'hours-tablet', 'cost-tablet', 'track-tablet');
});
