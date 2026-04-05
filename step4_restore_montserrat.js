const fs = require('fs');
const glob = require('glob');

const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });

const newFonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    // Remove old font links
    content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>\s*/g, '');
    content = content.replace(/<link[^>]*fonts\.gstatic\.com[^>]*>\s*/g, '');
    
    // Insert new fonts before </head>
    content = content.replace('</head>', newFonts + '\n</head>');
    
    // Add overlay if missing
    if (!content.includes('id="menu-overlay"')) {
        content = content.replace(/<body[^>]*>/i, match => match + '\n    <!-- OVERLAY DO MENU MOBILE -->\n    <div id="menu-overlay" class="menu-overlay"></div>');
    }
    
    fs.writeFileSync(file, content);
});

const stylePath = 'assents/style.css';
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');
    
    // Revert Merriweather to Montserrat
    css = css.replace(/--font-primary:\s*"Merriweather", serif;/g, '--font-primary: "Montserrat", sans-serif;');
    css = css.replace(/--font-primary:\s*"Plus Jakarta Sans", serif;/g, '--font-primary: "Montserrat", sans-serif;'); // Fallback
    
    fs.writeFileSync(stylePath, css);
}

