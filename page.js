new Swiper(".heroSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 }
  }
});

new Swiper(".teamSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 }
  }
});

new Swiper(".reviewSwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000
  }
});
