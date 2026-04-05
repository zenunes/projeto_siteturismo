const fs = require('fs');

// 1. Fix JavaScript
const jsPath = 'js/modules/backToTop.js';
if (fs.existsSync(jsPath)) {
    const jsCode = `export function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
`;
    fs.writeFileSync(jsPath, jsCode);
}

// 2. Fix CSS
const files = ['assets/style.css', 'assets/secundaria.css'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let css = fs.readFileSync(file, 'utf-8');
        
        // Remove the hardcoded display: none that was breaking flex
        css = css.replace(/display:\s*none;\s*\/\*\s*Inicialmente escondido\s*\*\//g, '');
        css = css.replace(/display:\s*none;/g, '');
        
        // Update the main block
        const regex = /#back-to-top\s*{[^}]*}/g;
        css = css.replace(regex, match => {
            return match.replace(/}/, `    position: fixed !important;
    bottom: 3rem !important;
    right: 3rem !important;
    z-index: 9999 !important;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease !important;
    display: flex !important;
}`);
        });

        // Add the .show class
        const showClass = `
#back-to-top.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
`;
        if (!css.includes('#back-to-top.show')) {
            css += showClass;
        }

        fs.writeFileSync(file, css);
    }
});

