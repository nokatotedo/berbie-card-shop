
const slider = document.querySelector(".slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
    
let index = 0;
    
nextButton.addEventListener("click", () => {
  index++;
  if (index >= slider.children.length - 2) {
    index = 0;
  }
  updateSlider();
});
    
prevButton.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = slider.children.length - 3;
  }
  updateSlider();
});
  
function updateSlider() {
  const offset = -index * 400;
  slider.style.transform = `translateX(${offset}px)`;
}