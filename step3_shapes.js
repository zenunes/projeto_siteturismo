const fs = require('fs');
const stylePath = 'assents/style.css';
const secStylePath = 'assents/secundaria.css';

function replaceShadowsAndShapes(css) {
    // Shadows
    css = css.replace(/box-shadow:\s*0\s+4px\s+12px\s+rgba\(0,\s*0,\s*0,\s*0\.18\);/g, 'box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);');
    css = css.replace(/box-shadow:\s*0\s+14px\s+26px\s+rgba\(0,\s*0,\s*0,\s*0\.26\);/g, 'box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);');
    css = css.replace(/box-shadow:\s*0\s+4px\s+8px\s+rgba\(0,\s*0,\s*0,\s*0\.2\);/g, 'box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);');
    css = css.replace(/box-shadow:\s*0\s+6px\s+12px\s+rgba\(0,\s*0,\s*0,\s*0\.3\);/g, 'box-shadow: 0 15px 25px rgba(0, 0, 0, 0.12);');
    css = css.replace(/box-shadow:\s*0\s+4px\s+12px\s+rgba\(0,\s*0,\s*0,\s*0\.1\);/g, 'box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);');
    
    // Borders
    css = css.replace(/border-radius:\s*10px;/g, 'border-radius: 0.8rem;');
    css = css.replace(/border-radius:\s*5px;/g, 'border-radius: 0.8rem;');
    css = css.replace(/border-radius:\s*8px;/g, 'border-radius: 0.8rem;');
    
    return css;
}

if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');
    css = replaceShadowsAndShapes(css);
    
    const hoverRules = `
/* =========================================== */
/* GLOBAL HOVER STATES                         */
/* =========================================== */
.saiba-mais-btn:hover, .atracao-btn:hover, .btn-secundario:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
}
`;
    if (!css.includes('GLOBAL HOVER STATES')) {
        css += hoverRules;
    }
    fs.writeFileSync(stylePath, css);
}

if (fs.existsSync(secStylePath)) {
    let secCss = fs.readFileSync(secStylePath, 'utf-8');
    secCss = replaceShadowsAndShapes(secCss);
    fs.writeFileSync(secStylePath, secCss);
}
