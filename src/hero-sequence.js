import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroSequence() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // Number of frames
  const frameCount = 118;
  const currentFrame = index => `/imagens hero/img${index + 1}.jpg`;

  const images = [];
  const frames = {
    frame: 0
  };

  // Carregar e armazenar imagens
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  // Define tamanho do canvas assim que a primeira imagem carregar
  images[0].onload = render;

  function render() {
    // Redimensiona o canvas para caber na tela mantendo proporção (cover)
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    const img = images[frames.frame];
    if(!img) return;

    // Calcular "cover"
    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = cw;
      drawHeight = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawHeight) / 2;
    } else {
      drawHeight = ch;
      drawWidth = ch * imgRatio;
      offsetX = (cw - drawWidth) / 2;
      offsetY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Redimensionar canvas quando a janela mudar
  window.addEventListener('resize', render);

  // ScrollTrigger para animar o frame do canvas
  gsap.to(frames, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "+=4000",
      scrub: 0.5,
      pin: true,
      onUpdate: render // re-renderiza o canvas quando o frame atualiza
    }
  });

  // Animação de entrada dos textos do hero (acontece quando carrega a pág)
  gsap.to(".hero-title", {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out"
  });

  gsap.to(".hero-subtitle", {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.2,
    delay: 0.4,
    ease: "power3.out"
  });

  gsap.to(".hero-btn", {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.2,
    delay: 0.6,
    ease: "power3.out"
  });
}
