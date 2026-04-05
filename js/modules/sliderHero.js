export function initSliderHero() {
    const slideItems = document.querySelectorAll('.slide--item');
    if (slideItems.length === 0) return;

    let totalslide = slideItems.length;
    let currentSlide = 0;
    let sliderWidth = document.querySelector('.slider--width');
    if(sliderWidth) sliderWidth.style.width = `calc(100vw * ${totalslide})`;

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
        let slideItem = document.querySelector('.slide--item');
        if(!slideItem) return;
        let sliderItemWidth = slideItem.clientWidth;
        let newMargin = (currentSlide * sliderItemWidth);
        let sWidth = document.querySelector('.slider--width');
        if(sWidth) sWidth.style.marginLeft = `-${newMargin}px`;
    }

    const controls = document.querySelectorAll('.slider-controls .slide-control');
    if (controls.length >= 2) {
        controls[0].addEventListener('click', goPrev);
        controls[1].addEventListener('click', goNext);
    }

    setInterval(goNext, 5000);
}
