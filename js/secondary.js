import { initMenu } from './modules/menu.js';
import { initBackToTop } from './modules/backToTop.js';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initBackToTop();

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
