# Especificação do Projeto: Meu Sertão (Florestei)

## 1. Visão Geral
O projeto "Meu Sertão" (também conhecido como Florestei) é um portal de turismo, cultura e culinária dedicado à cidade de Floresta, Pernambuco. Desenvolvido como um Trabalho de Conclusão de Curso (TCC), o objetivo principal é promover o turismo local, destacando as belezas da caatinga, a rica gastronomia sertaneja e o patrimônio cultural da região.

## 2. Arquitetura Atual
Atualmente, o projeto é composto por uma arquitetura frontend estática (Client-side):
- **HTML5:** Estrutura semântica das páginas (Páginas principais: Início, Culinária, Cultura, Galeria e sub-páginas de eventos e culinária).
- **CSS3:** Estilização global (`style.css` e `secundaria.css`), com uso de fontes externas (Montserrat, Artifika, Roboto, Merriweather, Plus Jakarta Sans) e responsividade.
- **JavaScript (Vanilla):** Controle de interatividade, incluindo sliders de imagens (carrossel), menu mobile, botões de rolagem ("back-to-top") e inicialização da biblioteca AOS.
- **Bibliotecas de Terceiros:** AOS (Animate On Scroll) para animações de revelação.

## 3. Estrutura de Diretórios
- `/assents/`: Contém os recursos estáticos.
  - `/icon/`: Ícones em formato SVG.
  - `/image/` e `/img_compactado/`: Imagens diversas de paisagens, pratos e eventos.
  - `style.css` e `secundaria.css`: Folhas de estilo.
- `/vendor/aos/`: Biblioteca de animações.
- Páginas HTML na raiz: `index.html`, `culinaria.html`, `cultura.html`, `galeria.html`, entre outras.
- Scripts na raiz: `script.js` e `secudarioscript.js`.

## 4. Requisitos e Funcionalidades (Atual)
- **Navegação Responsiva:** Menu hamburguer para dispositivos móveis.
- **Carrossel de Destaques:** Banner dinâmico na página inicial com transição automática e controles manuais.
- **Carrossel de Galeria:** Exibição de imagens em formato de slider (paisagens da caatinga).
- **Animações de Scroll:** Efeitos de surgimento e fade utilizando a biblioteca AOS.
- **Integração de Mapas/Localização:** Links externos para o Google Maps apontando para os principais pontos turísticos.
- **Redes Sociais:** Links para WhatsApp, Facebook, Instagram e e-mail no rodapé.

## 5. Considerações de Segurança e Escalabilidade (Norte Técnico)
- **Modularização:** O CSS e o JS podem ser quebrados em módulos menores se o projeto crescer.
- **Variáveis de Ambiente:** Qualquer integração futura (ex: APIs de clima, backend, ou formulários de contato dinâmicos) exigirá o uso de arquivos `.env` e `.env.example`.
- **Desempenho:** Imagens devem continuar sendo otimizadas (já existe uma pasta `img_compactado`, o que é uma boa prática) e carregadas com `loading="lazy"`.

---
*Documento em evolução contínua, sujeito a revisões conforme o avanço do roteiro de execução e validação das próximas etapas.*