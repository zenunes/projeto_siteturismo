export function initSliderHero() {
    const slideItems = document.querySelectorAll('.slide--item');
    if (slideItems.length === 0) return;

    let totalslide = slideItems.length;
    let currentSlide = 0;
    let sliderWidth = document.querySelector('.slider--width');
    
    // Set container width to 100% * totalslide
    function updateSliderContainer() {
        if(sliderWidth) {
            sliderWidth.style.width = `calc(100% * ${totalslide})`;
        }
        slideItems.forEach(item => {
            item.style.width = `calc(100% / ${totalslide})`;
        });
    }
    updateSliderContainer();

    let indicatorsContainer = document.querySelector('.slider-indicators');
    if (indicatorsContainer) {
        for (let i = 0; i < totalslide; i++) {
            let indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i == 0) indicator.classList.add('active');
            indicator.addEventListener('click', function () { goToSlide(i); });
            indicatorsContainer.appendChild(indicator);
        }
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateMargin();
        updateIndicators();
    }

    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function goPrev() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = totalslide - 1;
        updateMargin();
        updateIndicators();
    }

    function goNext() {
        currentSlide++;
        if (currentSlide > (totalslide - 1)) currentSlide = 0;
        updateMargin();
        updateIndicators();
    }

    function updateMargin() {
        // We translate by a percentage of the container's width.
        // If totalslide is 4, moving 1 slide is moving 1/4 of the container = 25%.
        // The formula is: currentSlide * (100 / totalslide) %
        let percentage = currentSlide * (100 / totalslide);
        if(sliderWidth) sliderWidth.style.transform = `translateX(-${percentage}%)`;
        if(sliderWidth) sliderWidth.style.marginLeft = '0'; // reset old logic
    }

    const controls = document.querySelectorAll('.slider-controls .slide-control');
    if (controls.length >= 2) {
        controls[0].addEventListener('click', goPrev);
        controls[1].addEventListener('click', goNext);
    }

    let intervalId = setInterval(goNext, 5000);

    // Stop auto-play on interaction
    if(sliderWidth) {
        sliderWidth.addEventListener('mouseenter', () => clearInterval(intervalId));
        sliderWidth.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
            intervalId = setInterval(goNext, 5000);
        });
    }

}
