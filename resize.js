const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 800 });
    await page.goto('http://localhost:8000/galeria.html', { waitUntil: 'networkidle0' });
    await page.screenshot({path: '900px.png'});
    await browser.close();
})();
