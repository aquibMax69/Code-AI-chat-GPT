const character = document.querySelector('.character');
const cards = document.querySelectorAll('.info-card');
const scrollButton = document.querySelector('.scroll-indicator');

let latestScroll = 0;
let ticking = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const setTransforms = () => {
  const scrollY = latestScroll;
  const heroOffset = Math.min(scrollY, window.innerHeight * 1.2);
  const characterLift = heroOffset * 0.15;

  if (character) {
    character.style.transform = `translate(-50%, calc(-50% - ${characterLift}px))`;
  }

  cards.forEach((card, index) => {
    const floatOffset = -30 - index * 6;
    const progressBase = clamp(scrollY / (window.innerHeight * 0.95), 0, 1);
    const delay = index * 0.08;
    const localProgress = clamp((progressBase - delay) / (1 - delay), 0, 1);
    const eased = easeOutCubic(localProgress);
    const sink = eased * 140;
    const scale = 1.04 - eased * 0.04;
    const opacity = 0.78 + eased * 0.22;

    card.style.setProperty('--card-float', `${floatOffset}px`);
    card.style.setProperty('--card-sink', `${sink}px`);
    card.style.setProperty('--card-scale', scale.toFixed(3));
    card.style.setProperty('--card-opacity', opacity.toFixed(3));
  });

  ticking = false;
};

const onScroll = () => {
  latestScroll = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(setTransforms);
    ticking = true;
  }
};

const onScrollButtonClick = () => {
  const nextSection = document.querySelector('.next-section');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
  latestScroll = window.scrollY;
  setTransforms();
});

if (scrollButton) {
  scrollButton.addEventListener('click', onScrollButtonClick);
}
