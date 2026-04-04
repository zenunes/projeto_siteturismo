const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000');
  const layout = await page.evaluate(() => {
    const header = document.querySelector('header').getBoundingClientRect();
    const sliders = document.querySelector('.sliders').getBoundingClientRect();
    const logo = document.querySelector('.logo').getBoundingClientRect();
    const main = document.querySelector('main').getBoundingClientRect();
    return {
      header: { top: header.top, height: header.height },
      sliders: { top: sliders.top, height: sliders.height },
      logo: { top: logo.top, height: logo.height },
      main: { top: main.top, height: main.height }
    };
  });
  console.log(JSON.stringify(layout, null, 2));
  await browser.close();
})();
