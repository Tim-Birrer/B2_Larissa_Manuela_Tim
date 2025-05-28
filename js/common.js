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
