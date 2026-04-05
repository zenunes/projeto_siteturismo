const fs = require('fs');

const culinariaPath = 'culinaria.html';
const cssPath = 'assets/secundaria.css';

if (fs.existsSync(culinariaPath)) {
    let html = fs.readFileSync(culinariaPath, 'utf-8');

    // Extract the content from <p class="texto-introducao"> to <section ... class="galeria">
    const introRegex = /<p class="texto-introducao">[\s\S]*?<\/p>/;
    const galeriaRegex = /<section[^>]*class="galeria"/;
    
    const introMatch = html.match(introRegex);
    const galeriaMatch = html.match(galeriaRegex);
    
    if (introMatch && galeriaMatch) {
        const startIndex = introMatch.index + introMatch[0].length;
        const endIndex = galeriaMatch.index;
        
        const newLayout = `
        <div class="culinaria-layout-novo">
            <!-- Destaque -->
            <div class="card-destaque" data-aos="fade-up" data-aos-duration="800">
                <div class="destaque-imagem">
                    <span class="badge-destaque">DESTAQUE</span>
                    <img loading="lazy" decoding="async" src="assets/img_compactado/comida.jpg" alt="Bode assado servido com acompanhamentos regionais">
                </div>
                <div class="destaque-conteudo">
                    <h3>Bode Assado</h3>
                    <p>Ícone da culinária sertaneja, o bode assado é preparado com temperos fortes, marinada cuidadosa e cozimento lento, resultando em carne macia e sabor profundo.</p>
                    <p>Em reuniões de família e festas locais, o prato costuma ser servido com arroz, macaxeira ou farofa, representando a tradição de acolher bem quem chega ao sertão.</p>
                    <div class="destaque-tags">
                        <span>ASSADO</span>
                        <span>FESTIVO</span>
                        <span>CAATINGA</span>
                    </div>
                </div>
            </div>

            <!-- Grid -->
            <div class="grid-pratos">
                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/fazenda.jpg" alt="Carne de sol com mandioca">
                    <div class="prato-conteudo">
                        <h3>Carne de Sol</h3>
                        <p>Presente nos cardápios da região, a carne de sol é uma técnica tradicional de conservação que se transformou em patrimônio gastronômico nordestino.</p>
                        <p>Servida na chapa ou desfiada, ganha destaque ao lado da mandioca cozida, feijão verde e manteiga de garrafa, em combinações que conquistam moradores e visitantes.</p>
                    </div>
                </div>
                
                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/caatinga.jpg" alt="Baião de dois com queijo coalho">
                    <div class="prato-conteudo">
                        <h3>Baião de Dois</h3>
                        <p>Clássico das cozinhas nordestinas, o baião de dois combina arroz e feijão em uma receita nutritiva, colorida e cheia de personalidade.</p>
                        <p>Com toques de queijo coalho, coentro e carnes regionais, é uma opção que resume o sabor do sertão em cada garfada.</p>
                    </div>
                </div>

                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/slide2.jpg" alt="Feijão tropeiro com farinha e temperos">
                    <div class="prato-conteudo">
                        <h3>Feijão Tropeiro</h3>
                        <p>De origem popular e preparo robusto, o feijão tropeiro é um prato que combina feijão, farinha, ovos e temperos, oferecendo energia para o dia a dia sertanejo.</p>
                        <p>Na culinária de Floresta, ele aparece em almoços tradicionais e eventos comunitários, sempre ligado ao sentimento de partilha.</p>
                    </div>
                </div>

                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/casa-vermelha.jpg" alt="Mungunzá cremoso em tigela">
                    <div class="prato-conteudo">
                        <h3>Mungunzá</h3>
                        <p>Doce e reconfortante, o mungunzá é preparado com milho, leite e especiarias, sendo presença garantida em festas juninas e encontros familiares.</p>
                        <p>Mais que sobremesa, o prato carrega lembranças afetivas da infância sertaneja e reforça o valor das receitas transmitidas de geração em geração.</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        html = html.substring(0, startIndex) + newLayout + html.substring(endIndex);
        fs.writeFileSync(culinariaPath, html);
    }
}

if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf-8');
    
    const newCss = `
/* =========================================== */
/* NOVO LAYOUT CULINÁRIA (DESTAQUE + GRID)     */
/* =========================================== */

.culinaria-layout-novo {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin-bottom: 6rem;
    margin-top: 4rem;
}

/* Card Destaque */
.card-destaque {
    display: flex;
    background-color: var(--color-white);
    border-radius: 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #f0f0f0;
}
.card-destaque:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.destaque-imagem {
    position: relative;
    flex: 1;
    min-width: 40%;
}

.destaque-imagem img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.badge-destaque {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background-color: var(--color-orange);
    color: var(--color-white);
    padding: 0.6rem 1.6rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(253, 175, 45, 0.4);
}

.destaque-conteudo {
    flex: 1.5;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.destaque-conteudo h3 {
    font-size: 3.2rem;
    margin-bottom: 2rem;
    color: var(--color-black);
    font-family: var(--font-primary);
}

.destaque-tags {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eaeaea;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.destaque-tags span {
    background-color: #f9f9f9;
    color: var(--color-des);
    padding: 0.6rem 1.6rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid #eaeaea;
}

/* Grid Pratos */
.grid-pratos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
}

.card-prato {
    background-color: var(--color-white);
    border-radius: 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f0f0;
}

.card-prato:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.card-prato img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
}

.prato-conteudo {
    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.prato-conteudo h3 {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
    color: var(--color-black);
    font-family: var(--font-primary);
}

/* Responsividade do Novo Layout */
@media (max-width: 1024px) {
    .card-destaque {
        flex-direction: column;
    }
    .destaque-imagem {
        height: 300px;
    }
    .grid-pratos {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-pratos {
        grid-template-columns: 1fr;
    }
    .destaque-conteudo {
        padding: 2.4rem;
    }
    .prato-conteudo {
        padding: 2.4rem;
    }
}
`;
    
    if (!css.includes('NOVO LAYOUT CULINÁRIA')) {
        css += newCss;
        fs.writeFileSync(cssPath, css);
    }
}

