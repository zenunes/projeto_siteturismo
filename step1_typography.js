const fs = require('fs');
const htmlFiles = ['index.html', 'culinaria.html', 'cultura.html', 'galeria.html', 'culinaria-economia-turismo.html', 'culinaria-identidade-cultural.html', 'culinaria-patrimonio-afetivo.html', 'culinaria-roteiro-gastronomico.html', 'evento-feira-cultural.html', 'evento-sao-joao.html', 'evento-vaquejada.html'];

const newFonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">`;

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        // Remove all font links
        content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>\s*/g, '');
        content = content.replace(/<link[^>]*fonts\.gstatic\.com[^>]*>\s*/g, '');
        // Insert new fonts before </head>
        content = content.replace('</head>', newFonts + '\n</head>');
        fs.writeFileSync(file, content);
    }
});

const stylePath = 'assents/style.css';
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');
    
    // Update variables
    css = css.replace(/--font-primary:\s*"Plus Jakarta Sans", serif;/g, '--font-primary: "Merriweather", serif;');
    css = css.replace(/--font-secondary:\s*"Plus Jakarta Sans", serif;/g, '--font-secondary: "Plus Jakarta Sans", sans-serif;');
    css = css.replace(/--font-accent:\s*"Plus Jakarta Sans", serif;/g, '--font-accent: "Plus Jakarta Sans", sans-serif;');
    
    // Set Body font to secondary
    css = css.replace(/body\s*\{[\s\S]*?font-family:\s*var\(--font-primary\);/g, match => match.replace('var(--font-primary)', 'var(--font-secondary)'));
    
    // Add global typography rules at the end
    const typoRules = `
/* =========================================== */
/* GLOBAL TYPOGRAPHY REFINEMENTS               */
/* =========================================== */
h1, h2, h3, .right-title span, .left-title span, .slide-title span, .frase, .section-title {
    font-family: var(--font-primary) !important;
    font-weight: 800;
}
p, .right-desc, .left-desc, .atracao-description, .evento-conteudo p, .texto-introducao {
    font-family: var(--font-secondary) !important;
    line-height: 1.8 !important;
}
`;
    if (!css.includes('GLOBAL TYPOGRAPHY REFINEMENTS')) {
        css += typoRules;
    }
    
    fs.writeFileSync(stylePath, css);
}

