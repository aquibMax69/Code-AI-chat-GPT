const character = document.querySelector('.character');
const cards = document.querySelectorAll('.info-card');
const scrollButton = document.querySelector('.scroll-indicator');

let latestScroll = 0;
let ticking = false;

const setTransforms = () => {
  const scrollY = latestScroll;
  const heroOffset = Math.min(scrollY, window.innerHeight * 1.2);
  const characterLift = heroOffset * 0.15;

  if (character) {
    character.style.transform = `translate(-50%, calc(-50% - ${characterLift}px))`;
  }

  cards.forEach((card, index) => {
    const floatOffset = -30 - index * 6;
    const sink = heroOffset * 0.22;
    card.style.transform = `translateY(${floatOffset + sink}px)`;
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
