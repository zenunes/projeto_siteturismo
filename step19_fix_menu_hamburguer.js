const fs = require('fs');

const stylePath = 'assets/style.css';

if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf-8');

    // 1. Hide the hamburger menu by default on desktop
    const hideMenuRegex = /#btn-menu\s*\{[^}]*\}/;
    if (css.match(hideMenuRegex)) {
        css = css.replace(hideMenuRegex, '#btn-menu {\n    display: none;\n    cursor: pointer;\n}');
    } else {
        // If empty or not found properly, force it
        css = css.replace(/#btn-menu\s*\{\s*\}/, '#btn-menu {\n    display: none;\n    cursor: pointer;\n}');
    }

    // Ensure it shows in mobile (under max-width: 768px)
    // The CSS already has #btn-menu { display: block; } in the media query, but let's be sure.

    // 2. Fix the active border on the menu items
    // The issue with the orange bar being disconnected is usually related to the height or padding of the <li> vs <a>.
    // The <a> has height: 100px and border-bottom: 5px. We should ensure the <li> is properly aligned or remove fixed heights.
    
    // Let's refine the menu li a
    css = css.replace(/height:\s*100px;/g, 'height: 100px;\n    box-sizing: border-box;');

    fs.writeFileSync(stylePath, css);
}

