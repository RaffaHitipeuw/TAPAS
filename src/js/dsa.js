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
