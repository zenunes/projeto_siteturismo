const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('galeria.html', 'utf-8');
const dom = new JSDOM(html, { resources: "usable" });
const window = dom.window;

window.onload = () => {
    const btn = window.document.getElementById('btn-menu');
    console.log(window.getComputedStyle(btn).display);
};
