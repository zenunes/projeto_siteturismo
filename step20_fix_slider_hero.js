const fs = require('fs');

const jsPath = 'js/modules/sliderHero.js';

if (fs.existsSync(jsPath)) {
    const jsCode = `export function initSliderHero() {
    const slideItems = document.querySelectorAll('.slide--item');
    if (slideItems.length === 0) return;

    let totalslide = slideItems.length;
    let currentSlide = 0;
    let sliderWidth = document.querySelector('.slider--width');
    
    // Instead of using calc(100vw * totalslide) which breaks on scrollbars,
    // we set it dynamically based on the parent container's width.
    function updateSliderContainer() {
        const viewportWidth = document.querySelector('.sliders').clientWidth;
        if(sliderWidth) {
            sliderWidth.style.width = \`\${viewportWidth * totalslide}px\`;
        }
        slideItems.forEach(item => {
            item.style.width = \`\${viewportWidth}px\`;
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
        const viewportWidth = document.querySelector('.sliders').clientWidth;
        let newMargin = (currentSlide * viewportWidth);
        if(sliderWidth) sliderWidth.style.transform = \`translateX(-\${newMargin}px)\`;
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

    // Fix resize bug robustly
    window.addEventListener('resize', () => {
        updateSliderContainer();
        updateMargin();
    });

}
`;
    fs.writeFileSync(jsPath, jsCode);
}

// Update CSS to handle transform
const cssPath = 'assets/style.css';
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf-8');
    
    // The width of .slide--item shouldn't be forced to 100vw in CSS if JS handles it,
    // but we can leave it as fallback. What we must fix is the horizontal scrollbar issue.
    if (!css.includes('overflow-x: hidden;')) {
        css = css.replace(/\.sliders\s*\{/, '.sliders {\n    overflow-x: hidden;\n    max-width: 100vw;');
    }
    
    fs.writeFileSync(cssPath, css);
}

