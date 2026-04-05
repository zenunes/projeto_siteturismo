const fs = require('fs');
const glob = require('glob');

const cssFiles = glob.sync('assets/**/*.css');

cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix broken relative paths inside CSS
    content = content.replace(/url\('\.\.\/image\//g, "url('image/");
    content = content.replace(/url\(\.\.\/img_compactado\//g, "url('img_compactado/");
    content = content.replace(/url\('\.\.\/img_compactado\//g, "url('img_compactado/");
    content = content.replace(/url\(\.\.\/image\//g, "url('image/");
    
    fs.writeFileSync(file, content);
});

