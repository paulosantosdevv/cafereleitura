import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // ── Header scroll effect ────────────────────────────────────────────────────
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── Hamburger Menu Toggle ───────────────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  if (hamburger && mobileNav) {
    const openMenu = () => {
      hamburger.classList.add('open');
      mobileNav.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      // Anima os links entrando em cascata
      gsap.fromTo(mobileLinks,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.15 }
      );
    };

    const closeMenu = () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) closeMenu();
      else openMenu();
    });

    // Fecha ao clicar em qualquer link do menu
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Fade in, slide up & blur para títulos de seção
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        }
      }
    );
  });

  // Fade in, slide up & blur para descrições de seção
  gsap.utils.toArray('.section-desc').forEach(desc => {
    gsap.fromTo(desc, 
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2,
        delay: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: desc,
          start: "top 85%",
        }
      }
    );
  });

  // Fade in, slide up & blur para cards de serviço (com stagger natural do ScrollTrigger)
  gsap.fromTo('.service-card', 
    { opacity: 0, y: 50, filter: 'blur(10px)' },
    {
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.services-grid',
        start: "top 80%",
      }
    }
  );

  // Fade in, slide up & blur para cards do blog
  gsap.fromTo('.blog-card', 
    { opacity: 0, y: 50, filter: 'blur(10px)' },
    {
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.blog-grid',
        start: "top 80%",
      }
    }
  );

  // Animando a entrada da imagem da agência
  const officeImg = document.querySelector('.office-img-placeholder, .autoridade-img img');
  if (officeImg) {
    gsap.fromTo(officeImg,
      { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: officeImg,
          start: "top 80%",
        }
      }
    );
  }

  // Ripple effect simulado para o botão CTA
  const rippleBtns = document.querySelectorAll('.ripple-btn');
  rippleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ─── SEÇÃO DA XÍCARA SVG + FUMAÇA ───────────────────────────────────────────
  const cupContainer = document.getElementById('cup-container');
  const cupSvg       = document.getElementById('coffee-cup-svg');
  const smokeCanvas  = document.getElementById('smoke-canvas');
  const wordDisplay  = document.getElementById('smoke-word-display');

  if (cupContainer && cupSvg && smokeCanvas && wordDisplay) {
    const words = ["Modernidade", "Marketing", "Resultados", "Desempenho"];
    let wordIndex  = 0;
    let activeWord = null;

    // ── Tilt 3D do SVG no mouse ────────────────────────────────────────────────
    cupContainer.addEventListener('mousemove', (e) => {
      const rect = cupContainer.getBoundingClientRect();
      const xN = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2); // -1 … 1
      const yN = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      gsap.to(cupSvg, {
        rotationY:  xN * 18,
        rotationX: -yN * 12,
        ease: "power2.out",
        duration: 0.6,
        transformPerspective: 800
      });
    });

    cupContainer.addEventListener('mouseleave', () => {
      gsap.to(cupSvg, { rotationY: 0, rotationX: 0, ease: "power3.out", duration: 1.2 });
    });

    // ── Canvas de partículas de fumaça (roda em loop) ─────────────────────────
    const ctx = smokeCanvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      smokeCanvas.width  = cupContainer.offsetWidth;
      smokeCanvas.height = cupContainer.offsetHeight;
    }
    resizeCanvas();
    new ResizeObserver(resizeCanvas).observe(cupContainer);

    class SmokeParticle {
      constructor(x, y) {
        this.x    = x + (Math.random() - 0.5) * 30;
        this.y    = y;
        this.vx   = (Math.random() - 0.5) * 0.6;
        this.vy   = -(0.5 + Math.random() * 0.8);
        this.r    = 8 + Math.random() * 18;
        this.life = 1;
        this.decay= 0.005 + Math.random() * 0.005;
        this.hue  = 30 + Math.random() * 20; // golden warm smoke
      }
      update() {
        this.x    += this.vx;
        this.y    += this.vy;
        this.vx   += (Math.random() - 0.5) * 0.08;
        this.r    += 0.3;
        this.life -= this.decay;
      }
      draw() {
        const alpha = Math.max(0, this.life * 0.18);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0, `hsla(${this.hue}, 20%, 85%, ${alpha})`);
        grad.addColorStop(1, `hsla(${this.hue}, 15%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Origem da fumaça — boca da xícara (dentro do canvas)
    function getCupMouthPos() {
      const cRect  = cupContainer.getBoundingClientRect();
      const svgEl  = cupSvg.getBoundingClientRect();
      // centro horizontal do SVG, topo da boca (approx 50% da altura do SVG)
      return {
        x: svgEl.left - cRect.left + svgEl.width  * 0.5,
        y: svgEl.top  - cRect.top  + svgEl.height * 0.48
      };
    }

    let emitting = false;
    let animId;

    function animateSmoke() {
      animId = requestAnimationFrame(animateSmoke);
      ctx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);

      if (emitting) {
        const pos = getCupMouthPos();
        for (let i = 0; i < 3; i++) particles.push(new SmokeParticle(pos.x, pos.y));
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(); });
    }
    animateSmoke();

    // Ligar fumaça passiva quando o mouse entra
    cupContainer.addEventListener('mouseenter', () => { emitting = true; });
    cupContainer.addEventListener('mouseleave', () => { emitting = false; });

    // ── Clique → nova palavra como fumaça ─────────────────────────────────────
    cupContainer.addEventListener('click', () => {
      // Acende fumaça intensa por 1 seg
      emitting = true;
      const pos = getCupMouthPos();
      for (let i = 0; i < 40; i++) particles.push(new SmokeParticle(pos.x, pos.y));
      setTimeout(() => { if (!cupContainer.matches(':hover')) emitting = false; }, 800);

      // Anima tique visual na xícara (pulso de escala)
      gsap.to(cupSvg, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" });

      // Desaparece a palavra anterior como fumaça
      if (activeWord) {
        const old = activeWord;
        gsap.to(old, {
          y: -120,
          opacity: 0,
          filter: 'blur(22px)',
          scale: 1.6,
          duration: 1.8,
          ease: "power1.out",
          onComplete: () => old.remove()
        });
        activeWord = null;
      }

      // Pequeno delay para a nova entrar enquanto a outra sai
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'smoke-word';
        span.textContent = words[wordIndex % words.length];
        wordIndex++;

        wordDisplay.innerHTML = '';
        wordDisplay.appendChild(span);
        activeWord = span;

        // Palavra entra do blur para nítida
        gsap.fromTo(span,
          { opacity: 0, y: 30, filter: 'blur(16px)', scale: 0.7 },
          { opacity: 1, y: 0,  filter: 'blur(0px)',  scale: 1, duration: 1, ease: "power3.out" }
        );
      }, 200);
    });
  }
}
