const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 800 });
    await page.goto('http://localhost:8000/galeria.html', { waitUntil: 'networkidle0' });
    
    const displayBtn = await page.evaluate(() => {
        const el = document.getElementById('btn-menu');
        return window.getComputedStyle(el).display;
    });
    
    const displayMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return window.getComputedStyle(el).display;
    });
    
    const visibilityMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return window.getComputedStyle(el).visibility;
    });
    
    const heightMenu = await page.evaluate(() => {
        const el = document.getElementById('menu');
        return window.getComputedStyle(el).height;
    });

    const displayNavUl = await page.evaluate(() => {
        const el = document.querySelector('.menu ul');
        return window.getComputedStyle(el).display;
    });
    
    console.log('btn-menu display:', displayBtn);
    console.log('menu display:', displayMenu);
    console.log('menu visibility:', visibilityMenu);
    console.log('menu height:', heightMenu);
    console.log('.menu ul display:', displayNavUl);
    
    await browser.close();
})();
