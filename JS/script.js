const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = document.querySelectorAll('.carousel img');

let slideIndex = 0;

function changeSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

function showSlide(n) {
  const totalSlides = slides.length;

  if (n < 0) {
    slideIndex = totalSlides - 1;
  } else if (n >= totalSlides) {
    slideIndex = 0;
  }

  carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
}
//Cambiar de imagen el carrousel
setInterval(function() {
    changeSlide(1);
  }, 5000);

showSlide(slideIndex);
