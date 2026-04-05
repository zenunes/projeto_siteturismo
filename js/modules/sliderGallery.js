export function initSliderGallery() {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');
    if (!sliderContainer || slidesColetion.length === 0) return;

    let currentIndex = 0;

    function updateContainerWidth() {
        const slideWidth = slidesColetion.length * 260; 
        sliderContainer.style.maxWidth = `${slideWidth}px`;
        
        const controlsContainer = document.querySelector('.slider-controls-colection');
        const slidesColectionWrapper = document.querySelector('.slides--colection');
        if (controlsContainer && slidesColectionWrapper) {
            controlsContainer.style.height = `${slidesColectionWrapper.clientHeight}px`;
        }
    }

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    function updateSlidePosition() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 260}px)`;
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) currentIndex = slidesColetion.length - 4;
        updateSlidePosition();
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex > slidesColetion.length - 4) currentIndex = 0;
        updateSlidePosition();
    }

    const controls = document.querySelectorAll('.slider-controls-colection .slide-control-colection');
    if (controls.length >= 2) {
        controls[0].addEventListener('click', prevSlide);
        controls[1].addEventListener('click', nextSlide);
    }

    setInterval(nextSlide, 5000);
}
