# Ateliê — Tintas & Miniaturas

App pessoal para o hobby de pintura de miniaturas de Warhammer. Roda inteiro no
navegador do iPad: **sem conta, sem servidor, sem nuvem**. Todos os dados ficam
no próprio dispositivo (IndexedDB) e ninguém mais tem acesso a eles.

## O que ele faz

**Estoque de tintas**
Cadastro do que você tem na bancada, com nível do pote (cheio / metade /
acabando / vazio), favoritas, lista de compras e notas por tinta. Vem com um
catálogo de referência de ~470 tintas — Vallejo (Model Color, Game Color,
**Xpress Color** e Model Air), Citadel (Base, Layer, Shade, **Contrast**, Dry e
técnicas), Army Painter, Scale75, AK e P3 — é só marcar o que está na sua
prateleira.

**Equivalência entre marcas**
Para qualquer tinta, o app mostra as mais próximas de cada outra marca,
calculadas por **ΔE2000** (o padrão da indústria para diferença de cor
percebida) sobre os valores do catálogo, mais uma tabela de pares clássicos que
a comunidade já trata como substituição direta. Responde "qual Citadel é essa
Vallejo?" e vice-versa.

**Três informações em toda cor**
Em qualquer lugar do app onde aparece uma cor — rampa de luz e sombra,
harmonia, undercoat, wash, esquema de facção, parte de uma miniatura — vêm
sempre juntas três linhas:

1. o **hex**, para reproduzir a cor em qualquer lugar;
2. a **Vallejo mais próxima**, em qualquer linha, com código e ΔE;
3. a **mais próxima que você tem**, colorida pela qualidade do casamento —
   verde serve, laranja quebra um galho, vermelho exige ajuste.

A terceira linha só aparece se a tinta realmente puder substituir a cor
(ΔE2000 até 11). Acima disso o app diz **"não tenho nada parecido"**, que é
uma informação útil por si só: sugerir um vermelho no lugar de um azul escuro
não ajuda ninguém.

Para wash e glaze a sugestão Vallejo fica restrita à Xpress Color, que é a
linha translúcida equivalente: não adianta indicar uma tinta de cobertura para
um trabalho de contraste.

**Laboratório de cores**
Roda cromática interativa. Escolhida uma cor, ele entrega:

- **Rampa de luz e sombra** com receita de mistura para cada degrau. As sombras
  puxam para o frio e perdem saturação, as luzes puxam para o quente — que é
  como funciona pintura de verdade, não apenas "mais escuro" e "mais claro".
- **Harmonias** — complementar, análogas, complementar dividida, tríade,
  tétrade e monocromática — cada uma com a explicação de *onde usar na
  miniatura*, não só a teoria.
- **Undercoat ideal**, com as bases ranqueadas e a justificativa de cada uma
  (amarelo sobre preto pede seis camadas; azul escuro sobre branco fica
  leitoso).
- **Wash e glaze sugeridos** para aquela cor.
- **O que você já tem parecido**, comparando com o seu estoque real.

**Estoque de miniaturas**
Cadastro com fotos (tiradas direto pela câmera do iPad), status do ciclo
completo — desmontada, montada, com primer, em pintura, detalhes, base,
finalizada —, esquema de cores por parte da peça vinculado às suas tintas,
prazo, posição na fila e registro de sessões de pintura com as tintas usadas.
A listagem agrupa por facção, status ou fila.

**Referência de Warhammer**
32 facções de 40k e Age of Sigmar — todas com esquema de cores clássico e base
recomendada — e 158 unidades com papel em mesa, pontos, habilidades, cores mais
usadas, dicas de pintura específicas do modelo e tamanho/terreno de base,
incluindo **25 personagens nomeados**. Na hora de cadastrar uma miniatura, as
unidades da facção aparecem em lista com busca: um toque preenche nome, pontos
e a ficha inteira.

Seis facções têm catálogo aprofundado, marcadas com ★ e listadas primeiro —
**Space Marines** (linha genérica), **Ultramarines**, **Chaos Space Marines**,
**World Eaters**, **Orks** e **Tyranids**. Os capítulos de Space Marines herdam
a linha genérica dos Astartes: Intercessores são Intercessores em qualquer
capítulo, muda só a cor. As demais facções têm um recorte das peças mais
icônicas — o suficiente para cadastrar, não um índice do codex.

**Kill Team**
17 times de escaramuça com composição por papéis, estilo de jogo, paleta,
dicas de pintura específicas e uma nota de esforço de pintura de 1 a 5. Kill
Team é o formato ideal para quem pinta: um time inteiro cabe numa sessão de
fim de semana.

Mais 7 receitas passo a passo de base (escombro urbano, deserto, lama, neve,
industrial, campo, vitrine), cada uma com uma **ilustração** da base vista de
cima, desenhada em SVG a partir das cores e da textura que a receita descreve.

**Painel**
Modelos pintados sobre o total, tempo médio por peça, horas de bancada, pilha
da vergonha com projeção de quanto falta para zerar no ritmo atual, próximas
pinturas da fila, tintas mais usadas, ritmo dos últimos 12 meses, distribuição
por status e por facção, e lista de compras.

## Arquivo único (`entrega/Atelie.html`)

Há uma versão empacotada em um único `.html`, com todo o JS, CSS e ícones
embutidos — nenhum arquivo externo, nenhuma instalação. Regenerar:

```bash
npm run build:html
```

**Onde colocar esse arquivo importa mais do que parece.** Servido por um
endereço `http://` ou `https://` (rede local, ou qualquer host estático), ele
funciona por completo e salva tudo. Aberto direto como arquivo (`file://`,
tocando nele no app Arquivos do iPad), o WebKit trata a página como origem
descartável e pode recusar o IndexedDB — aí dá para navegar e usar o
laboratório de cores, mas nada do que você cadastrar sobrevive ao fechamento.

