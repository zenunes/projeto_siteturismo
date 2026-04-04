# Checklist de Implementações e Correções (Roteiro de Execução)

## 1. Estrutura e HTML (Otimização)
- [ ] **Limpar o arquivo HTML (BOM):** Remover o BOM invisível no início do arquivo `index.html` (e dos demais arquivos HTML). Isso eliminará a linha vazia gerada pelo navegador no topo do corpo da página.
- [ ] **Acessibilidade (Atributo "alt"):** Adicionar descrições curtas e precisas nos atributos `alt` de todas as tags `<img>`, garantindo melhor UX para leitores de tela e SEO.

## 2. CSS (Arquitetura, Posicionamento e Layout)
- [ ] **Refatorar Posicionamento do Header (Foco da Barra Branca):**
  - **O que fazer:** Substituir o "hack" do `top: -10rem;` na classe `.sliders`.
  - **Como:** Aplicar `position: absolute; top: 0; width: 100%; z-index: 10;` no seletor `header`. Isso fará o cabeçalho flutuar naturalmente sobre a imagem do slider, resolvendo a quebra do layout de forma limpa, robusta e escalável, sem a necessidade de compensar alturas em outros elementos.
- [ ] **Corrigir Áreas de Clique do Slider (Dead Zones):** 
  - **O que fazer:** Centralizar verticalmente os controles de slider de forma segura, garantindo que não sobreponham links ou conteúdo.
  - **Como:** Adicionar `pointer-events: none` no container pai (`.slider-controls`) e restaurar os cliques apenas nas setas com `pointer-events: auto`. Ajustar para `top: 50%; transform: translateY(-50%)`.
- [ ] **Padronizar Botão "Voltar ao Topo":** 
  - **O que fazer:** Fixar as medidas do botão `#back-to-top`.
  - **Como:** Substituir a medida de viewport (`vw`) por `rem` fixo (ex: `width: 4.5rem; height: 4.5rem; border-radius: 50%`), mantendo as proporções exatas de um círculo em qualquer tipo de dispositivo.
- [ ] **Aprimorar Overlay do Menu Mobile:**
  - **O que fazer:** Escurecer o fundo quando o menu estiver aberto, isolando o conteúdo de trás.
  - **Como:** Criar e estilizar uma classe `.menu-overlay` no CSS para interceptar cliques fora do escopo do menu.

## 3. JavaScript (Comportamento e Interatividade)
- [ ] **Fechamento Inteligente do Menu:** 
  - Adicionar no `script.js` a lógica para que o menu mobile feche sozinho quando o usuário clicar em um link (dentro do menu) ou fora da área dele (no overlay).
- [ ] **Desacoplamento Básico (Refatoração):**
  - Separar blocos longos de código do `script.js` em funções focadas (ex: uma função exclusiva para carrosséis e outra exclusiva para o controle de visibilidade da página), seguindo nosso Norte Técnico.