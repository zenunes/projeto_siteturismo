# Análise de Bugs e Quebras de Layout (UX)

## 1. Barra Branca no Topo da Página (Problema Visível na Imagem)
- **Diagnóstico (BOM e Hack de Posicionamento):** O arquivo `index.html` contém caracteres invisíveis no seu início (BOM - *Byte Order Mark*, representados por `﻿﻿`). Esse detalhe técnico força o navegador a criar uma linha de texto vazia no corpo do documento antes do `<header>`. Além disso, a estratégia utilizada no CSS para colocar a imagem atrás do menu foi um "hack": o header ficou com a altura padrão (100px) e o container `.sliders` recebeu `position: relative; top: -10rem;` para "subir" 100px. Como o BOM empurra o layout para baixo em aproximadamente 15px, a imagem do slider "sobe" apenas 100px, não cobrindo o espaço do texto invisível e deixando a temida faixa branca exposta no topo.
- **Impacto UX:** O visual do site parece "quebrado", causando estranheza e dando uma impressão de desleixo logo no primeiro contato (above the fold). O espaço vazio não intencional compromete o design imersivo proposto.

## 2. Controles do Slider e Sobreposição Indesejada
- **Diagnóstico:** O container `.slider-controls` foi configurado com `width: 100vw; height: 60vh;` e posicionado de forma absoluta dentro do `<header>`. Como ele engloba quase toda a tela, ele pode bloquear cliques do usuário em elementos que ficarem abaixo dele, criando áreas mortas ("dead zones").
- **Impacto UX:** Frustração imediata do usuário que tenta interagir com a página e não consegue, pois um container "invisível" interceptou o clique.

## 3. Botão "Voltar ao Topo" Deformado
- **Diagnóstico:** O CSS `#back-to-top` utiliza unidades relativas à tela (`vw`) para altura e largura, combinadas com `max-width` em pixels. Em telas mais largas ou com proporções diferentes, se a largura atinge o limite máximo mas a altura não acompanha adequadamente, o botão perde a forma circular perfeita (transformando-se num formato oval).
- **Impacto UX:** Problema estético e falta de polimento, transmitindo uma sensação de inconsistência visual em monitores de alta resolução.

## 4. Menu Mobile (Usabilidade e Acessibilidade)
- **Diagnóstico:** A transição do menu no celular funciona apenas ativando a classe no container. No entanto, não há um "overlay" (uma camada escura semitransparente no fundo) que isole o menu do conteúdo. Pior ainda, se o usuário clicar fora do menu ou selecionar um link, o menu não se fecha sozinho.
- **Impacto UX:** Navegação móvel confusa, exigindo que o usuário procure o botão de "hambúrguer" novamente para voltar à tela, o que aumenta o atrito na navegação.

## 5. Acessibilidade de Imagens e SEO
- **Diagnóstico:** Várias tags `<img>` pelo projeto (incluindo o logo e fotos da galeria) possuem o atributo `alt=""` vazio.
- **Impacto UX e SEO:** Usuários com deficiência visual que utilizam leitores de tela não terão contexto do que a imagem representa. Além disso, motores de busca (Google) penalizam drasticamente sites que negligenciam descrições de imagens.