O app detecta esse caso na abertura e mostra um aviso vermelho no topo, para
você nunca perder dados achando que salvou.

## Como rodar

```bash
npm install
npm run dev
```

O Vite mostra dois endereços; use o da rede local (`http://192.168.x.x:5173`)
no Safari do iPad.

Para deixar rodando de forma mais estável:

```bash
npm run build
npm run preview
```

### Instalar no iPad

1. Abra o endereço da rede local no Safari.
2. Compartilhar → **Adicionar à Tela de Início**.
3. O app abre em tela cheia, sem barra do navegador, e funciona **offline**
   depois da primeira visita — dá para pintar na bancada sem wifi.

## Backup

Não existe nuvem. Se você limpar os dados do Safari ou trocar de iPad, tudo
some. Em **Configurações** dá para exportar um `.json` com tudo (opcionalmente
com as fotos embutidas) e importar depois, mesclando ou substituindo.

## Sobre a precisão dos dados

- **Cores em hex são aproximações** da tinta seca. Servem para comparar,
  encontrar equivalente e visualizar esquema na tela — nenhum monitor
  reproduz pigmento. Todo valor é editável dentro do app, e as suas correções
  ficam salvas.
- **Pontos e regras mudam a cada dataslate.** Os valores são referência de
  partida (40k 10ª edição / AoS 4ª edição) para dar noção de custo relativo.
  Confira o app oficial antes de montar lista para jogar. O mesmo vale para a
  composição dos times de Kill Team, que muda a cada edição e errata.
- **A numeração 72.4xx da linha Xpress Color é a parte menos verificada do
  catálogo.** Os nomes são confiáveis; confira o código no pote antes de
  comprar.
- As ilustrações das receitas de base são **desenhos esquemáticos**, não fotos:
  mostram cores, textura e elementos da receita para você bater o olho, não o
  resultado exato que a sua mão vai produzir.
- Você pode adicionar suas próprias tintas e miniaturas à mão a qualquer
  momento; nada depende do catálogo embutido.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 4, Dexie (IndexedDB), Recharts,
vite-plugin-pwa. Sem back-end, sem API, sem telemetria.

A matemática de cor é própria (`src/lib/color.ts`): conversões sRGB ↔ CIELAB e
OkLab, CIEDE2000, harmonias e geração de rampas. CIELAB para *medir* distância
entre tintas reais; OkLCh para *gerar* cores novas, porque clarear em HSL lava
a cor e vira pastel.

---

# Codex AIGP — Campanha de Estudos

Segundo app do repositório, **totalmente independente do Ateliê**: um único
arquivo, [`aigp.html`](aigp.html), sem build, sem dependências, sem rede. Serve
para estudar para a certificação **AIGP** (AI Governance Professional, do IAPP)
com uma gamificação de Space Marines contra Tyranids.

Publicado junto com o Pages em **`/aigp.html`** — não porque seja para
compartilhar, mas porque o Safari do iPad só guarda `localStorage` de forma
confiável em HTTPS; aberto por `file://` ele apaga o progresso sem avisar. Os
dados nunca saem do dispositivo: o que vai para a web é só o arquivo vazio.
Adicione à tela de início para virar um app.

## O que ele faz

**Currículo completo** — 275 itens verificáveis em 7 domínios e 40 tópicos,
cada um com caixa de "já estudei" e **campo de anotação próprio**. Busca por
texto e filtros (pendentes, estudados, anotados).

**Cronograma em Gantt** — uma fase por domínio, com duração distribuída
automaticamente pelo peso do domínio na prova e datas editáveis à mão. A barra
mostra o avanço real dentro da fase, marca o dia de hoje e fica vermelha quando
o prazo vence sem o domínio fechado.

**Campanha Space Marines × Tyranids**

- Estudar dá XP (1 por minuto), marcar item dá 40, fechar um domínio dá 250.
- A patente sobe de **Aspirante** a **Mestre do Capítulo** em 10 níveis,
  calibrados para que o topo custe o Codex inteiro (~18.000 XP).
- Cada dia sem estudo é um **ataque tyranid**: o dano começa em 8 e cresce 4 a
  cada dia perdido seguido, até 28. Estudar cura 12 (meta batida) ou 6
  (parcial). Se a vida chega a zero, o irmão **cai em combate** e só volta
  estudando.
- Dias de descanso configuráveis (por padrão, domingo) não sofrem ataque.
- 10 honras do capítulo, do "Primeiro Sangue" ao "Codex Completo".

A vida **nunca é um contador acumulado**: é recalculada do zero a partir do
histórico de sessões toda vez que o app abre. Registrar aquela sessão de ontem
que você esqueceu de lançar desfaz o ataque daquele dia retroativamente.

**Seis temas** (Ultramarines, Blood Angels, Hive Leviathan, Iron Hands,
Pergaminho e Codex claro) e backup em JSON — exportar, copiar e restaurar.

## Aviso sobre o conteúdo

O currículo é um **roteiro de estudo** montado a partir da estrutura pública do
exame; os percentuais de peso por domínio são **estimativas** para priorizar o
esforço. O *Body of Knowledge* e o *Exam Blueprint* oficiais do IAPP são a
fonte final e mudam de versão para versão — confira no site do IAPP antes de
fechar seu plano.

---

Warhammer, Warhammer 40.000, Age of Sigmar e os nomes de facções e unidades são
marcas da Games Workshop. AIGP e IAPP são marcas da International Association
of Privacy Professionals; este app não tem vínculo com a organização. Vallejo, Citadel, Army Painter, Scale75, AK e P3 são
marcas de seus respectivos fabricantes. Este é um projeto pessoal, sem vínculo
com nenhuma delas.
