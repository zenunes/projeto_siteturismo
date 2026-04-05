export function initSliderGallery() {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');
    if (!sliderContainer || slidesColetion.length === 0) return;

    let currentIndex = 0;

    function updateContainerWidth() {
        const itemWidth = slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0); const slideWidth = slidesColetion.length * itemWidth; 
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
        sliderContainer.style.transform = `translateX(-${currentIndex * (slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0))}px)`;
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) currentIndex = Math.max(0, slidesColetion.length - Math.floor(sliderContainer.parentElement.clientWidth / (slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0))));
        updateSlidePosition();
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex > Math.max(0, slidesColetion.length - Math.floor(sliderContainer.parentElement.clientWidth / (slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0))))) currentIndex = 0;
        updateSlidePosition();
    }

    const controls = document.querySelectorAll('.slider-controls-colection .slide-control-colection');
    if (controls.length >= 2) {
        controls[0].addEventListener('click', prevSlide);
        controls[1].addEventListener('click', nextSlide);
    }

    setInterval(nextSlide, 5000);
}
