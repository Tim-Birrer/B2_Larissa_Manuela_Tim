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
