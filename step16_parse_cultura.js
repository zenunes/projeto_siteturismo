const fs = require('fs');

const path = 'cultura.html';
if (fs.existsSync(path)) {
    const html = fs.readFileSync(path, 'utf-8');
    
    // Find all <section class="secao-cultura"> blocks
    const sectionRegex = /<section[^>]*class="secao-cultura"[\s\S]*?<\/section>/g;
    const sections = [...html.matchAll(sectionRegex)].map(m => m[0]);
    
    const parsedData = sections.map(section => {
        const imgMatch = section.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
        const titleMatch = section.match(/<h3>([^<]+)<\/h3>/);
        const pRegex = /<p>([\s\S]*?)<\/p>/g;
        const paragraphs = [...section.matchAll(pRegex)].map(m => m[1]);
        
        return {
            imgSrc: imgMatch ? imgMatch[1] : '',
            imgAlt: imgMatch ? imgMatch[2] : '',
            title: titleMatch ? titleMatch[1] : '',
            paragraphs: paragraphs
        };
    });

    console.log(JSON.stringify(parsedData, null, 2));
}
