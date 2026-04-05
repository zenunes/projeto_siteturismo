const fs = require('fs');

const path = 'cultura.html';
if (fs.existsSync(path)) {
    let html = fs.readFileSync(path, 'utf-8');

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
            <!-- Destaque 1 -->
            <div class="card-destaque" data-aos="fade-up" data-aos-duration="800">
                <div class="destaque-imagem">
                    <span class="badge-destaque">TRADIÇÃO</span>
                    <img loading="lazy" decoding="async" src="assets/image/cavalos.jpg" alt="Cavalgada tradicional com bandeiras">
                </div>
                <div class="destaque-conteudo">
                    <h3>Cavalgada Tradicional</h3>
                    <p>A cavalgada é uma das mais emblemáticas manifestações culturais do sertão nordestino. Em Floresta, essa tradição ganha destaque durante as festas de vaquejada e em celebrações religiosas, quando dezenas de cavaleiros percorrem as ruas da cidade exibindo estandartes e bandeiras, em uma verdadeira demonstração de fé e tradição.</p>
                    <p>Os cavaleiros trajam vestimentas típicas, com chapéus de couro, e os cavalos são adornados com fitas coloridas e apetrechos tradicionais. Esta prática mantém viva a conexão entre o homem sertanejo e seu fiel companheiro nas lidas do campo, o cavalo, elemento fundamental na história e no desenvolvimento da região.</p>
                    <div class="destaque-tags">
                        <span>FÉ</span>
                        <span>SERTÃO</span>
                        <span>HISTÓRIA</span>
                    </div>
                </div>
            </div>

            <!-- Grid -->
            <div class="grid-pratos">
                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                    <img loading="lazy" decoding="async" src="assets/image/casa.jpg" alt="Forró Pé-de-Serra">
                    <div class="prato-conteudo">
                        <h3>Forró Pé-de-Serra</h3>
                        <p>O forró é mais que um ritmo musical para o sertanejo — é a expressão máxima da alegria e da sociabilidade. O autêntico forró pé-de-serra, com sua formação tradicional de trio (zabumba, triângulo e sanfona), embala as festas de Floresta durante todo o ano, ganhando especial destaque nas festas juninas.</p>
                        <p>Os dançarinos transformam qualquer espaço em um verdadeiro terreiro de festa, preservando uma tradição que remonta às origens do povo nordestino e que representa um patrimônio imaterial do Brasil.</p>
                    </div>
                </div>
                
                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/igreja.jpg" alt="Artesanato em Couro">
                    <div class="prato-conteudo">
                        <h3>Artesanato em Couro</h3>
                        <p>A lida com o gado legou ao sertão uma rica tradição no trabalho com o couro. Os artesãos de Floresta produzem desde as clássicas indumentárias de vaqueiro (gibão, perneira, chapéu) até peças decorativas e utilitárias de alta durabilidade e beleza.</p>
                        <p>O ofício, muitas vezes passado de pai para filho, é um símbolo da resistência e da adaptação sertaneja aos rigores do clima.</p>
                    </div>
                </div>

                <div class="card-prato" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                    <img loading="lazy" decoding="async" src="assets/img_compactado/casario.jpeg" alt="Arquitetura e Casarios">
                    <div class="prato-conteudo">
                        <h3>Casario Histórico</h3>
                        <p>Passear pelo centro de Floresta é fazer uma viagem no tempo. A arquitetura dos antigos casarões revela a prosperidade de outras épocas, com fachadas ornamentadas, portas altas e janelões coloridos que guardam a memória das famílias tradicionais da região.</p>
                        <p>A preservação desse conjunto arquitetônico é vital para manter viva a história visual e urbana da "Terra dos Tamarindos".</p>
                    </div>
                </div>
            </div>

            <!-- Destaque 2 (Invertido) -->
            <div class="card-destaque destaque-invertido" data-aos="fade-up" data-aos-duration="800">
                <div class="destaque-imagem">
                    <span class="badge-destaque" style="background-color: #3498db; box-shadow: 0 4px 10px rgba(52, 152, 219, 0.4);">DEVOÇÃO</span>
                    <img loading="lazy" decoding="async" src="assets/img_compactado/rio.jpg" alt="Festa do Padroeiro e Celebrações Ribeirinhas">
                </div>
                <div class="destaque-conteudo">
                    <h3>Festa do Padroeiro</h3>
                    <p>A religiosidade é um pilar central da cultura nordestina. Em Floresta, as festas dos padroeiros mobilizam a comunidade inteira. Além das procissões e missas, o entorno das igrejas se transforma em um vibrante ponto de encontro com barracas de comidas típicas, leilões e apresentações musicais.</p>
                    <p>As celebrações reforçam o sentido de comunidade, atraindo florestanos que moram fora e turistas em busca da autêntica fé sertaneja, em um momento onde o sagrado e o profano caminham de mãos dadas pelas ruas da cidade.</p>
                    <div class="destaque-tags">
                        <span>RELIGIÃO</span>
                        <span>FESTA</span>
                        <span>COMUNIDADE</span>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        html = html.substring(0, startIndex) + newLayout + html.substring(endIndex);
        fs.writeFileSync(path, html);
    }
}
