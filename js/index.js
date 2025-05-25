/* Image Slider */
const images = document.querySelectorAll(".slider img");
const btnLeft = document.querySelector(".btn.left");
const btnRight = document.querySelector(".btn.right");
let current = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

btnLeft.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

btnRight.addEventListener("click", () => {
  current = (current + 1) % images.length;
  showImage(current);
});
