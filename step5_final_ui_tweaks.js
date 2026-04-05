const fs = require('fs');
const glob = require('glob');

// 1. Standardize AOS Animations
const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Remove old data-aos attributes completely to avoid conflicts
    content = content.replace(/data-aos="[^"]*"/g, '');
    content = content.replace(/data-aos-(delay|duration|offset)="[^"]*"/g, '');
    
    // Inject standard fade-up on sections that used to have them or specific classes
    // A simpler way: Find <section class="default" and <section class="default-2" and <section class="eventos" 
    // and add the attributes if they don't have it
    content = content.replace(/<section(?![^>]*data-aos)/g, '<section data-aos="fade-up" data-aos-duration="800"');
    
    // Clean up multiple spaces
    content = content.replace(/\s{2,}/g, ' ');
    
    fs.writeFileSync(file, content);
});

// 2. Adjust CSS for Hierarchy and Padding
const stylePath = 'assents/style.css';
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');
    const finalTweaks = `
/* =========================================== */
/* FINAL HIERARCHY & COMPONENT PADDING         */
/* =========================================== */
.evento-conteudo { 
    padding: 3.2rem !important; 
}
.right-title span, .left-title span, .section-title, .hero2 h1 {
    font-size: clamp(3.6rem, 5vw, 5.2rem) !important;
    line-height: 1.2 !important;
    font-family: var(--font-primary) !important;
}
.hero2 p {
    font-size: clamp(1.8rem, 2.5vw, 2.2rem) !important;
}
`;
    if (!css.includes('FINAL HIERARCHY & COMPONENT PADDING')) {
        css += finalTweaks;
    }
    fs.writeFileSync(stylePath, css);
}
