const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 800 });
    await page.goto('http://localhost:8000/galeria.html', { waitUntil: 'networkidle0' });
    
    const displayBtn = await page.evaluate(() => {
        const el = document.getElementById('btn-menu');
        return el ? window.getComputedStyle(el).display : 'null';
    });
    
    const displayMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return el ? window.getComputedStyle(el).display : 'null';
    });
    
    const visibilityMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return el ? window.getComputedStyle(el).visibility : 'null';
    });
    
    const opacityMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return el ? window.getComputedStyle(el).opacity : 'null';
    });

    console.log('btn-menu display:', displayBtn);
    console.log('menu display:', displayMenu);
    console.log('menu visibility:', visibilityMenu);
    console.log('menu opacity:', opacityMenu);
    
    await browser.close();
})();
