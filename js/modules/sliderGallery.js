export function initSliderGallery() {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');
    const controls = document.querySelectorAll('.slider-controls-colection .slide-control-colection');
    
    if (!sliderContainer || slidesColetion.length === 0) return;

    function getScrollAmount() {
        const itemWidth = slidesColetion[0].clientWidth;
        const style = window.getComputedStyle(slidesColetion[0]);
        const margin = parseFloat(style.marginRight) || parseFloat(style.marginLeft) || 0;
        const gap = parseFloat(window.getComputedStyle(sliderContainer).gap) || 0;
        return itemWidth + margin + gap;
    }

    function prevSlide() {
        sliderContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }

    function nextSlide() {
        // If we are at the end, scroll back to start
        if (sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 10) {
            sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            sliderContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    }

    if (controls.length >= 2) {
        controls[0].addEventListener('click', prevSlide);
        controls[1].addEventListener('click', nextSlide);
    }

    // Auto scroll setup
    let autoScroll = setInterval(nextSlide, 5000);
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoScroll));
    sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(nextSlide, 5000);
    });
}
