const fs = require('fs');
const glob = require('glob');
const path = require('path');

// 1. Rename assents -> assets
if (fs.existsSync('assents')) {
    fs.renameSync('assents', 'assets');
}

// 2. Fix HTML files
const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix aria-label
    content = content.replace(/aria-label="Voltar ao topcao"/g, 'aria-label="Voltar ao topo"');
    
    // Fix absolute paths and rename 'assents' to 'assets'
    content = content.replace(/href="\/assents\//g, 'href="assets/');
    content = content.replace(/src="\/assents\//g, 'src="assets/');
    content = content.replace(/url\(\.\/assents\//g, 'url(./assets/');
    
    content = content.replace(/href="assents\//g, 'href="assets/');
    content = content.replace(/src="assents\//g, 'src="assets/');
    
    content = content.replace(/src="\/js\//g, 'src="js/');
    
    fs.writeFileSync(file, content);
});

// 3. Fix CSS files
const cssFiles = glob.sync('assets/**/*.css');
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix 'actived' class
    content = content.replace(/\.actived/g, '.active-menu');
    
    // Fix image paths
    content = content.replace(/url\(\/assents\//g, 'url(../');
    content = content.replace(/url\(\.\/assents\//g, 'url(../');
    content = content.replace(/url\('\.\/img_compactado\//g, 'url(\'../image/'); // adjusting if needed
    
    fs.writeFileSync(file, content);
});

// 4. Fix JS files
const jsFiles = glob.sync('js/**/*.js');
jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix 'actived' class
    content = content.replace(/"actived"/g, '"active-menu"');
    
    fs.writeFileSync(file, content);
});

