const fs = require('fs');

// Fix sliderHero.js
const heroPath = 'js/modules/sliderHero.js';
if (fs.existsSync(heroPath)) {
    let hero = fs.readFileSync(heroPath, 'utf-8');
    // Add resize listener to hero slider to fix margin issue when resizing
    const resizeLogic = `
    // Fix resize bug
    window.addEventListener('resize', updateMargin);
`;
    if (!hero.includes('resize')) {
        hero = hero.replace(/setInterval\(goNext,\s*5000\);/g, 'setInterval(goNext, 5000);\n' + resizeLogic);
        fs.writeFileSync(heroPath, hero);
    }
}

// Fix sliderGallery.js
const galleryPath = 'js/modules/sliderGallery.js';
if (fs.existsSync(galleryPath)) {
    let gallery = fs.readFileSync(galleryPath, 'utf-8');
    
    // Rewrite updateContainerWidth and logic to be dynamic instead of hardcoded 260px and -4
    gallery = gallery.replace(/const slideWidth = slidesColetion\.length \* 260;/g, 'const itemWidth = slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0); const slideWidth = slidesColetion.length * itemWidth;');
    gallery = gallery.replace(/translateX\(-\${currentIndex \* 260}px\)/g, 'translateX(-${currentIndex * (slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0))}px)');
    
    // Calculate max visible slides
    gallery = gallery.replace(/slidesColetion\.length - 4/g, 'Math.max(0, slidesColetion.length - Math.floor(sliderContainer.parentElement.clientWidth / (slidesColetion[0].clientWidth + parseInt(window.getComputedStyle(slidesColetion[0]).marginRight || 0))))');
    
    fs.writeFileSync(galleryPath, gallery);
}
