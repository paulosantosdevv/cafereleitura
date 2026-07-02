import Lenis from '@studio-freight/lenis';
import { initHeroSequence } from './hero-sequence';
import { initCarousels } from './carousels';
import { initAnimations } from './animations';
import '@splinetool/viewer';
import 'swiper/css/bundle';

// Inicializar Lenis para Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Intercepta GSAP ScrollTrigger para usar o ticker do Lenis
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Executar inicializações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initHeroSequence();
  initCarousels();
  initAnimations();
});
