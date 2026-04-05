const fs = require('fs');
const glob = require('glob');

const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Force insert aos.js before js/secondary.js or js/main.js if it doesn't have <script src="vendor/aos/aos.js"></script>
    if (!content.includes('<script src="vendor/aos/aos.js"></script>')) {
        content = content.replace(/<script type="module" src="js\/(main|secondary)\.js"><\/script>/g, '<script src="vendor/aos/aos.js"></script>\n<script type="module" src="js/$1.js"></script>');
        fs.writeFileSync(file, content);
    }
});
