const fs = require('fs');
const glob = require('glob');

// 1. Create directories
fs.mkdirSync('js/modules', { recursive: true });

// 2. Extract Menu Logic
const menuCode = `export function initMenu() {
    const nav = document.getElementById("nav");
    const menuButton = document.getElementById("btn-menu");
    const menuLinks = document.querySelectorAll("#menu li a");
    const overlay = document.getElementById("menu-overlay");

    function closeMenu() {
        if (nav && nav.classList.contains("actived")) nav.classList.remove("actived");
        if (overlay && overlay.classList.contains("active")) overlay.classList.remove("active");
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const currentActive = document.querySelector("#menu li.active");
            if (currentActive) currentActive.classList.remove("active");
            this.parentElement.classList.add("active");
            closeMenu();
        });
    });

    if (menuButton && nav) {
        const toggleMenu = function (event) {
            if (event && event.type === "touchstart") event.preventDefault();
            nav.classList.toggle("actived");
            if (overlay) overlay.classList.toggle("active");
        };
        menuButton.addEventListener("click", toggleMenu);
        menuButton.addEventListener("touchstart", toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
}
`;
fs.writeFileSync('js/modules/menu.js', menuCode);

// 3. Extract BackToTop Logic
const backToTopCode = `export function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
`;
fs.writeFileSync('js/modules/backToTop.js', backToTopCode);

// 4. Extract Hero Slider Logic
const sliderHeroCode = `export function initSliderHero() {
    const slideItems = document.querySelectorAll('.slide--item');
    if (slideItems.length === 0) return;

    let totalslide = slideItems.length;
    let currentSlide = 0;
    let sliderWidth = document.querySelector('.slider--width');
    if(sliderWidth) sliderWidth.style.width = \`calc(100vw * \${totalslide})\`;

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
        if(sWidth) sWidth.style.marginLeft = \`-\${newMargin}px\`;
    }

    const controls = document.querySelectorAll('.slider-controls .slide-control');
    if (controls.length >= 2) {
        controls[0].addEventListener('click', goPrev);
        controls[1].addEventListener('click', goNext);
    }

    setInterval(goNext, 5000);
}
`;
fs.writeFileSync('js/modules/sliderHero.js', sliderHeroCode);

// 5. Extract Gallery Slider Logic
const sliderGalleryCode = `export function initSliderGallery() {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');
    if (!sliderContainer || slidesColetion.length === 0) return;

    let currentIndex = 0;

    function updateContainerWidth() {
        const slideWidth = slidesColetion.length * 260; 
        sliderContainer.style.maxWidth = \`\${slideWidth}px\`;
        
        const controlsContainer = document.querySelector('.slider-controls-colection');
        const slidesColectionWrapper = document.querySelector('.slides--colection');
        if (controlsContainer && slidesColectionWrapper) {
            controlsContainer.style.height = \`\${slidesColectionWrapper.clientHeight}px\`;
        }
    }

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    function updateSlidePosition() {
        sliderContainer.style.transform = \`translateX(-\${currentIndex * 260}px)\`;
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
`;
fs.writeFileSync('js/modules/sliderGallery.js', sliderGalleryCode);

// 6. Create main.js (index)
const mainCode = `import { initMenu } from './modules/menu.js';
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
`;
fs.writeFileSync('js/main.js', mainCode);

// 7. Create secondary.js (other pages)
const secondaryCode = `import { initMenu } from './modules/menu.js';
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
`;
fs.writeFileSync('js/secondary.js', secondaryCode);

// 8. Update HTML files to use the new JS modules
const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Clean old inline onClick events
    content = content.replace(/\bonclick="goPrev\(\)"/g, '');
    content = content.replace(/\bonclick="goNext\(\)"/g, '');
    content = content.replace(/\bonclick="prevSlide\(\)"/g, '');
    content = content.replace(/\bonclick="nextSlide\(\)"/g, '');

    // Replace script imports
    if (file === 'index.html') {
        content = content.replace(/<script src="script\.js"><\/script>/g, '<script type="module" src="/js/main.js"></script>');
        content = content.replace(/<script src="\/script\.js"><\/script>/g, '<script type="module" src="/js/main.js"></script>');
    } else {
        content = content.replace(/<script src="\/secudarioscript\.js"><\/script>/g, '<script type="module" src="/js/secondary.js"></script>');
        content = content.replace(/<script src="secudarioscript\.js"><\/script>/g, '<script type="module" src="/js/secondary.js"></script>');
    }
    
    fs.writeFileSync(file, content);
});

// 9. Delete old massive scripts
if (fs.existsSync('script.js')) fs.unlinkSync('script.js');
if (fs.existsSync('secudarioscript.js')) fs.unlinkSync('secudarioscript.js');
