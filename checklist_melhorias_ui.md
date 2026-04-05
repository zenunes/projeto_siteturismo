# Checklist de Implementação: Melhorias UI/UX (Frontend-Design)
**Projeto:** Meu Sertão (Florestei)

Com base no `relatorio_melhorias_ui.md`, este checklist serve como roteiro prático e acionável para elevarmos a qualidade estética e a usabilidade do código existente.

## 1. Espaçamentos (Whitespace) e Alinhamentos
- [ ] **Ajuste Global de Seções:** Alterar o `padding` das seções `.default` e `.default-2` para `12rem 0` (topo e base), garantindo um ritmo vertical generoso e consistente.
- [ ] **Respiro dos Cards:** Aumentar o `padding` interno das classes como `.atracao-content` e `.evento-conteudo` para pelo menos `2.4rem` a `3.2rem`.
- [ ] **Contraste de Margens (Títulos vs. Parágrafos):** Aplicar `margin-bottom: 1.6rem;` nos subtítulos/títulos e `margin-bottom: 2.4rem;` nos parágrafos descritivos.

## 2. Otimização Tipográfica e Hierarquia
- [ ] **Limpeza de Fontes:** Remover importações excessivas de fontes no HTML (ex: Roboto, Montserrat) e focar em duas fontes complementares:
  - Fonte Display (Serifada para Títulos): `Merriweather` ou `Artifika`.
  - Fonte Body (Sans-Serif para Texto): `Plus Jakarta Sans`.
- [ ] **Atualização das Variáveis CSS:** Ajustar o `:root` no `style.css` para centralizar essas duas famílias tipográficas (ex: `--font-primary`, `--font-secondary`).
- [ ] **Hierarquia de Tamanhos:** Aumentar o tamanho de `h1`/`h2` (para algo em torno de `4.8rem` a `6rem`) com peso `800` (bold).
- [ ] **Leitura Fluida:** Ajustar o `line-height` dos textos normais (`p`, `.left-desc`, `.right-desc`) para `1.6` ou `1.8`.

## 3. Cores, Sombras e Formas
- [ ] **Uso Estratégico do Laranja:** Garantir que o `--color-orange` (`#FDAF2D`) seja usado estritamente como cor de ação ou detalhe (botões primários, linhas decorativas de títulos), evitando seu uso em textos extensos.
- [ ] **Sombras (Box-Shadow) Naturais:** Substituir as sombras escuras (`0 4px 12px rgba(0,0,0,0.18)`) dos cards por sombras mais amplas e suaves, ex: `0 10px 30px rgba(0, 0, 0, 0.08)`.
- [ ] **Padronização de Bordas (Border-Radius):** Definir e aplicar uma curvatura padrão (ex: `0.8rem` ou `1rem`) uniformemente em imagens de galeria, botões e cards (`.atracao-card`, `.evento-card`).

## 4. Animações e Micro-interações
- [ ] **AOS (Animate On Scroll):** Revisar os atributos `data-aos` no HTML para focar em transições suaves como `fade-up` com duração padronizada (`800ms`), evitando misturas caóticas de `zoom-in` ou animações opostas na mesma seção.
- [ ] **Tato de Clique (Hover State):** Adicionar um efeito `transform: translateY(-2px);` na pseudo-classe `:hover` de botões (`.saiba-mais-btn`, `.atracao-btn`) para criar a percepção de profundidade/clique.

---
**Regra de Ouro da Implementação:**
Cada etapa concluída deste checklist será agrupada e salva no controle de versão como um commit atômico (ex: `style(ui): ajustar tipografia e line-height` ou `refactor(css): otimizar padding de cards`), mantendo o histórico de evolução sempre claro.