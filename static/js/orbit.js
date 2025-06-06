const orbitContainer = document.querySelector('.orbit-container');
const planets = document.querySelectorAll('.planet');

const radius = 150;
const centerX = orbitContainer.clientWidth / 2;
const centerY = orbitContainer.clientHeight / 2;
const numPlanets = planets.length;

const speed = 0.05;

let startTime = null;
let paused = false;
let pausedAt = 0;
let pauseStartTime = 0;

function animate(time) {
  if (!startTime) startTime = time;

  let elapsed;
  if (paused) {
    elapsed = pausedAt;
  } else {
    elapsed = (time - startTime) / 1000;
  }

  planets.forEach((planet, i) => {
    const angle = (elapsed * speed * 2 * Math.PI) + (i * (2 * Math.PI / numPlanets));
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    planet.style.left = `${x}px`;
    planet.style.top = `${y}px`;

    const text = planet.querySelector('.planet-text');
    if (text) {
      text.style.transform = `rotate(0deg)`;
    }
  });

  requestAnimationFrame(animate);
}

planets.forEach((planet) => {
  planet.addEventListener('mouseenter', () => {
    paused = true;
    pauseStartTime = performance.now();
    pausedAt = ((performance.now() - startTime) / 1000);
    planet.style.transform = 'scale(1.3)';
    planet.style.zIndex = '10';
  });

  planet.addEventListener('mouseleave', () => {
    paused = false;
    // Shift startTime forward by pause duration
    startTime += performance.now() - pauseStartTime;
    planet.style.transform = 'scale(1)';
    planet.style.zIndex = '3';
  });
});

requestAnimationFrame(animate);
