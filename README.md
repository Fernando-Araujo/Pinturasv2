# Ateliê — Tintas & Miniaturas

App pessoal para o hobby de pintura de miniaturas de Warhammer. Roda inteiro no
navegador do iPad: **sem conta, sem servidor, sem nuvem**. Todos os dados ficam
no próprio dispositivo (IndexedDB) e ninguém mais tem acesso a eles.

## O que ele faz

**Estoque de tintas**
Cadastro do que você tem na bancada, com nível do pote (cheio / metade /
acabando / vazio), favoritas, lista de compras e notas por tinta. Vem com um
catálogo de referência de ~300 tintas (Vallejo Model Color, Game Color e Model
Air, Citadel, Army Painter, Scale75, AK e P3) — é só marcar o que está na sua
prateleira.

**Equivalência entre marcas**
Para qualquer tinta, o app mostra as mais próximas de cada outra marca,
calculadas por **ΔE2000** (o padrão da indústria para diferença de cor
percebida) sobre os valores do catálogo, mais uma tabela de pares clássicos que
a comunidade já trata como substituição direta. Responde "qual Citadel é essa
Vallejo?" e vice-versa.

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
38 facções de 40k e Age of Sigmar com esquema de cores clássico e base
recomendada, e unidades com papel em mesa, pontos, habilidades, cores mais
usadas, dicas de pintura específicas do modelo e tamanho/terreno de base. Mais
7 receitas passo a passo de base (escombro urbano, deserto, lama, neve,
industrial, campo, vitrine).

**Painel**
Modelos pintados sobre o total, tempo médio por peça, horas de bancada, pilha
da vergonha com projeção de quanto falta para zerar no ritmo atual, próximas
pinturas da fila, tintas mais usadas, ritmo dos últimos 12 meses, distribuição
por status e por facção, e lista de compras.

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
  Confira o app oficial antes de montar lista para jogar.
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

Warhammer, Warhammer 40.000, Age of Sigmar e os nomes de facções e unidades são
marcas da Games Workshop. Vallejo, Citadel, Army Painter, Scale75, AK e P3 são
marcas de seus respectivos fabricantes. Este é um projeto pessoal, sem vínculo
com nenhuma delas.
