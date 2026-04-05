const fs = require('fs');

const culinariaPath = 'culinaria.html';

if (fs.existsSync(culinariaPath)) {
    let html = fs.readFileSync(culinariaPath, 'utf-8');

    // Mungunza is currently the last card in the grid:
    // <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
    // ...
    // </div>
    // </div>
    // </div>

    // 1. Remove the Mungunza card from the grid
    const mungunzaRegex = /<div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">\s*<img loading="lazy" decoding="async" src="assets\/img_compactado\/casa-vermelha\.jpg" alt="Mungunzá cremoso em tigela">\s*<div class="prato-conteudo">\s*<h3>Mungunzá<\/h3>\s*<p>Doce e reconfortante, o mungunzá é preparado com milho, leite e especiarias, sendo presença garantida em festas juninas e encontros familiares\.<\/p>\s*<p>Mais que sobremesa, o prato carrega lembranças afetivas da infância sertaneja e reforça o valor das receitas transmitidas de geração em geração\.<\/p>\s*<\/div>\s*<\/div>/;
    
    html = html.replace(mungunzaRegex, '');

    // 2. Add the new Mungunza Destaque below the grid
    const newMungunzaDestaque = `
            <!-- Destaque 2 -->
            <div class="card-destaque destaque-invertido" data-aos="fade-up" data-aos-duration="800">
                <div class="destaque-imagem">
                    <span class="badge-destaque" style="background-color: #e74c3c; box-shadow: 0 4px 10px rgba(231, 76, 60, 0.4);">TRADIÇÃO DOCE</span>
                    <img loading="lazy" decoding="async" src="assets/img_compactado/casa-vermelha.jpg" alt="Mungunzá cremoso em tigela">
                </div>
                <div class="destaque-conteudo">
                    <h3>Mungunzá</h3>
                    <p>Doce e reconfortante, o mungunzá é preparado com milho, leite e especiarias, sendo presença garantida em festas juninas e encontros familiares.</p>
                    <p>Mais que sobremesa, o prato carrega lembranças afetivas da infância sertaneja e reforça o valor das receitas transmitidas de geração em geração.</p>
                    <div class="destaque-tags">
                        <span>DOCE</span>
                        <span>JUNINO</span>
                        <span>MEMÓRIA</span>
                    </div>
                </div>
            </div>
    `;
    
    // Find the end of grid-pratos and insert it right after
    html = html.replace(/<\/div>\s*<\/div>\s*<section data-aos="fade-up" data-aos-duration="800" class="galeria">/, `</div>\n${newMungunzaDestaque}\n        </div>\n\n<section data-aos="fade-up" data-aos-duration="800" class="galeria">`);
    
    fs.writeFileSync(culinariaPath, html);
}

const cssPath = 'assets/secundaria.css';
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf-8');
    
    const invertRule = `
/* Destaque Invertido (Imagem na direita) */
.card-destaque.destaque-invertido {
    flex-direction: row-reverse;
}
`;
    if(!css.includes('.card-destaque.destaque-invertido')) {
        css = css.replace(/\/\* Grid Pratos \*\//, `${invertRule}\n/* Grid Pratos */`);
        fs.writeFileSync(cssPath, css);
    }
}
