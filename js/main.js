import { initMenu } from './modules/menu.js';
import { initBackToTop } from './modules/backToTop.js';
import { initSliderHero } from './modules/sliderHero.js';
import { initSliderGallery } from './modules/sliderGallery.js';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initBackToTop();
    initSliderHero();
    initSliderGallery();

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
