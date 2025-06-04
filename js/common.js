/* Mobile Navigation */
const openBtn = document.querySelector(".open-nav");
const closeBtn = document.querySelector(".close-nav");
const header = document.querySelector("header");

openBtn.addEventListener("click", () => {
  header.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  header.classList.remove("active");
});

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

if (btnLeft && btnRight && images.length > 0) {
  btnLeft.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  btnRight.addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

  showImage(current); // Initial anzeigen
}

/* Footerhöhe in Variable speichern für Schatten vom Footer-Bild*/
function syncFooterHeightToImageShadow() {
  const footer = document.querySelector("footer");
  const footerHeight = footer.offsetHeight;

  document.documentElement.style.setProperty(
    "--footer-height",
    `${footerHeight}px`
  );
}

window.addEventListener("DOMContentLoaded", syncFooterHeightToImageShadow);
window.addEventListener("resize", syncFooterHeightToImageShadow);
