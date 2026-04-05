const fs = require('fs');
const stylePath = 'assents/style.css';
const secStylePath = 'assents/secundaria.css';

if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');
    
    // Default Padding
    css = css.replace(/padding-top:\s*10rem;/g, 'padding-top: 12rem;');
    css = css.replace(/padding-bottom:\s*10rem;/g, 'padding-bottom: 12rem;');

    // Title and Paragraph margins
    const spacingRules = `
/* =========================================== */
/* GLOBAL SPACING & MARGIN REFINEMENTS         */
/* =========================================== */
h1, h2, h3, .right-title span, .left-title span, .slide-title span {
    margin-bottom: 1.6rem !important;
}
p, .right-desc, .left-desc, .atracao-description, .evento-conteudo p, .texto-introducao {
    margin-bottom: 2.4rem !important;
}
.atracao-content {
    padding: 2.4rem !important;
}
`;
    if (!css.includes('GLOBAL SPACING & MARGIN REFINEMENTS')) {
        css += spacingRules;
    }
    fs.writeFileSync(stylePath, css);
}

if (fs.existsSync(secStylePath)) {
    let secCss = fs.readFileSync(secStylePath, 'utf-8');
    // Increase internal paddings on cards
    secCss = secCss.replace(/padding:\s*1\.5rem;/g, 'padding: 2.4rem;');
    secCss = secCss.replace(/padding:\s*20px;/g, 'padding: 3.2rem;');
    fs.writeFileSync(secStylePath, secCss);
}
