const slider = document.querySelector(".slider");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    
    let index = 0;
    
    nextButton.addEventListener("click", () => {
        index++;
        if (index >= slider.children.length) {
            index = 0;
        }
        updateSlider();
    });
    
    prevButton.addEventListener("click", () => {
        index--;
        if (index < 0) {
            index = slider.children.length - 1;
        }
        updateSlider();
    });
    
    function updateSlider() {
        const offset = -index * 500; // Assuming each image has a width of 500px
        slider.style.transform = `translateX(${offset}px)`;
    }