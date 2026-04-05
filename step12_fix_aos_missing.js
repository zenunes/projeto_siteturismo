const fs = require('fs');
const glob = require('glob');

const htmlFiles = glob.sync('**/*.html', { ignore: 'node_modules/**' });

htmlFiles.forEach(file => {
    if (file === 'index.html') return; // index.html already has it
    
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if aos.js is missing
    if (!content.includes('aos.js')) {
        // Insert before <script type="module" src="js/secondary.js"></script>
        content = content.replace(/<script type="module" src="js\/secondary\.js"><\/script>/g, '<script src="vendor/aos/aos.js"></script>\n<script type="module" src="js/secondary.js"></script>');
        
        // Also check if they had a different script tag
        content = content.replace(/<\/body>/g, match => {
            if (!content.includes('aos.js')) {
                return '<script src="vendor/aos/aos.js"></script>\n' + match;
            }
            return match;
        });
        
        fs.writeFileSync(file, content);
    }
});

