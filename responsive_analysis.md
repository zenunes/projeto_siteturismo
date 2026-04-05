# Análise de Responsividade - Florestei (Projeto Turismo)

## Visão Geral
A responsividade do projeto foi verificada e focada na página inicial (e comportamentos do header que afetam as demais páginas). O layout possui a premissa de funcionar bem do Desktop aos dispositivos menores (Mobile-First adaptado).

## 1. Menu Hambúrguer (Mobile Navigation)
- **Status atual**: O menu hambúrguer existe no código (`<img id="btn-menu">`), porém sua implementação apresenta **falhas** na transição de visibilidade e controle de estados no CSS e JS.
- **Bugs Encontrados**:
  - A classe `active-menu` é adicionada no JS pelo `nav.classList.toggle("active-menu")`, porém no CSS há regras como `#nav.active-menu #menu` que estão sofrendo interferências de sobrescrita e `z-index`.
  - A imagem que deveria ser um botão não tem uma área de toque (touch target) grande o suficiente (`44px` no mínimo é recomendado).
  - Em alguns pontos (`max-width: 768px`), o `#btn-menu` tem display `block`, mas ele ainda precisa que a lógica do Overlay (`menu-overlay`) funcione perfeitamente sem rolar a página por trás (não há travamento de scroll `body { overflow: hidden }` quando aberto).

## 2. Layout e Cards (Desktop para Mobile)
- **Status Atual**: A seção nova de cards (Culinária, Cultura e Destaque) está funcionando com a adaptação para flex-direction `column` (via `@media (max-width: 992px)`).
- **Bugs/Problemas Encontrados**:
  - Faltam margens nas laterais em telas abaixo de 576px em alguns pontos, fazendo com que textos ou os cartões toquem nas bordas da tela. (Recomenda-se aumentar `padding: 2rem` para `1.5rem` garantindo consistência sem comprimir).
  - O carrossel superior (Hero) em telas muito pequenas (abaixo de 480px) sofre com a fonte `h1` de 3.6rem e o texto pode transbordar da caixa preta (`.bg-escuro`). As classes `.slider--width .item-container h1` tentam usar `clamp()` mas ainda pode haver quebra de layout de linha em dispositivos antigos.

## 3. Galeria (Componente Inferior)
- **Status Atual**: A galeria de fotos utiliza `overflow-x: auto` e `scroll-snap`.
- **Bugs/Problemas Encontrados**:
  - O espaçamento e tamanho dos cards de imagem (`.slide--colection`) na galeria podem criar scroll horizontal na página principal (ao invés de apenas no contêiner da galeria) se as margens (`margin: auto`) e o `max-width` não forem respeitados por falta de `box-sizing`.

---

# Checklist de Correções (Roadmap)

- [ ] **Menu Hambúrguer**:
  - Ajustar o CSS para garantir que a animação de "deslize" do menu (`height` ou `transform: translateX`) funcione suavemente.
  - Adicionar a trava de scroll no `body` quando o menu móvel estiver ativo.
  - Aumentar o espaçamento do botão do menu hambúrguer.

- [ ] **Ajuste de Tipografia Mobile**:
  - Revisar a escala fluida (`clamp()`) de fontes do banner principal para mobile (telas < 400px).
  - Diminuir um pouco o tamanho das fontes da nova seção (`.highlight-title` e `.home-card-title`) para o breakpoint de 480px.

- [ ] **Ajustes de Margem/Padding**:
  - Confirmar que as laterais em telas menores possuem pelo menos `1.5rem` a `2rem` de `padding`.

