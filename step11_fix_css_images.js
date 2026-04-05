const fs = require('fs');

const files = ['assets/style.css', 'assets/secundaria.css'];

files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        content = content.replace(/url\('image\/casavermelha\.png'\)/g, "url('img_compactado/casavermelha.png')");
        content = content.replace(/url\('image\/casario\.jpeg'\)/g, "url('img_compactado/casario.jpeg')");
        fs.writeFileSync(file, content);
    }
});
