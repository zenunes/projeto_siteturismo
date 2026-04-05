const fs = require('fs');
const glob = require('glob');

// 1. Fix all "assents" to "assets" globally in HTML, CSS, JS
const allFiles = glob.sync('**/*.{html,css,js}', { ignore: ['node_modules/**', 'step*.js'] });

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Remove BOM
    content = content.replace(/^\uFEFF/gm, "");
    content = content.replace(/^\xEF\xBB\xBF/gm, "");
    
    // Replace any remaining "assents"
    const originalContent = content;
    content = content.replace(/assents\//g, 'assets/');
    content = content.replace(/assents/g, 'assets'); // catch any other rogue instances
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content);
    }
});

