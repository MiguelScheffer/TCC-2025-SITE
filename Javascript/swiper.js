
const swiperThumbs = new Swiper(".swiper-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});


const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },

  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  simulateTouch: true,
  grabCursor: true,

  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },

  thumbs: {
    swiper: swiperThumbs,
  },
});
