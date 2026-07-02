import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export function initCarousels() {
  // Array com os nomes dos logos (obtidos da pasta)
  const logos = [
    "10-150x150-2.webp",
    "3-1-150x150-2.webp",
    "Fervidros-logo-white-1024x421.webp",
    "Gio-Estetica-Avancada_LOGO_ALL-WHITE-1024x1024.webp",
    "Group_-1-1-170x68-2.webp",
    "Logo_RR_h_white_Prancheta-1-1024x1024.webp",
    "Logotipos_Tunel-do-Tempo-15-1024x1024.webp",
    "logo-ultra.webp",
    "logo_armanulux_branco.webp",
    "logo_l2c_branco-1024x444.webp",
    "noclick-logo01-1-1024x1024.webp"
  ];

  const wrapper = document.getElementById("parceiros-wrapper");
  if (wrapper) {
    logos.forEach(logo => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `<img src="${import.meta.env.BASE_URL}imagens logo parceiros/${logo}" alt="Parceiro" class="partner-logo">`;
      wrapper.appendChild(slide);
    });
  }

  // Swiper Parceiros (Infinito + Autoplay)
  new Swiper('.swiper-parceiros', {
    modules: [Autoplay],
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 40 },
      768: { slidesPerView: 5, spaceBetween: 50 },
      1024: { slidesPerView: 6, spaceBetween: 60 },
    }
  });

  // Swiper Depoimentos
  new Swiper('.swiper-depoimentos', {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 40 },
      1024: { slidesPerView: 3, spaceBetween: 50 },
    }
  });
}
