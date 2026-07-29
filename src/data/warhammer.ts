/**
 * Biblioteca de referência de Warhammer.
 *
 * SOBRE OS PONTOS: valores de pontos mudam a cada dataslate de balanceamento.
 * Os números aqui são uma referência de partida (40k 10ª edição / AoS 4ª
 * edição) e existem para dar noção de custo relativo, não para arbitrar mesa.
 * Confira sempre o app oficial / o dataslate mais recente antes de montar
 * lista. Cada unidade pode ser editada e você pode cadastrar as suas próprias.
 */

export type Sistema = '40k' | 'aos'

export type Faccao = {
  id: string
  nome: string
  sistema: Sistema
  /** Agrupamento maior: Imperium, Chaos, Xenos / Order, Death, Destruction, Chaos */
  grupo: string
  cor: string
  resumo: string
  /** Esquema de cores clássico da facção, em ordem de aplicação. */
  esquema: { parte: string; cor: string; hex: string; tinta: string }[]
  /** Como a base costuma ser feita para combinar com o exército. */
  base: string
  /**
   * Facção com catálogo aprofundado: linha completa de unidades e personagens
   * nomeados. As demais têm um recorte das peças mais icônicas — o suficiente
   * para cadastrar, mas não para servir de índice do codex.
   */
  destaque?: boolean
  /**
   * Facção cujas unidades também valem para esta. Os capítulos de Space
   * Marines herdam a linha genérica dos Astartes: Intercessores são
   * Intercessores em qualquer capítulo, muda só a cor.
   */
  herdaUnidadesDe?: string
}

export type Unidade = {
  id: string
  faccaoId: string
  nome: string
  /** Battlefield role / papel em mesa. */
  papel: string
  /** Tamanho padrão da unidade. */
  modelos: string
  pontos: number
  /** A que tamanho de unidade o custo em pontos se refere. */
  pontosPara: string
  /** 2 a 4 habilidades ou regras que definem a unidade em mesa. */
  habilidades: string[]
  /** Cores mais usadas nessa unidade especificamente. */
  cores: string[]
  /** Dicas de pintura direcionadas ao modelo. */
  dicasPintura: string[]
  /** Tamanho de base oficial. */
  baseTamanho: string
  /** Terreno de base que combina com a unidade. */
  baseTerreno: string
  /** Personagem nomeado (Titus, Ghazghkull, Kharn…) em vez de unidade genérica. */
  nomeado?: boolean
}

/* ================================================================== */
/* FACÇÕES                                                             */
/* ================================================================== */

export const FACCOES: Faccao[] = [
  /* --- 40k / Imperium ------------------------------------------- */
  {
    id: 'space-marines',
    destaque: true,
    nome: 'Space Marines (Codex geral)',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#4a6b8a',
    resumo:
      'A linha completa dos Adeptus Astartes, independente de capítulo: Primaris, veteranos, veículos e personagens de outros capítulos. Use esta facção para peças que não são de um capítulo específico, ou quando quiser inventar o seu.',
    esquema: [
      { parte: 'Armadura', cor: 'Cor do capítulo', hex: '#4a6b8a', tinta: 'Escolha livre — spray colorido economiza horas' },
      { parte: 'Ombreira direita', cor: 'Insígnia do capítulo', hex: '#c8a54b', tinta: 'Deixe por último, com a peça colada' },
      { parte: 'Metais', cor: 'Aço', hex: '#888c8f', tinta: 'Citadel Leadbelcher / Vallejo 70.863' },
      { parte: 'Ouro dos detalhes', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Panos e selos', cor: 'Osso e vermelho', hex: '#d6cdb0', tinta: 'Vallejo 70.918 Ivory + 70.926 Red' },
      { parte: 'Lentes', cor: 'Vermelho ou verde', hex: '#c51f1b', tinta: 'Preto, cor, ponto de branco no canto' },
    ],
    base: 'Depende do capítulo e do teatro de guerra. Escombro urbano cinza é o padrão seguro e combina com qualquer esquema.',
  },
  {
    id: 'ultramarines',
    herdaUnidadesDe: 'space-marines',
    destaque: true,
    nome: 'Ultramarines',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#16548c',
    resumo:
      'O capítulo modelo dos Space Marines. Doutrina tática flexível, muito bom para aprender o jogo e o azul clássico é a melhor cor para treinar camadas.',
    esquema: [
      { parte: 'Armadura', cor: 'Azul Macragge', hex: '#16548c', tinta: 'Vallejo 70.925 Blue / Citadel Macragge Blue' },
      { parte: 'Luz da armadura', cor: 'Azul médio', hex: '#3f7cbe', tinta: 'Vallejo 70.963 Medium Blue' },
      { parte: 'Ombreira / aquila', cor: 'Osso', hex: '#d6cdb0', tinta: 'Vallejo 70.918 Ivory' },
      { parte: 'Metais', cor: 'Prata gasta', hex: '#888c8f', tinta: 'Vallejo 70.863 Gunmetal Grey' },
      { parte: 'Detalhe de honra', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Lentes', cor: 'Vermelho quente', hex: '#c51f1b', tinta: 'Vallejo 70.957 Flat Red' },
    ],
    base: 'Areia cinza de Macragge com pedaços de escombro. Cinza médio drybrush claro, borda da base em osso ou preto.',
  },
  {
    id: 'blood-angels',
    herdaUnidadesDe: 'space-marines',
    nome: 'Blood Angels',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#9a1115',
    resumo:
      'Marines nobres e assombrados pela Sede Vermelha. Exército agressivo de assalto. O vermelho vivo é o desafio de pintura mais famoso do hobby.',
    esquema: [
      { parte: 'Armadura', cor: 'Vermelho sangue', hex: '#9a1115', tinta: 'Vallejo 70.926 Red sobre base clara' },
      { parte: 'Luz', cor: 'Vermelho alaranjado', hex: '#c33d20', tinta: 'Vallejo 70.909 Vermillion' },
      { parte: 'Detalhes', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Panos', cor: 'Preto', hex: '#231f20', tinta: 'Vallejo 70.950 Black' },
      { parte: 'Asas / relíquias', cor: 'Osso', hex: '#ece2cb', tinta: 'Vallejo 70.918 Ivory' },
    ],
    base: 'Ruínas de Baal: areia seca e ossos, ou piso de mármore rachado para as peças de personagem.',
  },
  {
    id: 'dark-angels',
    herdaUnidadesDe: 'space-marines',
    nome: 'Dark Angels',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#0f3324',
    resumo:
      'Os secretos. Verde escuro, muita bugiganga monástica e uma lista que gosta de veículos e Terminators.',
    esquema: [
      { parte: 'Armadura', cor: 'Verde Caliban', hex: '#003d18', tinta: 'Vallejo 70.970 Deep Green' },
      { parte: 'Luz', cor: 'Verde médio', hex: '#3d6b3c', tinta: 'Vallejo 70.968 Flat Green' },
      { parte: 'Robes (Deathwing)', cor: 'Osso', hex: '#d9cba6', tinta: 'Vallejo 72.034 Bone White' },
      { parte: 'Metais', cor: 'Bronze', hex: '#a87545', tinta: 'Vallejo 70.998 Bright Bronze' },
    ],
    base: 'Piso de fortaleza-monastério: laje escura, musgo escasso e folhas mortas.',
  },
  {
    id: 'space-wolves',
    herdaUnidadesDe: 'space-marines',
    nome: 'Space Wolves',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#55707f',
    resumo:
      'Vikings no espaço. Muita pele, pelo e runa. Exército de corpo a corpo com regras de contra-ataque.',
    esquema: [
      { parte: 'Armadura', cor: 'Azul acinzentado', hex: '#55707f', tinta: 'Vallejo 70.904 Dark Blue Grey' },
      { parte: 'Peles', cor: 'Marrom couro', hex: '#7a5231', tinta: 'Vallejo 70.871 Leather Brown' },
      { parte: 'Pelo', cor: 'Cinza claro', hex: '#9aa1a6', tinta: 'Vallejo 70.990 Light Grey' },
      { parte: 'Metais', cor: 'Ferro gasto', hex: '#7b8083', tinta: 'Vallejo 70.866 Grey Metal' },
    ],
    base: 'Neve sobre rocha escura. Faça a rocha e a terra primeiro, neve só no final com pasta acrílica.',
  },
  {
    id: 'adeptus-custodes',
    nome: 'Adeptus Custodes',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#c8a54b',
    resumo:
      'Guardiões do Imperador. Poucos modelos, cada um durísssimo. Ótimo para quem quer pintar pouca coisa mas muito bem.',
    esquema: [
      { parte: 'Armadura', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold sobre marrom' },
      { parte: 'Sombra do ouro', cor: 'Marrom avermelhado', hex: '#5a3a2a', tinta: 'Vallejo 70.941 Burnt Umber' },
      { parte: 'Panos', cor: 'Vermelho escuro', hex: '#83201f', tinta: 'Vallejo 70.946 Dark Red' },
      { parte: 'Metal escuro', cor: 'Aço escuro', hex: '#565b60', tinta: 'Vallejo 70.863 Gunmetal Grey' },
    ],
    base: 'Mármore do Palácio Imperial ou piso dourado. Vale investir: são poucas bases e todas aparecem.',
  },
  {
    id: 'astra-militarum',
    nome: 'Astra Militarum',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#604f33',
    resumo:
      'A Guarda Imperial. Muitos modelos baratos, tanques e artilharia. O exército onde pintura em lote (batch painting) é obrigatória.',
    esquema: [
      { parte: 'Uniforme', cor: 'Verde militar', hex: '#5b6337', tinta: 'Vallejo 70.894 Camouflage Olive Green' },
      { parte: 'Armadura/capacete', cor: 'Cáqui', hex: '#8b8163', tinta: 'Vallejo 70.988 Khaki' },
      { parte: 'Pele', cor: 'Pele base', hex: '#d6a077', tinta: 'Vallejo 70.815 Basic Skintone' },
      { parte: 'Metais', cor: 'Aço', hex: '#565b60', tinta: 'Vallejo 70.863 Gunmetal Grey' },
      { parte: 'Bolsas', cor: 'Couro', hex: '#7a5231', tinta: 'Vallejo 70.871 Leather Brown' },
    ],
    base: 'Terra batida de trincheira, sacos de areia, arame farpado. Barro seco com pigmento funciona muito bem.',
  },
  {
    id: 'adeptus-mechanicus',
    nome: 'Adeptus Mechanicus',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#8f2f1c',
    resumo:
      'Tecno-sacerdotes de Marte. Modelos cheios de cabos e detalhes finos — pintura lenta e recompensadora.',
    esquema: [
      { parte: 'Robes', cor: 'Vermelho de Marte', hex: '#8f2f1c', tinta: 'Vallejo 70.926 Red + 70.981 Orange Brown' },
      { parte: 'Metais', cor: 'Latão', hex: '#a98a3e', tinta: 'Vallejo 70.998 Bright Bronze' },
      { parte: 'Mecanismos', cor: 'Aço escuro', hex: '#4c5257', tinta: 'Vallejo 70.865 Oily Steel' },
      { parte: 'Cabos', cor: 'Preto emborrachado', hex: '#33383c', tinta: 'Vallejo 70.995 German Grey' },
      { parte: 'Lentes', cor: 'Verde tóxico', hex: '#63c34e', tinta: 'Citadel Moot Green' },
    ],
    base: 'Piso industrial de metal, grelhas, tubos e óleo. Ferrugem com pigmento laranja nas quinas.',
  },
  {
    id: 'adepta-sororitas',
    nome: 'Adepta Sororitas',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#231f20',
    resumo:
      'As Irmãs de Batalha. Armadura preta, panos vermelhos e muito detalhe gótico dourado. Fé como recurso em mesa.',
    esquema: [
      { parte: 'Armadura', cor: 'Preto', hex: '#231f20', tinta: 'Vallejo 70.950 Black + luz cinza' },
      { parte: 'Panos', cor: 'Vermelho', hex: '#9a1115', tinta: 'Vallejo 70.926 Red' },
      { parte: 'Ornamentos', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Pergaminhos', cor: 'Osso', hex: '#ece2cb', tinta: 'Vallejo 70.918 Ivory' },
    ],
    base: 'Catedral em ruínas: laje de pedra, vitral quebrado, velas. Bordas em preto reforçam a armadura.',
  },
  {
    id: 'grey-knights',
    nome: 'Grey Knights',
    sistema: '40k',
    grupo: 'Imperium',
    cor: '#8f989d',
    resumo:
      'Caçadores de daemons em armadura prateada. Exército pequeno, todo elite, com psíquicos fortes.',
    esquema: [
      { parte: 'Armadura', cor: 'Prata', hex: '#8f989d', tinta: 'Vallejo 70.864 Natural Steel' },
      { parte: 'Sombra da prata', cor: 'Wash preto', hex: '#14171a', tinta: 'Citadel Nuln Oil' },
      { parte: 'Ornamentos', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Halberd energizado', cor: 'Azul luminoso', hex: '#4fa9d8', tinta: 'Citadel Lothern Blue' },
    ],
    base: 'Piso de titã ou pedra escura com runas. Deixe a base escura para a prata saltar.',
  },

  /* --- 40k / Chaos ---------------------------------------------- */
  {
    id: 'chaos-space-marines',
    destaque: true,
    nome: 'Chaos Space Marines',
    sistema: '40k',
    grupo: 'Chaos',
    cor: '#4a2130',
    resumo:
      'Traidores da Longa Guerra. Enorme liberdade de esquema de cor — cada Legião é uma paleta diferente.',
    esquema: [
      { parte: 'Armadura', cor: 'Escolha da legião', hex: '#4a2130', tinta: 'Varia por legião' },
      { parte: 'Trim', cor: 'Bronze envelhecido', hex: '#a87545', tinta: 'Vallejo 70.998 Bright Bronze + wash marrom' },
      { parte: 'Spikes / correntes', cor: 'Ferro sujo', hex: '#5d6266', tinta: 'Vallejo 70.865 Oily Steel' },
      { parte: 'Sangue seco', cor: 'Vermelho escuro', hex: '#5e2030', tinta: 'Vallejo 72.111 Nocturnal Red' },
    ],
    base: 'Terra queimada, crânios, escombro. Vale sujar mais que num exército Imperial.',
  },
  {
    id: 'death-guard',
    nome: 'Death Guard',
    sistema: '40k',
    grupo: 'Chaos',
    cor: '#6b7c59',
    resumo:
      'A peste de Nurgle. Lentos, resistentes e nojentos. Perdoa erro de pintura como nenhum outro exército — tudo pode virar textura.',
    esquema: [
      { parte: 'Armadura', cor: 'Verde pálido', hex: '#6b7c59', tinta: 'Citadel Death Guard Green' },
      { parte: 'Ferrugem', cor: 'Laranja óxido', hex: '#c96a1e', tinta: 'Citadel Ryza Rust' },
      { parte: 'Metais podres', cor: 'Bronze sujo', hex: '#6b4e3c', tinta: 'Vallejo 70.998 + wash marrom' },
      { parte: 'Carne exposta', cor: 'Rosa doentio', hex: '#b07a5a', tinta: 'Citadel Darkoath Flesh' },
      { parte: 'Fluidos', cor: 'Verde brilhante', hex: '#8fa055', tinta: 'Verniz brilhante + verde' },
    ],
    base: 'Lama, poças de gosma (resina/verniz brilhante), grama morta. Aqui o excesso é o estilo.',
  },
  {
    id: 'thousand-sons',
    nome: 'Thousand Sons',
    sistema: '40k',
    grupo: 'Chaos',
    cor: '#0f6b7a',
    resumo:
      'Feiticeiros de Tzeentch. Azul-turquesa e ouro, muito psíquico. Um dos esquemas mais bonitos e mais exigentes.',
    esquema: [
      { parte: 'Armadura', cor: 'Azul turquesa', hex: '#0f6b7a', tinta: 'Citadel Thousand Sons Blue' },
      { parte: 'Trim', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Panos', cor: 'Vermelho ou roxo', hex: '#7d2b4d', tinta: 'Citadel Screamer Pink' },
      { parte: 'Fogo psíquico', cor: 'Azul claro', hex: '#4fa9d8', tinta: 'Citadel Lothern Blue → branco' },
    ],
    base: 'Areia do Planeta Prospero / deserto vermelho, com fragmentos de arquitetura dourada.',
  },
  {
    id: 'world-eaters',
    destaque: true,
    nome: 'World Eaters',
    sistema: '40k',
    grupo: 'Chaos',
    cor: '#8f1f1c',
    resumo:
      'Sangue para o Deus do Sangue. Exército de corpo a corpo puro, sem sutileza. Pintura rápida e vermelha.',
    esquema: [
      { parte: 'Armadura', cor: 'Vermelho', hex: '#8f1f1c', tinta: 'Vallejo 70.926 Red' },
      { parte: 'Metais', cor: 'Bronze', hex: '#a87545', tinta: 'Vallejo 70.998 Bright Bronze' },
      { parte: 'Lâminas', cor: 'Aço', hex: '#8d9296', tinta: 'Vallejo 70.864 Natural Steel' },
      { parte: 'Sangue', cor: 'Sangue fresco', hex: '#7a0c10', tinta: 'Citadel Blood for the Blood God' },
    ],
    base: 'Terra árida rachada e crânios. Sangue na base só depois do verniz fosco.',
  },
  {
    id: 'chaos-daemons',
    nome: 'Chaos Daemons',
    sistema: '40k',
    grupo: 'Chaos',
    cor: '#5a2a5c',
    resumo:
      'Manifestações dos quatro Deuses. Cada deus é uma paleta radicalmente diferente — Khorne vermelho, Tzeentch azul/rosa, Nurgle verde, Slaanesh roxo.',
    esquema: [
      { parte: 'Pele', cor: 'Depende do deus', hex: '#5a2a5c', tinta: 'Contrast é o caminho mais rápido' },
      { parte: 'Chifres / garras', cor: 'Osso escuro', hex: '#b8a874', tinta: 'Citadel Skeleton Horde' },
      { parte: 'Armas', cor: 'Metal escuro', hex: '#565b60', tinta: 'Vallejo 70.863 Gunmetal Grey' },
    ],
    base: 'Terreno da Warp: cor irreal, distorcida. Boa desculpa para experimentar cores impossíveis.',
  },

  /* --- 40k / Xenos ---------------------------------------------- */
  {
    id: 'necrons',
    nome: 'Necrons',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#a3a8ab',
    resumo:
      'Máquinas antigas que se reconstroem. Metálicos e efeitos de energia dominam. Pintura rápida com drybrush + wash.',
    esquema: [
      { parte: 'Corpo', cor: 'Metal escuro', hex: '#7b8083', tinta: 'Citadel Leadbelcher + Nuln Oil' },
      { parte: 'Realce', cor: 'Prata clara', hex: '#c3c8cb', tinta: 'Citadel Runefang Steel (drybrush)' },
      { parte: 'Energia', cor: 'Verde tóxico', hex: '#63c34e', tinta: 'Citadel Moot Green → branco no centro' },
      { parte: 'Detalhe', cor: 'Preto', hex: '#231f20', tinta: 'Vallejo 70.950 Black' },
    ],
    base: 'Areia de tumba, hieróglifos, placas de metal necrontyr. Areia clara contrasta bem com o corpo metálico.',
  },
  {
    id: 'orks',
    destaque: true,
    nome: 'Orks',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#4a9648',
    resumo:
      'Verdes, numerosos e barulhentos. O exército mais divertido de pintar rápido: quanto mais tosco, mais certo.',
    esquema: [
      { parte: 'Pele', cor: 'Verde orky', hex: '#4a9648', tinta: 'Vallejo 72.030 Goblin Green' },
      { parte: 'Panos', cor: 'Marrom sujo', hex: '#6a4530', tinta: 'Vallejo 72.041 Beasty Brown' },
      { parte: 'Metal', cor: 'Ferro enferrujado', hex: '#5f6569', tinta: 'Gunmetal + Ryza Rust' },
      { parte: 'Cor do clã', cor: 'Vermelho (vai mais rápido)', hex: '#c02024', tinta: 'Vallejo 72.008 Bloody Red' },
      { parte: 'Dentes', cor: 'Osso', hex: '#cec19a', tinta: 'Vallejo 70.918 Ivory' },
    ],
    base: 'Sucata, terra batida, chapas de metal. Nada precisa estar alinhado.',
  },
  {
    id: 'tyranids',
    destaque: true,
    nome: 'Tyranids',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#7d2b4d',
    resumo:
      'Enxame devorador. Modelos orgânicos, ótimos para Contrast: casco de uma cor, carne de outra e pronto.',
    esquema: [
      { parte: 'Carapaça', cor: 'Roxo / osso', hex: '#7d2b4d', tinta: 'Citadel Screamer Pink' },
      { parte: 'Carne', cor: 'Bege pálido', hex: '#d9cba6', tinta: 'Vallejo 72.034 Bone White' },
      { parte: 'Garras', cor: 'Osso escuro', hex: '#b8a874', tinta: 'Citadel Skeleton Horde' },
      { parte: 'Detalhes viscosos', cor: 'Vermelho escuro', hex: '#83201f', tinta: 'Vallejo 70.946 Dark Red' },
    ],
    base: 'Biomassa alienígena, esporos, ou o planeta que está sendo devorado — cinza e morto.',
  },
  {
    id: 'tau',
    nome: "T'au Empire",
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#b0a160',
    resumo:
      'Tiro a longa distância e battlesuits. Superfícies grandes e lisas — o exército ideal para aerógrafo.',
    esquema: [
      { parte: 'Armadura', cor: 'Bege T\'au', hex: '#b0a160', tinta: 'Citadel Zandri Dust' },
      { parte: 'Painéis', cor: 'Marrom escuro', hex: '#493033', tinta: 'Citadel Rhinox Hide' },
      { parte: 'Metais', cor: 'Aço escuro', hex: '#565b60', tinta: 'Vallejo 70.863 Gunmetal Grey' },
      { parte: 'Lentes / sensores', cor: 'Vermelho', hex: '#c51f1b', tinta: 'Citadel Evil Sunz Scarlet' },
    ],
    base: 'Areia de deserto septentrional ou piso urbano limpo. Combina com o visual "high tech militar".',
  },
  {
    id: 'aeldari',
    nome: 'Aeldari (Craftworlds)',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#12727f',
    resumo:
      'Elfos espaciais, rápidos e frágeis. Formas lisas e curvas pedem transições suaves — ótimo treino de blending.',
    esquema: [
      { parte: 'Armadura', cor: 'Cor do Craftworld', hex: '#12727f', tinta: 'Citadel Sotek Green (Iyanden = amarelo)' },
      { parte: 'Placas secundárias', cor: 'Osso', hex: '#d6d2a6', tinta: 'Citadel Screaming Skull' },
      { parte: 'Gemas', cor: 'Vermelho ou verde', hex: '#c51f1b', tinta: 'Gema: escuro embaixo, claro em cima, ponto branco' },
      { parte: 'Metais', cor: 'Prata clara', hex: '#a3a8ab', tinta: 'Citadel Ironbreaker' },
    ],
    base: 'Terreno alienígena limpo, cristal, ou pedra clara. Bases sujas brigam com a estética élfica.',
  },
  {
    id: 'drukhari',
    nome: 'Drukhari',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#4b3d5e',
    resumo:
      'Elfos sádicos de Commorragh. Rápidos, letais e frágeis. Muito couro, lâmina e veneno.',
    esquema: [
      { parte: 'Armadura', cor: 'Roxo escuro', hex: '#4b3d5e', tinta: 'Citadel Naggaroth Night' },
      { parte: 'Pele', cor: 'Pálida', hex: '#ddd9c3', tinta: 'Citadel Pallid Wych Flesh' },
      { parte: 'Lâminas', cor: 'Aço frio', hex: '#a3a8ab', tinta: 'Citadel Ironbreaker' },
      { parte: 'Veneno', cor: 'Verde ácido', hex: '#8fbf3f', tinta: 'Vallejo 72.032 Scorpy Green' },
    ],
    base: 'Piso da cidade escura: metal preto, correntes, respingos. Escuro e sujo.',
  },
  {
    id: 'genestealer-cults',
    nome: 'Genestealer Cults',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#6b7c59',
    resumo:
      'Culto infiltrado, mineradores e híbridos. Roupa civil suja + pele alienígena roxa.',
    esquema: [
      { parte: 'Macacão', cor: 'Verde militar sujo', hex: '#5b6337', tinta: 'Vallejo 70.894 Camo Olive Green' },
      { parte: 'Pele híbrida', cor: 'Roxo acinzentado', hex: '#756d7e', tinta: 'Citadel Daemonette Hide' },
      { parte: 'Metal', cor: 'Ferro sujo', hex: '#5d6266', tinta: 'Vallejo 70.865 Oily Steel' },
      { parte: 'Capacete', cor: 'Amarelo mineração', hex: '#e0a81c', tinta: 'Citadel Averland Sunset' },
    ],
    base: 'Túnel de mina, cascalho, trilhos. Poeira clara nas botas vende a história.',
  },
  {
    id: 'leagues-of-votann',
    nome: 'Leagues of Votann',
    sistema: '40k',
    grupo: 'Xenos',
    cor: '#c99a34',
    resumo:
      'Anões espaciais mineradores. Poucos modelos, muito resistentes, com estética industrial.',
    esquema: [
      { parte: 'Armadura', cor: 'Bronze/ouro', hex: '#c99a34', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Macacão', cor: 'Azul industrial', hex: '#22405f', tinta: 'Vallejo 70.930 Dark Blue' },
      { parte: 'Metais', cor: 'Aço', hex: '#888c8f', tinta: 'Citadel Leadbelcher' },
      { parte: 'Barba', cor: 'Grisalho ou ruivo', hex: '#a5552a', tinta: 'Vallejo 70.981 Orange Brown' },
    ],
    base: 'Rocha de asteroide, minério exposto, placa metálica.',
  },

  /* --- Age of Sigmar -------------------------------------------- */
  {
    id: 'stormcast-eternals',
    nome: 'Stormcast Eternals',
    sistema: 'aos',
    grupo: 'Order',
    cor: '#c8a54b',
    resumo:
      'Os campeões de Sigmar. Armadura dourada e azul, modelos grandes e heroicos. A porta de entrada do AoS.',
    esquema: [
      { parte: 'Armadura', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold sobre marrom' },
      { parte: 'Placas azuis', cor: 'Azul', hex: '#16548c', tinta: 'Vallejo 70.925 Blue' },
      { parte: 'Panos', cor: 'Vermelho', hex: '#9a1115', tinta: 'Vallejo 70.926 Red' },
      { parte: 'Detalhes', cor: 'Prata', hex: '#a3a8ab', tinta: 'Citadel Ironbreaker' },
    ],
    base: 'Pedra de Azyr, ruína dourada, ou grama verde clássica com pedras claras.',
  },
  {
    id: 'nighthaunt',
    nome: 'Nighthaunt',
    sistema: 'aos',
    grupo: 'Death',
    cor: '#45b0a0',
    resumo:
      'Fantasmas de Nagash. Modelos etéreos — a pintura é quase toda transição de translúcido, e Contrast resolve muito.',
    esquema: [
      { parte: 'Manto etéreo', cor: 'Turquesa → branco', hex: '#45b0a0', tinta: 'Citadel Temple Guard Blue → branco' },
      { parte: 'Armadura', cor: 'Preto azulado', hex: '#17191b', tinta: 'Vallejo 70.995 German Grey' },
      { parte: 'Ossos', cor: 'Osso', hex: '#c6be8e', tinta: 'Citadel Ushabti Bone' },
      { parte: 'Correntes', cor: 'Ferro escuro', hex: '#565b60', tinta: 'Vallejo 70.863 Gunmetal Grey' },
    ],
    base: 'Base escura, quase preta, para o fantasma brilhar. Lápide e névoa (algodão/pasta) opcionais.',
  },
  {
    id: 'skaven',
    nome: 'Skaven',
    sistema: 'aos',
    grupo: 'Chaos',
    cor: '#604f33',
    resumo:
      'Homens-rato em quantidade absurda. Exército de horda: pintura em lote e Contrast salvam sua sanidade.',
    esquema: [
      { parte: 'Pelo', cor: 'Marrom', hex: '#6a4530', tinta: 'Citadel Wyldwood (contrast)' },
      { parte: 'Panos', cor: 'Cinza sujo', hex: '#5f6468', tinta: 'Vallejo 72.048 Sombre Grey' },
      { parte: 'Pele/cauda', cor: 'Rosa acinzentado', hex: '#b07a5a', tinta: 'Citadel Darkoath Flesh' },
      { parte: 'Warpstone', cor: 'Verde tóxico', hex: '#63c34e', tinta: 'Citadel Moot Green' },
    ],
    base: 'Esgoto, tábuas podres, lama. Quanto mais sujo, melhor.',
  },
  {
    id: 'orruk-warclans',
    nome: 'Orruk Warclans',
    sistema: 'aos',
    grupo: 'Destruction',
    cor: '#4a9648',
    resumo:
      'Orruks brutais em três estilos (Ironjawz, Kruleboyz, Bonesplitterz). Modelos grandes e rápidos de pintar.',
    esquema: [
      { parte: 'Pele', cor: 'Verde', hex: '#4a9648', tinta: 'Citadel Ork Flesh (contrast)' },
      { parte: 'Armadura', cor: 'Ferro escuro', hex: '#5f6569', tinta: 'Citadel Leadbelcher + Agrax' },
      { parte: 'Couro', cor: 'Marrom', hex: '#7a5231', tinta: 'Vallejo 70.871 Leather Brown' },
      { parte: 'Detalhe do clã', cor: 'Amarelo', hex: '#e0a81c', tinta: 'Citadel Averland Sunset' },
    ],
    base: 'Terra pisoteada, pedra quebrada, grama alta.',
  },
  {
    id: 'cities-of-sigmar',
    nome: 'Cities of Sigmar',
    sistema: 'aos',
    grupo: 'Order',
    cor: '#22417d',
    resumo:
      'Exército humano clássico de fantasia: infantaria, artilharia, cavalaria. Total liberdade de esquema por cidade.',
    esquema: [
      { parte: 'Uniforme', cor: 'Azul ou vermelho da cidade', hex: '#22417d', tinta: 'Vallejo 70.925 Blue' },
      { parte: 'Armadura', cor: 'Aço', hex: '#8d9296', tinta: 'Vallejo 70.864 Natural Steel' },
      { parte: 'Couro', cor: 'Marrom', hex: '#7a5231', tinta: 'Vallejo 70.871 Leather Brown' },
      { parte: 'Pele', cor: 'Pele base', hex: '#d6a077', tinta: 'Vallejo 70.815 Basic Skintone' },
    ],
    base: 'Calçada de cidade, grama entre pedras, ou terra de campo de batalha.',
  },
  {
    id: 'soulblight-gravelords',
    nome: 'Soulblight Gravelords',
    sistema: 'aos',
    grupo: 'Death',
    cor: '#493033',
    resumo:
      'Vampiros e suas legiões de mortos. Ossos, panos escuros e pele pálida.',
    esquema: [
      { parte: 'Ossos', cor: 'Osso', hex: '#c6be8e', tinta: 'Citadel Skeleton Horde (contrast)' },
      { parte: 'Pele vampírica', cor: 'Pálida azulada', hex: '#ddd9c3', tinta: 'Citadel Pallid Wych Flesh' },
      { parte: 'Panos', cor: 'Vinho escuro', hex: '#4c2a34', tinta: 'Citadel Barak-Nar Burgundy' },
      { parte: 'Metais', cor: 'Ferro velho', hex: '#5d6266', tinta: 'Vallejo 70.865 Oily Steel' },
    ],
    base: 'Terra de cemitério, lápides, raízes secas.',
  },
  {
    id: 'maggotkin-of-nurgle',
    nome: 'Maggotkin of Nurgle',
    sistema: 'aos',
    grupo: 'Chaos',
    cor: '#6b7c59',
    resumo:
      'A corte da praga em AoS. Tanto quanto Death Guard, é o exército que mais perdoa e mais recompensa textura.',
    esquema: [
      { parte: 'Pele', cor: 'Verde doentio', hex: '#8a9a4a', tinta: 'Citadel Plaguebearer Flesh' },
      { parte: 'Feridas', cor: 'Rosa vermelho', hex: '#a8515c', tinta: 'Vallejo 70.944 Old Rose' },
      { parte: 'Metais', cor: 'Ferrugem', hex: '#7a4a2a', tinta: 'Ryza Rust sobre gunmetal' },
      { parte: 'Gosma', cor: 'Verde brilhante', hex: '#5c6b3c', tinta: 'Verniz brilhante tingido' },
    ],
    base: 'Pântano, lama com poça brilhante, cogumelo.',
  },
  {
    id: 'seraphon',
    nome: 'Seraphon',
    sistema: 'aos',
    grupo: 'Order',
    cor: '#12727f',
    resumo:
      'Lagartos estelares. Pele azul/verde e ouro. Modelos grandes com áreas amplas — bom para experimentar.',
    esquema: [
      { parte: 'Pele', cor: 'Azul turquesa', hex: '#12727f', tinta: 'Citadel Sotek Green' },
      { parte: 'Escamas', cor: 'Azul claro', hex: '#45b0a0', tinta: 'Citadel Temple Guard Blue' },
      { parte: 'Ouro', cor: 'Ouro', hex: '#c8a54b', tinta: 'Vallejo 70.996 Gold' },
      { parte: 'Penas', cor: 'Vermelho ou amarelo', hex: '#c51f1b', tinta: 'Citadel Evil Sunz Scarlet' },
    ],
    base: 'Selva, pedra de templo asteca, folhagem densa.',
  },
  {
    id: 'gloomspite-gitz',
    nome: 'Gloomspite Gitz',
    sistema: 'aos',
    grupo: 'Destruction',
    cor: '#5fa271',
    resumo:
      'Goblins da lua ruim, cogumelos e trolls. Paleta lunar: azul, verde e amarelo de cogumelo.',
    esquema: [
      { parte: 'Pele', cor: 'Verde claro', hex: '#5fa271', tinta: 'Citadel Skarsnik Green' },
      { parte: 'Capuz', cor: 'Azul noite', hex: '#1b2f5c', tinta: 'Vallejo 70.930 Dark Blue' },
      { parte: 'Cogumelos', cor: 'Amarelo pálido', hex: '#f0d95c', tinta: 'Vallejo 72.002 Pale Yellow' },
      { parte: 'Metal', cor: 'Ferro sujo', hex: '#5d6266', tinta: 'Vallejo 70.865 Oily Steel' },
    ],
    base: 'Caverna, cogumelo, pedra úmida. Musgo azulado combina com a lua ruim.',
  },
]

export const FACCOES_POR_ID = new Map(FACCOES.map((f) => [f.id, f]))

export const SISTEMA_LABEL: Record<Sistema, string> = {
  '40k': 'Warhammer 40.000',
  aos: 'Age of Sigmar',
}

/* ================================================================== */
/* UNIDADES                                                            */
/* ================================================================== */

export const UNIDADES: Unidade[] = [
  /* --- Ultramarines / Space Marines ----------------------------- */
  {
    id: 'sm-intercessors',
    faccaoId: 'space-marines',
    nome: 'Intercessor Squad',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 80,
    pontosPara: '5 modelos',
    habilidades: [
      'Oath of Moment: escolhe um alvo por turno e ganha re-roll de hits contra ele.',
      'Bolt rifle com Assault ou Heavy dependendo da configuração.',
      'Objective Secured na prática: corpo resistente para segurar objetivo.',
    ],
    cores: ['Azul de armadura', 'Osso na ombreira', 'Prata na arma', 'Vermelho na lente'],
    dicasPintura: [
      'Comece pelo azul com aerógrafo ou spray colorido — são muitas peças iguais.',
      'A ombreira direita é o lugar da insígnia do capítulo. Deixe para o fim, com a peça já colada.',
      'Lente vermelha: preto no fundo, vermelho no meio, ponto de branco no canto superior.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano com laje quebrada. Areia média + pedaço de cortiça pintado de cinza.',
  },
  {
    id: 'sm-terminators',
    faccaoId: 'space-marines',
    nome: 'Terminator Squad',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 185,
    pontosPara: '5 modelos',
    habilidades: [
      'Deep Strike: chega pelo teleporte a 9" do inimigo.',
      'Armadura 2+ com invulnerável 4+ — aguenta muito castigo.',
      'Storm bolter + power fist: bom contra infantaria pesada.',
    ],
    cores: ['Azul de armadura', 'Ouro nos ornamentos', 'Osso no capacete de sargento'],
    dicasPintura: [
      'Superfície grande e lisa: é a unidade ideal para praticar luz de quina (edge highlight).',
      'Os ornamentos dourados aparecem muito — vale um wash marrom para dar profundidade.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Piso de nave espacial ou escombro pesado — o modelo é grande e pede base "importante".',
  },
  {
    id: 'sm-captain',
    faccaoId: 'space-marines',
    nome: 'Captain in Gravis Armour',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Leader: pode se juntar a uma unidade e melhorá-la.',
      'Concede re-roll de hits para a unidade que lidera.',
      'Perfil de resistência alto para um personagem de infantaria.',
    ],
    cores: ['Azul', 'Ouro', 'Vermelho no penacho', 'Branco no pergaminho'],
    dicasPintura: [
      'É um modelo de destaque: gaste nele o tempo que não gastou nos Intercessors.',
      'Penacho vermelho: base escura, camadas em vermelho vivo, luz alaranjada só nas pontas.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Detalhe narrativo — crânio inimigo, bandeira caída. Ele é o foco visual da mesa.',
  },
  {
    id: 'sm-redemptor',
    faccaoId: 'space-marines',
    nome: 'Redemptor Dreadnought',
    papel: 'Veículo / Walker',
    modelos: '1 modelo',
    pontos: 210,
    pontosPara: '1 modelo',
    habilidades: [
      'Plataforma de tiro pesada com boa resistência.',
      'Duas armas grandes + lança-chamas de suporte.',
      'Vale como âncora de fogo no meio do tabuleiro.',
    ],
    cores: ['Azul', 'Prata nos pistões', 'Ouro no sarcófago', 'Preto nos cabos'],
    dicasPintura: [
      'Monte em subconjuntos: braços, corpo e pernas separados. Depois de colado você não alcança o interior.',
      'Pistões metálicos: prata brilhante e depois um wash preto bem localizado.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Base grande pede composição: escombro em alturas diferentes, cratera, ou detrito de veículo.',
  },

  /* --- Blood Angels --------------------------------------------- */
  {
    id: 'ba-death-company',
    faccaoId: 'blood-angels',
    nome: 'Death Company',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 105,
    pontosPara: '5 modelos',
    habilidades: [
      'Ataques extras no corpo a corpo — a unidade de assalto assinatura dos Blood Angels.',
      'Ignora ferimentos em certos casos: entram na luta mesmo desfalcados.',
      'Frágeis a tiro: precisam chegar rápido, de preferência com transporte.',
    ],
    cores: ['Preto na armadura', 'Vermelho nos detalhes', 'Osso nas relíquias', 'Ouro nas insígnias'],
    dicasPintura: [
      'Preto não é preto: use cinza azulado nas quinas, senão o modelo vira uma silhueta chapada.',
      'Os respingos de sangue são a assinatura — mas só depois do verniz fosco, senão brilha errado.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro e ossos. Base clara faz o preto da armadura saltar.',
  },
  {
    id: 'ba-sanguinary-guard',
    faccaoId: 'blood-angels',
    nome: 'Sanguinary Guard',
    papel: 'Elite',
    modelos: '3 a 6 modelos',
    pontos: 195,
    pontosPara: '5 modelos',
    habilidades: [
      'Jump pack: mobilidade alta, entra pelo alto.',
      'Armadura dourada com bom salvamento e ataques fortes.',
      'Unidade de corte cirúrgico: entra, mata algo grande, morre bonito.',
    ],
    cores: ['Ouro', 'Vermelho', 'Osso nas asas', 'Verde nas gemas'],
    dicasPintura: [
      'Ouro sobre base marrom escura (não sobre preto) — fica mais rico e cobre em menos camadas.',
      'As asas são grandes e lisas: pinte separadas do corpo antes de colar.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Ruína elevada ou mármore — a unidade é heroica, a base deve acompanhar.',
  },

  /* --- Death Guard ---------------------------------------------- */
  {
    id: 'dg-plague-marines',
    faccaoId: 'death-guard',
    nome: 'Plague Marines',
    papel: 'Battleline',
    modelos: '5 ou 7 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Disgustingly Resilient: ignora parte dos ferimentos recebidos.',
      'Armas de peste com efeitos anti-infantaria.',
      'Lentos: 5" de movimento. Andam para frente e absorvem dano.',
    ],
    cores: ['Verde pálido', 'Ferrugem laranja', 'Bronze sujo', 'Carne exposta'],
    dicasPintura: [
      'Aqui erro vira textura: manchas irregulares de wash marrom só melhoram o modelo.',
      'Ferrugem: esponja com laranja escuro nas quinas antes do wash final.',
      'Gosma: verniz brilhante misturado com um pouco de verde, aplicado só nos pontos de escorrimento.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Lama com poça brilhante. Textura de barro + verniz brilhante nas depressões.',
  },
  {
    id: 'dg-blightlord',
    faccaoId: 'death-guard',
    nome: 'Blightlord Terminators',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 200,
    pontosPara: '5 modelos',
    habilidades: [
      'Deep Strike com resistência muito alta.',
      'Combos de armas de peste em curta distância.',
      'A unidade que mais aguenta castigo do codex.',
    ],
    cores: ['Verde pálido', 'Bronze', 'Ferrugem', 'Chifres em osso'],
    dicasPintura: [
      'Superfície enorme: perfeito para experimentar oxidação e verdete (verdigris).',
      'Não pinte tudo igual — variação de sujeira entre os 5 modelos é o que dá vida à unidade.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Pântano espesso, raiz podre, mosca. Base pesada combina com a silhueta.',
  },

  /* --- Necrons -------------------------------------------------- */
  {
    id: 'nec-warriors',
    faccaoId: 'necrons',
    nome: 'Necron Warriors',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 100,
    pontosPara: '10 modelos',
    habilidades: [
      'Reanimation Protocols: modelos destruídos voltam no começo do turno.',
      'Gauss flayer com boa penetração para uma arma básica.',
      'Barato e difícil de remover permanentemente.',
    ],
    cores: ['Metal escuro', 'Prata clara no realce', 'Verde de energia'],
    dicasPintura: [
      'A unidade mais rápida de pintar do jogo: spray Leadbelcher, wash Nuln Oil, drybrush prata. Pronto.',
      'O verde de energia é o único ponto de cor — capriche nele e o modelo inteiro sobe de nível.',
      'Truque: pinte o verde deixando o centro quase branco, dá impressão de luz própria.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Areia clara de tumba com placa de metal gravada. O contraste claro/metal fica excelente.',
  },
  {
    id: 'nec-overlord',
    faccaoId: 'necrons',
    nome: 'Overlord',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 85,
    pontosPara: '1 modelo',
    habilidades: [
      'Leader: reforça uma unidade de Warriors ou Immortals.',
      'Melhora os Reanimation Protocols da unidade que lidera.',
      'Bom em duelo contra personagens médios.',
    ],
    cores: ['Metal escuro', 'Ouro no manto', 'Verde de energia'],
    dicasPintura: [
      'O ouro do Overlord separa ele visualmente da tropa — use ouro quente contra o metal frio.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Hieróglifo gravado, degrau de tumba. Uma peça arquitetônica marca hierarquia.',
  },

  /* --- Orks ----------------------------------------------------- */
  {
    id: 'ork-boyz',
    faccaoId: 'orks',
    nome: 'Boyz',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 85,
    pontosPara: '10 modelos',
    habilidades: [
      'Waaagh!: em certos turnos ganham ataques e movimento extras.',
      'Muitos ataques baratos no corpo a corpo.',
      'Quanto maior a unidade, melhor eles lutam.',
    ],
    cores: ['Verde de pele', 'Marrom nos panos', 'Metal enferrujado', 'Vermelho do clã'],
    dicasPintura: [
      'Pinte em lote de 10: uma cor por vez em todos os modelos, sem exceção.',
      'Contrast Ork Flesh sobre primer branco/osso resolve a pele em uma passada.',
      'Não perca tempo em simetria. Orks tortos são orks certos.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terra batida com sucata: parafuso, chapa amassada, cápsula de bala.',
  },
  {
    id: 'ork-warboss',
    faccaoId: 'orks',
    nome: 'Warboss',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 85,
    pontosPara: '1 modelo',
    habilidades: [
      'Leader de uma unidade de Boyz ou Nobz.',
      'Ataques pesados no corpo a corpo — mata veículo leve sozinho.',
      'Ativa Waaagh! junto com a unidade.',
    ],
    cores: ['Verde de pele', 'Vermelho', 'Ouro/latão nas placas', 'Ferro'],
    dicasPintura: [
      'O Warboss é o maior modelo da lista de infantaria: mais tempo de pintura se justifica aqui.',
      'Dentes e presas em osso claro chamam atenção para o rosto.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Sucata empilhada, capacete imperial amassado embaixo da bota — conta uma história.',
  },

  /* --- Tyranids ------------------------------------------------- */
  {
    id: 'tyr-termagants',
    faccaoId: 'tyranids',
    nome: 'Termagants',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 60,
    pontosPara: '10 modelos',
    habilidades: [
      'Muito baratos: enchem o tabuleiro e seguram objetivos.',
      'Podem voltar como reforço perto de um Tervigon.',
      'Fleshborer com volume de tiros contra infantaria leve.',
    ],
    cores: ['Carapaça roxa', 'Carne bege', 'Garras escuras'],
    dicasPintura: [
      'O exército onde Contrast mais economiza tempo: uma cor no casco, outra na carne, feito.',
      'Faça em lotes de 20. Pinte a carne primeiro (cor mais clara), a carapaça por cima é mais fácil de corrigir.',
    ],
    baseTamanho: '28mm',
    baseTerreno: 'Biomassa alienígena ou terra devastada. Textura orgânica reforça o tema.',
  },
  {
    id: 'tyr-carnifex',
    faccaoId: 'tyranids',
    nome: 'Carnifex',
    papel: 'Monstro',
    modelos: '1 modelo',
    pontos: 115,
    pontosPara: '1 modelo',
    habilidades: [
      'Monstro resistente com muitos ferimentos.',
      'Configurável para corpo a corpo ou tiro pesado.',
      'Ameaça de meio de tabuleiro que absorve fogo do oponente.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras', 'Detalhes viscosos'],
    dicasPintura: [
      'Carapaça grande e curva: é onde aerógrafo ou drybrush pesado brilham.',
      'Deixe a carne mais clara na barriga e mais escura nas costas — imita luz natural.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Cratera, esporo, resto de vegetação consumida.',
  },

  /* --- Astra Militarum ------------------------------------------ */
  {
    id: 'am-infantry-squad',
    faccaoId: 'astra-militarum',
    nome: 'Cadian Shock Troops',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 65,
    pontosPara: '10 modelos',
    habilidades: [
      'Ordens do oficial melhoram tiro ou movimento.',
      'Volume de lasgun: não é forte, é numeroso.',
      'Arma especial e pesada dentro do esquadrão.',
    ],
    cores: ['Verde de uniforme', 'Cáqui na armadura', 'Pele', 'Couro nas bolsas'],
    dicasPintura: [
      'Batch painting obrigatório: 20 modelos, uma cor por vez, sempre.',
      'Um wash marrom no uniforme inteiro resolve sombra de todo mundo de uma vez.',
      'Rosto: pele base, wash, e só uma luz na testa e no nariz. Não tente pintar olhos em 20 modelos.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terra de trincheira, saco de areia, arame. Pigmento de poeira nas botas.',
  },
  {
    id: 'am-leman-russ',
    faccaoId: 'astra-militarum',
    nome: 'Leman Russ Battle Tank',
    papel: 'Veículo',
    modelos: '1 modelo',
    pontos: 175,
    pontosPara: '1 modelo',
    habilidades: [
      'Canhão principal de alto calibre com bom alcance.',
      'Vários sponsons e armas de casco configuráveis.',
      'Resistente de frente, vulnerável pelos lados.',
    ],
    cores: ['Verde militar', 'Metal nas esteiras', 'Poeira na saia lateral'],
    dicasPintura: [
      'Superfície plana enorme: é o modelo ideal para aerógrafo e para modulação de cor.',
      'Chipping (lascado) com esponja e um marrom escuro nas quinas envelhece o tanque instantaneamente.',
      'Pigmento de poeira só na parte baixa. Poeira em cima da torre parece erro.',
    ],
    baseTamanho: 'Sem base (o veículo apoia direto)',
    baseTerreno: 'Não usa base — mas as esteiras devem receber a mesma terra do resto do exército.',
  },

  /* --- T'au ------------------------------------------------------ */
  {
    id: 'tau-fire-warriors',
    faccaoId: 'tau',
    nome: 'Strike Team (Fire Warriors)',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 75,
    pontosPara: '10 modelos',
    habilidades: [
      'Pulse rifle com alcance longo para infantaria básica.',
      'Se beneficia de marcação de alvo (markerlight).',
      'Fraco no corpo a corpo — a doutrina é atirar e recuar.',
    ],
    cores: ['Bege da armadura', 'Marrom no macacão', 'Vermelho nos sensores'],
    dicasPintura: [
      'Placas grandes e lisas: use aerógrafo para o bege e mantenha a superfície limpa.',
      'A separação entre placa bege e macacão escuro é o que define o modelo — linhas limpas importam.',
    ],
    baseTamanho: '28mm',
    baseTerreno: 'Deserto claro ou piso urbano limpo. Evite muita sujeira: quebra o visual high tech.',
  },
  {
    id: 'tau-crisis',
    faccaoId: 'tau',
    nome: 'Crisis Battlesuits',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 110,
    pontosPara: '3 modelos',
    habilidades: [
      'Deep Strike com armamento pesado configurável.',
      'Podem atirar e recuar no mesmo turno em certas configurações.',
      'O núcleo de dano da maioria das listas T\'au.',
    ],
    cores: ['Bege', 'Marrom escuro nos painéis', 'Metal nos jatos', 'Vermelho nas lentes'],
    dicasPintura: [
      'Monte sem colar os braços e as armas: pinte separado e encaixe no final.',
      'Bocais dos jatos: metal escuro por dentro com fuligem preta na saída.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Base com pino de voo ou apoio baixo — o battlesuit deve parecer aterrissando.',
  },

  /* --- Adeptus Custodes ----------------------------------------- */
  {
    id: 'cus-custodian-guard',
    faccaoId: 'adeptus-custodes',
    nome: 'Custodian Guard',
    papel: 'Battleline',
    modelos: '4 ou 5 modelos',
    pontos: 215,
    pontosPara: '5 modelos',
    habilidades: [
      'Armadura 2+ com invulnerável — cada modelo vale por vários marines.',
      'Guardian spear é boa no tiro e no corpo a corpo.',
      'Unidade pequena: cada baixa dói muito.',
    ],
    cores: ['Ouro', 'Vermelho no penacho', 'Preto nos panos', 'Aço na lâmina'],
    dicasPintura: [
      'Ouro é o modelo inteiro: invista numa boa tinta metálica e faça a sombra com wash marrom, não preto.',
      'Base marrom avermelhada por baixo do ouro deixa o metal mais quente e rico.',
      'São poucos modelos: dá para caprichar em cada um sem cansar.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Mármore do Palácio Imperial: massa branca lixada com veios cinza a pincel fino.',
  },

  /* --- Stormcast Eternals --------------------------------------- */
  {
    id: 'sce-liberators',
    faccaoId: 'stormcast-eternals',
    nome: 'Liberators',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 115,
    pontosPara: '5 modelos',
    habilidades: [
      'Boa resistência com escudo e armadura pesada.',
      'Unidade de linha padrão que segura objetivo.',
      'Melhoram bastante liderados por um herói.',
    ],
    cores: ['Ouro na armadura', 'Azul nas placas', 'Vermelho nos panos'],
    dicasPintura: [
      'O ouro cobre a maior parte: comece com spray Retributor Armour e ganhe horas.',
      'As placas azuis e o pano vermelho são o que evita o modelo virar um borrão dourado.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Pedra de Azyr clara ou grama sobre pedra. Base clara equilibra o dourado.',
  },

  /* --- Nighthaunt ------------------------------------------------ */
  {
    id: 'nh-chainrasps',
    faccaoId: 'nighthaunt',
    nome: 'Chainrasp Horde',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 105,
    pontosPara: '10 modelos',
    habilidades: [
      'Etéreo: ignora modificadores de rend em certos casos.',
      'Barato e numeroso, bom para segurar terreno.',
      'Melhora perto de heróis Nighthaunt.',
    ],
    cores: ['Turquesa etérea', 'Branco na ponta do manto', 'Osso no crânio'],
    dicasPintura: [
      'O gradiente é tudo: escuro embaixo, quase branco na ponta. Faça com drybrush ou glaze, não com camada dura.',
      'Contrast turquesa sobre primer branco já entrega 80% do efeito etéreo.',
      'Deixe a base bem escura: o fantasma precisa do contraste para "brilhar".',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Base preta com um pouco de névoa clara na borda. Menos é mais.',
  },

  /* --- Thousand Sons -------------------------------------------- */
  {
    id: 'ts-rubric-marines',
    faccaoId: 'thousand-sons',
    nome: 'Rubric Marines',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 115,
    pontosPara: '5 modelos',
    habilidades: [
      'All is Dust: reduz o dano de armas de baixo calibre.',
      'Inferno bolter ignora parte da armadura inimiga.',
      'Lentos mas muito resistentes a tiro leve.',
    ],
    cores: ['Azul turquesa', 'Ouro no trim', 'Vermelho nos panos', 'Azul claro no fogo psíquico'],
    dicasPintura: [
      'O trim dourado é fino e longo: use pincel de ponta boa e apoie a mão. É o que define a unidade.',
      'A poeira saindo da armadura pode ser sugerida com um drybrush bege bem leve nas juntas.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Areia vermelha de Prospero com fragmento de coluna dourada.',
  },

  /* --- Dark Angels ---------------------------------------------- */
  {
    id: 'da-deathwing-knights',
    faccaoId: 'dark-angels',
    nome: 'Deathwing Knights',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 250,
    pontosPara: '5 modelos',
    habilidades: [
      'Terminators de corpo a corpo com salvamento muito alto.',
      'Maces of Absolution atingem forte contra infantaria pesada.',
      'Ganham resistência extra quando ativam sua regra de postura defensiva.',
    ],
    cores: ['Osso nas placas', 'Verde escuro nos detalhes', 'Ouro nos ornamentos', 'Vermelho nos panos'],
    dicasPintura: [
      'O osso é a cor dominante: comece por uma base bege e vá subindo até quase branco nas quinas.',
      'Osso sujo fica melhor que osso limpo — um wash marrom bem localizado nas frestas envelhece a armadura.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Laje escura de fortaleza-monastério; o contraste faz o osso saltar.',
  },
  {
    id: 'da-ravenwing-bikers',
    faccaoId: 'dark-angels',
    nome: 'Ravenwing Outriders',
    papel: 'Ataque rápido',
    modelos: '3 ou 6 modelos',
    pontos: 90,
    pontosPara: '3 modelos',
    habilidades: [
      'Movimento alto para tomar objetivo cedo e incomodar o flanco.',
      'Tiro em movimento sem penalidade.',
      'Frágeis se ficarem parados no campo aberto.',
    ],
    cores: ['Preto na armadura e na moto', 'Branco nas asas do capacete', 'Prata no motor'],
    dicasPintura: [
      'Pinte a moto e o piloto separados antes de montar — depois não se alcança o meio da máquina.',
      'Preto sobre preto some: use cinza azulado nas quinas para a silhueta aparecer.',
    ],
    baseTamanho: '75x42mm oval',
    baseTerreno: 'Estrada ou terra batida com marca de pneu riscada na massa ainda mole.',
  },
  {
    id: 'da-azrael',
    faccaoId: 'dark-angels',
    nome: 'Azrael',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 105,
    pontosPara: '1 modelo',
    habilidades: [
      'Concede invulnerável à unidade que lidera.',
      'Melhora o desempenho de tiro dos Dark Angels próximos.',
      'Um dos personagens de infantaria mais completos do jogo.',
    ],
    cores: ['Verde Caliban', 'Osso na capa', 'Ouro na Lion Helm', 'Vermelho no livro'],
    dicasPintura: [
      'A auréola dourada é o ponto focal: deixe por último e capriche no brilho.',
      'A capa grande e lisa é o melhor lugar da miniatura para praticar transição suave.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Piso de catedral com relíquia caída — ele é o mestre do capítulo.',
  },

  /* --- Space Wolves ---------------------------------------------- */
  {
    id: 'sw-blood-claws',
    faccaoId: 'space-wolves',
    nome: 'Blood Claws',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Jovens e impetuosos: muitos ataques na carga.',
      'Menos precisos, compensam no volume.',
      'Baratos para encher a linha de frente.',
    ],
    cores: ['Azul acinzentado', 'Couro nos panos', 'Prata nas lâminas', 'Pele nos rostos'],
    dicasPintura: [
      'Muitos rostos descobertos: vale gastar tempo na pele, é o que se olha primeiro.',
      'Peles de lobo com drybrush cinza claro sobre marrom resolvem em dois minutos por modelo.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Rocha escura com neve parcial do lado do vento.',
  },
  {
    id: 'sw-thunderwolf',
    faccaoId: 'space-wolves',
    nome: 'Thunderwolf Cavalry',
    papel: 'Ataque rápido',
    modelos: '3 modelos',
    pontos: 105,
    pontosPara: '3 modelos',
    habilidades: [
      'Cavalaria pesada rápida e forte no corpo a corpo.',
      'Ataques do lobo somam aos do cavaleiro.',
      'Ameaça de carga que obriga o oponente a se posicionar mal.',
    ],
    cores: ['Pelo do lobo em cinza', 'Armadura azul acinzentada', 'Couro nas selas'],
    dicasPintura: [
      'O lobo é maior que o cavaleiro: trate o pelo como a peça principal, com várias camadas de drybrush.',
      'Varie a cor entre os três lobos — manada toda igual parece clone.',
    ],
    baseTamanho: '60x35mm oval',
    baseTerreno: 'Neve pisoteada com rocha aparecendo por baixo.',
  },
  {
    id: 'sw-logan',
    faccaoId: 'space-wolves',
    nome: 'Logan Grimnar',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 110,
    pontosPara: '1 modelo',
    habilidades: [
      'Lidera e melhora unidades de Space Wolves.',
      'Muito forte no duelo de personagens.',
      'Concede reroll de carga ou ataque para quem estiver com ele.',
    ],
    cores: ['Ouro na armadura', 'Azul acinzentado', 'Branco na barba e no pelo'],
    dicasPintura: [
      'Barba branca: base cinza, camadas até o branco, e sombra azulada nas raízes.',
      'O ouro dele é gasto, não polido — wash marrom pesado e só um toque de luz.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Neve profunda com crânio de inimigo semienterrado.',
  },

  /* --- Adeptus Mechanicus ---------------------------------------- */
  {
    id: 'am-skitarii-rangers',
    faccaoId: 'adeptus-mechanicus',
    nome: 'Skitarii Rangers',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 90,
    pontosPara: '10 modelos',
    habilidades: [
      'Galvanic rifle com alcance longo.',
      'Se beneficiam de doutrinas que melhoram tiro ou movimento.',
      'Corpo frágil: são atiradores, não lutadores.',
    ],
    cores: ['Vermelho de Marte nos robes', 'Latão nos mecanismos', 'Preto nos cabos', 'Verde nas lentes'],
    dicasPintura: [
      'O robe vermelho é a maior área: resolva com Contrast ou Xpress e ganhe horas em dez modelos.',
      'Os cabos pretos separam o vermelho do metal — não pule essa etapa, é ela que organiza a peça.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Piso industrial de metal com grelha e óleo.',
  },
  {
    id: 'am-kataphron',
    faccaoId: 'adeptus-mechanicus',
    nome: 'Kataphron Breachers',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 105,
    pontosPara: '3 modelos',
    habilidades: [
      'Servidores pesados com boa resistência.',
      'Armas de curto alcance devastadoras contra infantaria pesada.',
      'Lentos: precisam de transporte ou de um objetivo próximo.',
    ],
    cores: ['Vermelho', 'Latão', 'Aço escuro', 'Carne pálida exposta'],
    dicasPintura: [
      'A carne humana exposta contrastando com a máquina é o coração do modelo — pinte pálida e doentia.',
      'Muito recesso fundo: um wash escuro geral antes das luzes economiza muito trabalho.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Chapa metálica com rebites e ferrugem nas juntas.',
  },
  {
    id: 'am-tech-priest',
    faccaoId: 'adeptus-mechanicus',
    nome: 'Tech-Priest Dominus',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Repara veículos e servidores próximos.',
      'Melhora o tiro da unidade que acompanha.',
      'Sobrevive bem para um personagem de suporte.',
    ],
    cores: ['Vermelho', 'Ouro e latão', 'Preto nos tubos', 'Verde nas lentes'],
    dicasPintura: [
      'É um modelo de detalhe puro: separe em subconjuntos antes de colar, senão metade não é alcançável.',
      'Quantidade de mecadendritos assusta — pinte todos de metal escuro de uma vez e só depois diferencie.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Piso de forja com cabos e placa gravada.',
  },

  /* --- Adepta Sororitas ------------------------------------------ */
  {
    id: 'as-battle-sisters',
    faccaoId: 'adepta-sororitas',
    nome: 'Battle Sisters Squad',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 105,
    pontosPara: '10 modelos',
    habilidades: [
      'Acts of Faith: recursos de fé que melhoram uma ação por turno.',
      'Bolter padrão com armas especiais no esquadrão.',
      'Melhor que marine em número, pior em resistência individual.',
    ],
    cores: ['Preto na armadura', 'Vermelho nos panos', 'Ouro nos ornamentos', 'Branco nos pergaminhos'],
    dicasPintura: [
      'Preto com luz cinza nas quinas: sem isso dez irmãs viram dez silhuetas iguais.',
      'Os pergaminhos brancos são o que dá leitura à unidade de longe — capriche neles antes dos detalhes miúdos.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Piso de catedral em ruínas com vitral quebrado.',
  },
  {
    id: 'as-seraphim',
    faccaoId: 'adepta-sororitas',
    nome: 'Seraphim Squad',
    papel: 'Ataque rápido',
    modelos: '5 modelos',
    pontos: 105,
    pontosPara: '5 modelos',
    habilidades: [
      'Jump pack: aparecem onde precisam.',
      'Pistolas duplas com muito volume em curta distância.',
      'Frágeis — atacam e saem.',
    ],
    cores: ['Preto', 'Vermelho', 'Ouro', 'Branco nas asas'],
    dicasPintura: [
      'As asas do jump pack são superfície grande e lisa: aerógrafo ou transição suave brilham aqui.',
      'Modelos em pose dinâmica pedem base com pino de voo para valer o esforço.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro elevado, sugerindo aterrissagem.',
  },
  {
    id: 'as-canoness',
    faccaoId: 'adepta-sororitas',
    nome: 'Canoness',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 60,
    pontosPara: '1 modelo',
    habilidades: [
      'Lidera um esquadrão e melhora seus ataques.',
      'Gera fé extra para o exército.',
      'Boa em duelo contra personagens médios.',
    ],
    cores: ['Preto', 'Vermelho na capa', 'Ouro na armadura', 'Pele no rosto'],
    dicasPintura: [
      'A capa vermelha é a maior área de cor: resolva ela primeiro, é o que define o modelo.',
      'Rosto descoberto em modelo de destaque: vale pintar o olho, aqui compensa.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Degrau de altar com vela e crânio.',
  },

  /* --- Grey Knights ---------------------------------------------- */
  {
    id: 'gk-strike-squad',
    faccaoId: 'grey-knights',
    nome: 'Strike Squad',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 100,
    pontosPara: '5 modelos',
    habilidades: [
      'Todo modelo é psíquico: o exército inteiro tem poderes.',
      'Teletransporte estratégico para reposicionar.',
      'Nemesis force weapons batem forte para infantaria básica.',
    ],
    cores: ['Prata na armadura', 'Ouro nos ornamentos', 'Azul luminoso nas armas'],
    dicasPintura: [
      'Prata sobre primer preto, wash Nuln Oil e drybrush prata clara: rápido e eficaz.',
      'O brilho azul da halberd é o único ponto de cor — faça um degradê do escuro para o branco no centro.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Pedra escura com runa gravada; escuro faz a prata saltar.',
  },
  {
    id: 'gk-paladins',
    faccaoId: 'grey-knights',
    nome: 'Paladin Squad',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 250,
    pontosPara: '5 modelos',
    habilidades: [
      'Terminators psíquicos com dois ferimentos cada.',
      'Deep Strike com poder psíquico junto.',
      'Caros: cada baixa pesa muito na lista.',
    ],
    cores: ['Prata', 'Ouro', 'Vermelho nos panos', 'Azul nas armas'],
    dicasPintura: [
      'Placa grande de prata: um zenital antes do metálico dá volume de graça.',
      'Diferencie o ouro do prata com wash marrom no ouro e preto no prata — senão tudo vira o mesmo cinza.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Piso de titã com selo de pureza caído.',
  },

  /* --- Chaos Space Marines --------------------------------------- */
  {
    id: 'csm-legionaries',
    faccaoId: 'chaos-space-marines',
    nome: 'Legionaries',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Configuráveis: armas especiais e ícone mudam o papel do esquadrão.',
      'Marca de deus do Caos altera as regras da unidade.',
      'Sólidos no tiro e no corpo a corpo, sem se destacar em nenhum.',
    ],
    cores: ['Cor da legião', 'Bronze envelhecido no trim', 'Ferro sujo nas correntes'],
    dicasPintura: [
      'Escolha a legião antes de abrir a tinta: o esquema muda tudo e refazer dá muito trabalho.',
      'Bronze com verdete nas frestas envelhece o modelo instantaneamente e é rápido de fazer.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terra queimada com crânios e escombro.',
  },
  {
    id: 'csm-chosen',
    faccaoId: 'chaos-space-marines',
    nome: 'Chosen',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 150,
    pontosPara: '5 modelos',
    habilidades: [
      'Veteranos com mais ataques que os Legionaries.',
      'Mistura de armas pesadas de corpo a corpo.',
      'Unidade de bater porta acompanhada de um personagem.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Vermelho escuro no sangue seco'],
    dicasPintura: [
      'Cada modelo é diferente do outro: aqui não dá para pintar em lote, aceite e aproveite.',
      'Sangue seco nas lâminas com marrom avermelhado fosco parece melhor que sangue brilhante.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro com armadura imperial destruída embaixo.',
  },
  {
    id: 'csm-helbrute',
    faccaoId: 'chaos-space-marines',
    nome: 'Helbrute',
    papel: 'Veículo / Walker',
    modelos: '1 modelo',
    pontos: 130,
    pontosPara: '1 modelo',
    habilidades: [
      'Walker resistente com armas pesadas.',
      'Fica mais perigoso conforme sofre dano.',
      'Ameaça de meio de tabuleiro que absorve fogo.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Carne exposta no piloto', 'Ferro sujo'],
    dicasPintura: [
      'Monte em subconjuntos: braços e casco separados, senão o interior fica inalcançável.',
      'A carne fundida à máquina é o detalhe que assusta — pinte rosada e doentia, com brilho.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Cratera com escombro pesado, à altura do modelo.',
  },

  /* --- World Eaters ---------------------------------------------- */
  {
    id: 'we-khorne-berzerkers',
    faccaoId: 'world-eaters',
    nome: 'Khorne Berzerkers',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Muitos ataques na carga, ainda mais com Blessings of Khorne.',
      'Podem lutar de novo em certas circunstâncias.',
      'Não atiram: ou chegam perto, ou não fazem nada.',
    ],
    cores: ['Vermelho', 'Bronze', 'Aço nas lâminas', 'Sangue fresco'],
    dicasPintura: [
      'Vermelho sobre base clara ou primer vermelho — sobre preto você gasta seis camadas.',
      'Sangue só depois do verniz fosco, senão o brilho fica errado e some.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terra árida rachada com crânios.',
  },
  {
    id: 'we-eightbound',
    faccaoId: 'world-eaters',
    nome: 'Eightbound',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 140,
    pontosPara: '3 modelos',
    habilidades: [
      'Possuídos por daemons: muito fortes no corpo a corpo.',
      'Movimento alto para uma unidade tão pesada.',
      'A unidade que ganha combates sozinha se chegar viva.',
    ],
    cores: ['Vermelho', 'Bronze', 'Carne daemônica avermelhada', 'Preto nos chifres'],
    dicasPintura: [
      'A carne daemônica pede vermelho mais alaranjado que a armadura, senão tudo vira uma mancha só.',
      'Poses dinâmicas: escolha o ângulo da base antes de colar, faz muita diferença.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Terra queimada com fissura brilhante, sugerindo calor.',
  },
  {
    id: 'we-angron',
    faccaoId: 'world-eaters',
    nome: 'Angron',
    papel: 'Primarca',
    modelos: '1 modelo',
    pontos: 435,
    pontosPara: '1 modelo',
    habilidades: [
      'Daemon primarca: enorme quantidade de ferimentos e ataques.',
      'Volta ao campo depois de morto em certas condições.',
      'Custa quase um quarto da lista — ganha ou perde a partida sozinho.',
    ],
    cores: ['Vermelho', 'Bronze', 'Carne daemônica', 'Fogo nas asas'],
    dicasPintura: [
      'É um projeto de fim de semana, não de uma noite: trate como peça de vitrine.',
      'As asas grandes pedem aerógrafo ou muita paciência com glaze — pinte separadas.',
    ],
    baseTamanho: '100mm',
    baseTerreno: 'Base enorme: componha em alturas diferentes, com escombro e corpos.',
  },

  /* --- Chaos Daemons --------------------------------------------- */
  {
    id: 'cd-bloodletters',
    faccaoId: 'chaos-daemons',
    nome: 'Bloodletters',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 110,
    pontosPara: '10 modelos',
    habilidades: [
      'Hellblades ignoram boa parte da armadura.',
      'Invulnerável em vez de armadura: sofrem igual contra tudo.',
      'Chegam pelo campo de invocação, perto do alvo.',
    ],
    cores: ['Vermelho de pele', 'Osso escuro nos chifres', 'Preto nas lâminas'],
    dicasPintura: [
      'Contrast vermelho sobre primer osso resolve dez modelos numa tarde.',
      'Chifres e lâminas em cor fria equilibram o vermelho — sem isso vira um borrão.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terreno da Warp: cor irreal, fissuras brilhantes.',
  },
  {
    id: 'cd-plaguebearers',
    faccaoId: 'chaos-daemons',
    nome: 'Plaguebearers',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 130,
    pontosPara: '10 modelos',
    habilidades: [
      'Muito resistentes para o custo: ignoram parte dos ferimentos.',
      'Lentos, feitos para segurar objetivo.',
      'Reduzem a eficácia do inimigo em contato.',
    ],
    cores: ['Verde doentio', 'Marrom nas feridas', 'Osso nos chifres'],
    dicasPintura: [
      'Aqui erro vira textura: manchas irregulares só melhoram o modelo.',
      'Um wash marrom-esverdeado por cima de tudo unifica dez modelos em minutos.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Lama com poça brilhante e cogumelo.',
  },
  {
    id: 'cd-horrors',
    faccaoId: 'chaos-daemons',
    nome: 'Pink Horrors',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 130,
    pontosPara: '10 modelos',
    habilidades: [
      'Atiram poderes psíquicos em vez de armas físicas.',
      'Ao morrer, se dividem em daemons menores.',
      'Unidade que nunca some de vez do tabuleiro.',
    ],
    cores: ['Rosa de pele', 'Azul nos detalhes', 'Amarelo no fogo'],
    dicasPintura: [
      'Rosa e azul brigam: escolha qual domina e mantenha o outro nos detalhes.',
      'O fogo nas mãos pede degradê do vermelho ao amarelo claro — treine num modelo antes.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terreno impossível, cor irreal — a facção permite ousar.',
  },

  /* --- Aeldari --------------------------------------------------- */
  {
    id: 'ael-guardians',
    faccaoId: 'aeldari',
    nome: 'Guardian Defenders',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 100,
    pontosPara: '10 modelos',
    habilidades: [
      'Civis armados: baratos e frágeis.',
      'Shuriken catapult com bom volume em curta distância.',
      'Acompanham uma plataforma de arma pesada.',
    ],
    cores: ['Cor do Craftworld', 'Osso nos capacetes', 'Gemas coloridas'],
    dicasPintura: [
      'As gemas são a assinatura Aeldari: escuro embaixo, claro em cima, um ponto de branco no canto.',
      'Superfícies lisas e curvas: transições suaves valem mais que edge highlight duro aqui.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terreno limpo, cristal ou pedra clara — sujeira briga com a estética.',
  },
  {
    id: 'ael-wraithguard',
    faccaoId: 'aeldari',
    nome: 'Wraithguard',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 170,
    pontosPara: '5 modelos',
    habilidades: [
      'Construtos resistentes, muito acima do resto do exército.',
      'Wraithcannon derrete qualquer coisa em curta distância.',
      'Lentos: pedem transporte.',
    ],
    cores: ['Osso na wraithbone', 'Cor do Craftworld nas placas', 'Gemas'],
    dicasPintura: [
      'A wraithbone lisa é a maior área do modelo: perfeita para aerógrafo e transição de baixo para cima.',
      'Poucos modelos, muito visíveis — vale investir tempo em cada um.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Pedra clara com runa gravada.',
  },
  {
    id: 'ael-farseer',
    faccaoId: 'aeldari',
    nome: 'Farseer',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 70,
    pontosPara: '1 modelo',
    habilidades: [
      'Psíquico forte, manipula os dados do exército.',
      'Melhora a unidade que acompanha.',
      'Frágil: precisa se esconder atrás da linha.',
    ],
    cores: ['Cor do Craftworld', 'Osso', 'Gemas', 'Runas brilhantes'],
    dicasPintura: [
      'A capa é a maior área lisa que você vai pintar no exército: use para praticar blending.',
      'Runas flutuantes: pinte-as claras, quase brancas, para parecerem luz própria.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Pedra clara com cristal — ela deve parecer flutuar.',
  },

  /* --- Drukhari -------------------------------------------------- */
  {
    id: 'dru-kabalite',
    faccaoId: 'drukhari',
    nome: 'Kabalite Warriors',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 100,
    pontosPara: '10 modelos',
    habilidades: [
      'Splinter rifle é veneno: fere monstros tão bem quanto infantaria.',
      'Rápidos e muito frágeis.',
      'Quase sempre dentro de um Raider.',
    ],
    cores: ['Roxo escuro na armadura', 'Pele pálida', 'Verde ácido no veneno'],
    dicasPintura: [
      'A pele pálida contra a armadura escura é o contraste que define a facção.',
      'O verde do veneno nas armas é pequeno mas obrigatório — sem ele o modelo fica sem graça.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Piso escuro de metal com correntes e respingos.',
  },
  {
    id: 'dru-wyches',
    faccaoId: 'drukhari',
    nome: 'Wyches',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 95,
    pontosPara: '10 modelos',
    habilidades: [
      'Gladiadoras: boas no corpo a corpo contra infantaria.',
      'Invulnerável contra ataques corpo a corpo.',
      'Ruins contra armadura pesada.',
    ],
    cores: ['Roxo', 'Pele pálida', 'Couro nas tiras', 'Aço nas lâminas'],
    dicasPintura: [
      'Muita pele exposta em pose dinâmica: a pele é a peça principal aqui, não a armadura.',
      'Poses acrobáticas pedem base com apoio bem pensado — teste antes de colar.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Arena: areia manchada de escuro.',
  },
  {
    id: 'dru-archon',
    faccaoId: 'drukhari',
    nome: 'Archon',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Melhora o tiro dos Kabalites que lidera.',
      'Invulnerável muito bom para um personagem barato.',
      'Huskblade mata personagens em duelo.',
    ],
    cores: ['Roxo', 'Ouro nos ornamentos', 'Pele pálida', 'Verde no veneno'],
    dicasPintura: [
      'É o modelo mais rico da lista: aqui o ouro compensa o roxo escuro do resto.',
      'A capa é grande — trate como superfície de destaque.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Piso de Commorragh com troféu — ele é nobre e cruel.',
  },

  /* --- Genestealer Cults ----------------------------------------- */
  {
    id: 'gsc-neophyte',
    faccaoId: 'genestealer-cults',
    nome: 'Neophyte Hybrids',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 90,
    pontosPara: '10 modelos',
    habilidades: [
      'Baratos e numerosos, com armas especiais boas.',
      'Emboscada: entram pelo subsolo perto do inimigo.',
      'Frágeis no corpo a corpo.',
    ],
    cores: ['Macacão verde militar', 'Amarelo no capacete', 'Pele híbrida arroxeada'],
    dicasPintura: [
      'O capacete amarelo é o que dá leitura à unidade de longe — não economize nele.',
      'Poeira clara nas botas e na barra da calça vende a história de mineiro.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Túnel de mina com cascalho e trilho.',
  },
  {
    id: 'gsc-acolyte',
    faccaoId: 'genestealer-cults',
    nome: 'Acolyte Hybrids',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 60,
    pontosPara: '5 modelos',
    habilidades: [
      'Garras e ferramentas de mineração: muito bons na carga.',
      'Emboscada como o resto do culto.',
      'Morrem fácil se não matarem primeiro.',
    ],
    cores: ['Pele arroxeada dominante', 'Macacão sujo', 'Metal enferrujado'],
    dicasPintura: [
      'Aqui a pele híbrida é a maior área: resolva ela com Contrast e o resto vem rápido.',
      'Quatro braços por modelo: pinte antes de colar tudo, ou não alcança o tronco.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Cascalho de mina com ferramenta caída.',
  },

  /* --- Leagues of Votann ----------------------------------------- */
  {
    id: 'lov-hearthkyn',
    faccaoId: 'leagues-of-votann',
    nome: 'Hearthkyn Warriors',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 110,
    pontosPara: '10 modelos',
    habilidades: [
      'Resistência alta para infantaria básica.',
      'Marcam alvos com Judgement tokens, ficando melhores contra eles.',
      'Muitas opções de arma especial no esquadrão.',
    ],
    cores: ['Macacão azul', 'Ouro/bronze nas placas', 'Aço', 'Barba ruiva ou grisalha'],
    dicasPintura: [
      'Capacetes cobrem a maioria dos rostos: menos trabalho de pele que parece à primeira vista.',
      'Varie a cor das barbas visíveis — é o detalhe que dá personalidade ao pelotão.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Rocha de asteroide com minério exposto.',
  },
  {
    id: 'lov-hekaton',
    faccaoId: 'leagues-of-votann',
    nome: 'Hekaton Land Fortress',
    papel: 'Veículo',
    modelos: '1 modelo',
    pontos: 215,
    pontosPara: '1 modelo',
    habilidades: [
      'Transporte pesado e plataforma de tiro ao mesmo tempo.',
      'Muito resistente de frente.',
      'Ancora a lista no meio do tabuleiro.',
    ],
    cores: ['Azul industrial', 'Ouro nas placas', 'Aço nas esteiras'],
    dicasPintura: [
      'Superfície plana enorme: aerógrafo e modulação de cor fazem diferença aqui.',
      'Poeira e lascado só na parte baixa — em cima parece erro.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base; sujeira nas esteiras deve combinar com o exército.',
  },

  /* --- Skaven (AoS) ---------------------------------------------- */
  {
    id: 'sk-clanrats',
    faccaoId: 'skaven',
    nome: 'Clanrats',
    papel: 'Battleline',
    modelos: '20 modelos',
    pontos: 150,
    pontosPara: '20 modelos',
    habilidades: [
      'Horda barata: seguram objetivo por número puro.',
      'Lutam melhor quanto maior a unidade.',
      'Fogem fácil quando a unidade encolhe.',
    ],
    cores: ['Pelo marrom', 'Panos cinza sujos', 'Pele rosada na cauda', 'Ferro enferrujado'],
    dicasPintura: [
      'Vinte modelos: Contrast marrom sobre primer osso é a única forma sensata de fazer isso.',
      'Não pinte olhos em vinte ratos. Ninguém vai olhar.',
      'Varie a cor dos panos entre eles — a horda fica viva sem custar tempo.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Esgoto: tábua podre, lama e água escura.',
  },
  {
    id: 'sk-stormvermin',
    faccaoId: 'skaven',
    nome: 'Stormvermin',
    papel: 'Elite',
    modelos: '10 modelos',
    pontos: 180,
    pontosPara: '10 modelos',
    habilidades: [
      'Melhor armadura e ataque que os Clanrats.',
      'Alabardas com bom alcance de combate.',
      'Ainda são skaven: quebram sob pressão.',
    ],
    cores: ['Pelo escuro', 'Vermelho nos panos', 'Ferro nas armaduras'],
    dicasPintura: [
      'Use pelo mais escuro que nos Clanrats para diferenciar a elite de longe.',
      'As alabardas alinhadas dão o visual de unidade — cuide para colarem no mesmo ângulo.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Pedra úmida de túnel.',
  },
  {
    id: 'sk-warplock',
    faccaoId: 'skaven',
    nome: 'Warplock Jezzails',
    papel: 'Tiro',
    modelos: '3 modelos',
    pontos: 140,
    pontosPara: '3 modelos',
    habilidades: [
      'Tiro de longo alcance com boa penetração.',
      'Podem se enterrar e melhorar a proteção.',
      'Poucos modelos: dano concentrado e frágil.',
    ],
    cores: ['Pelo marrom', 'Verde warpstone nas armas', 'Metal sujo'],
    dicasPintura: [
      'O verde warpstone é o ponto de luz: faça-o quase branco no centro para parecer brilho próprio.',
      'Só três modelos — dá para caprichar mais que na horda.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro com pavês de madeira apoiado.',
  },

  /* --- Orruk Warclans (AoS) --------------------------------------- */
  {
    id: 'ow-ardboyz',
    faccaoId: 'orruk-warclans',
    nome: "'Ardboyz",
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 180,
    pontosPara: '10 modelos',
    habilidades: [
      'Armadura pesada para orruks: aguentam bem.',
      'Melhoram com o Waaagh! do exército.',
      'Lentos, mas quase nada os remove do objetivo.',
    ],
    cores: ['Pele verde', 'Ferro escuro na armadura', 'Couro', 'Amarelo do clã'],
    dicasPintura: [
      'Contrast Ork Flesh sobre primer osso e a pele está pronta em uma passada.',
      'Ferro com esponja e prata nas quinas: armadura orruk é amassada, não polida.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Terra pisoteada com pedra quebrada e grama alta.',
  },
  {
    id: 'ow-gore-gruntas',
    faccaoId: 'orruk-warclans',
    nome: 'Gore-gruntas',
    papel: 'Cavalaria',
    modelos: '3 modelos',
    pontos: 170,
    pontosPara: '3 modelos',
    habilidades: [
      'Carga devastadora com dano extra por movimento.',
      'Rápidos para o tamanho.',
      'Chegam antes do resto do exército — cuidado com o isolamento.',
    ],
    cores: ['Pele verde', 'Pele rosada do javali', 'Ferro', 'Couro'],
    dicasPintura: [
      'O javali é maior que o orruk: trate a pele dele como a área principal.',
      'Presas e dentes em osso claro chamam a atenção para a frente do modelo.',
    ],
    baseTamanho: '90x52mm oval',
    baseTerreno: 'Terra revirada, com marca de casco na massa.',
  },
  {
    id: 'ow-megaboss',
    faccaoId: 'orruk-warclans',
    nome: 'Megaboss',
    papel: 'Herói',
    modelos: '1 modelo',
    pontos: 160,
    pontosPara: '1 modelo',
    habilidades: [
      'Ataques pesados que derrubam heróis e monstros.',
      'Melhora os orruks ao redor.',
      'Ativa o Waaagh! do exército.',
    ],
    cores: ['Pele verde', 'Ferro pesado', 'Ouro nos troféus'],
    dicasPintura: [
      'É o maior modelo de infantaria da lista: mais tempo aqui compensa muito visualmente.',
      'Ferro amassado com marcas de batida — nada deve parecer novo.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Escudo inimigo pisoteado embaixo da bota.',
  },

  /* --- Cities of Sigmar (AoS) ------------------------------------- */
  {
    id: 'cos-freeguild-steelhelms',
    faccaoId: 'cities-of-sigmar',
    nome: 'Freeguild Steelhelms',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 110,
    pontosPara: '10 modelos',
    habilidades: [
      'Infantaria humana barata com escudo.',
      'Melhoram bastante perto de um herói.',
      'Feitos para segurar objetivo, não para matar.',
    ],
    cores: ['Uniforme da cidade', 'Aço na armadura', 'Couro', 'Pele nos rostos'],
    dicasPintura: [
      'Escolha a cor da cidade antes de começar: define todo o exército.',
      'Escudos são superfície plana e visível: ótimo lugar para brasão, mesmo simples.',
    ],
    baseTamanho: '28mm',
    baseTerreno: 'Calçada de cidade com grama entre as pedras.',
  },
  {
    id: 'cos-fusiliers',
    faccaoId: 'cities-of-sigmar',
    nome: 'Freeguild Fusiliers',
    papel: 'Tiro',
    modelos: '10 modelos',
    pontos: 130,
    pontosPara: '10 modelos',
    habilidades: [
      'Volume de tiro a média distância.',
      'Melhor com apoio de um herói de tiro.',
      'Sem defesa própria no corpo a corpo.',
    ],
    cores: ['Uniforme da cidade', 'Couro', 'Metal nos canos', 'Fumaça'],
    dicasPintura: [
      'Uniformes iguais em dez modelos: pintura em lote resolve.',
      'Fuligem preta na boca do cano dá realismo em dois segundos por modelo.',
    ],
    baseTamanho: '28mm',
    baseTerreno: 'Terra de campo de batalha com cartucho no chão.',
  },

  /* --- Soulblight Gravelords (AoS) -------------------------------- */
  {
    id: 'sbg-skeletons',
    faccaoId: 'soulblight-gravelords',
    nome: 'Deathrattle Skeletons',
    papel: 'Battleline',
    modelos: '20 modelos',
    pontos: 170,
    pontosPara: '20 modelos',
    habilidades: [
      'Voltam a ficar de pé perto de um herói vampiro.',
      'Baratos e numerosos.',
      'Fracos individualmente: valem pelo número.',
    ],
    cores: ['Osso', 'Panos escuros esfarrapados', 'Ferro enferrujado'],
    dicasPintura: [
      'Contrast Skeleton Horde sobre primer osso resolve vinte esqueletos numa tarde.',
      'Terra e musgo na parte de baixo dos ossos, como se tivessem saído do chão.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terra de cemitério com lápide e raiz seca.',
  },
  {
    id: 'sbg-blood-knights',
    faccaoId: 'soulblight-gravelords',
    nome: 'Blood Knights',
    papel: 'Cavalaria',
    modelos: '5 modelos',
    pontos: 220,
    pontosPara: '5 modelos',
    habilidades: [
      'Cavalaria pesada vampírica, muito forte na carga.',
      'Se curam ao ferir.',
      'Difíceis de remover uma vez engajados.',
    ],
    cores: ['Vermelho vinho', 'Ferro escuro', 'Osso do cavalo', 'Pele pálida'],
    dicasPintura: [
      'A capa vermelha é a assinatura: gaste tempo nela, é o que se vê primeiro.',
      'Os cavalos esqueléticos podem usar a mesma receita dos esqueletos, economizando decisões.',
    ],
    baseTamanho: '60x35mm oval',
    baseTerreno: 'Névoa e terra de cemitério.',
  },

  /* --- Maggotkin of Nurgle (AoS) ---------------------------------- */
  {
    id: 'mkn-putrid-blightkings',
    faccaoId: 'maggotkin-of-nurgle',
    nome: 'Putrid Blightkings',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 220,
    pontosPara: '5 modelos',
    habilidades: [
      'Muito resistentes, ignoram parte dos ferimentos.',
      'Ataques que pioram conforme o inimigo se aproxima.',
      'Lentos: escolha bem o alvo antes de andar.',
    ],
    cores: ['Verde doentio', 'Ferrugem', 'Carne exposta', 'Bronze sujo'],
    dicasPintura: [
      'Modelos enormes cheios de textura: aqui excesso é acerto.',
      'Gosma com verniz brilhante só nos pontos de escorrimento, não em tudo.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Pântano com poça brilhante e cogumelo.',
  },
  {
    id: 'mkn-plague-drones',
    faccaoId: 'maggotkin-of-nurgle',
    nome: 'Plague Drones',
    papel: 'Cavalaria voadora',
    modelos: '3 modelos',
    pontos: 170,
    pontosPara: '3 modelos',
    habilidades: [
      'Voam: ignoram terreno e chegam onde querem.',
      'Resistentes como todo Nurgle.',
      'Boa ferramenta para tomar objetivo distante.',
    ],
    cores: ['Verde', 'Carne rosada da mosca', 'Asas translúcidas'],
    dicasPintura: [
      'As asas ficam melhores pintadas por trás, com cor bem diluída, para parecerem translúcidas.',
      'Use pino de voo e pinte a base separada — depois de montado não se alcança nada.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Pântano; o modelo voa, então a base pode ser simples.',
  },

  /* --- Seraphon (AoS) --------------------------------------------- */
  {
    id: 'ser-saurus-warriors',
    faccaoId: 'seraphon',
    nome: 'Saurus Warriors',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 130,
    pontosPara: '10 modelos',
    habilidades: [
      'Boa armadura natural para infantaria de linha.',
      'Melhoram bastante perto de um herói Saurus.',
      'Lentos, mas seguram bem o centro.',
    ],
    cores: ['Pele azul turquesa', 'Escamas claras', 'Ouro nos escudos', 'Osso nas garras'],
    dicasPintura: [
      'Contrast azul sobre primer branco resolve a pele; as escamas vêm depois com drybrush claro.',
      'Os escudos dourados dão unidade visual à formação — mantenha o mesmo padrão nos dez.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Selva: pedra de templo com folhagem densa.',
  },
  {
    id: 'ser-carnosaur',
    faccaoId: 'seraphon',
    nome: 'Saurus Oldblood on Carnosaur',
    papel: 'Monstro / Herói',
    modelos: '1 modelo',
    pontos: 320,
    pontosPara: '1 modelo',
    habilidades: [
      'Monstro grande com muitos ferimentos.',
      'Ataques pesados capazes de derrubar outros monstros.',
      'Fica mais perigoso depois de matar algo.',
    ],
    cores: ['Pele do carnossauro', 'Azul do cavaleiro', 'Ouro', 'Penas vermelhas'],
    dicasPintura: [
      'Superfície enorme e curva: o modelo ideal para experimentar aerógrafo ou drybrush pesado.',
      'Faça a barriga mais clara que as costas — imita luz natural e dá volume de graça.',
    ],
    baseTamanho: '105x70mm oval',
    baseTerreno: 'Base grande pede composição: raízes, pedra de templo em alturas diferentes.',
  },

  /* --- Gloomspite Gitz (AoS) -------------------------------------- */
  {
    id: 'gg-stabbas',
    faccaoId: 'gloomspite-gitz',
    nome: 'Stabbas',
    papel: 'Battleline',
    modelos: '20 modelos',
    pontos: 160,
    pontosPara: '20 modelos',
    habilidades: [
      'Horda baratíssima que segura objetivo.',
      'Lutam melhor em unidade grande.',
      'Fogem com facilidade quando perdem modelos.',
    ],
    cores: ['Pele verde clara', 'Capuz azul noite', 'Ferro sujo'],
    dicasPintura: [
      'Vinte goblins: Contrast verde sobre primer osso, uma passada, pronto.',
      'Varie a cor dos capuzes em dois ou três tons — a horda ganha vida sem custar tempo.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Caverna com cogumelo e pedra úmida.',
  },
  {
    id: 'gg-squig-herd',
    faccaoId: 'gloomspite-gitz',
    nome: 'Squig Herd',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 130,
    pontosPara: '10 modelos',
    habilidades: [
      'Movimento imprevisível e rápido.',
      'Muitos ataques de mordida por modelo.',
      'Sem controle próprio: dependem dos herders.',
    ],
    cores: ['Vermelho vivo dos squigs', 'Verde dos goblins', 'Branco nos dentes'],
    dicasPintura: [
      'Squig é praticamente uma bola vermelha: o modelo mais rápido e divertido de pintar do hobby.',
      'Dentes brancos e língua rosada fazem 90% do resultado — vá direto neles.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Caverna com cogumelo grande.',
  },
  {
    id: 'gg-loonboss',
    faccaoId: 'gloomspite-gitz',
    nome: 'Loonboss',
    papel: 'Herói',
    modelos: '1 modelo',
    pontos: 70,
    pontosPara: '1 modelo',
    habilidades: [
      'Melhora a coragem e o ataque dos goblins ao redor.',
      'Barato: cabe em qualquer lista.',
      'Frágil se pego sozinho.',
    ],
    cores: ['Pele verde', 'Capuz azul', 'Amarelo nos cogumelos', 'Ferro'],
    dicasPintura: [
      'Modelo pequeno mas cheio de personalidade — o rosto é a peça central.',
      'Os cogumelos são o único ponto de cor quente: use amarelo bem claro para destacar.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Cogumelo grande servindo de pedestal.',
  },
  /* ================================================================ */
  /* SPACE MARINES — linha genérica dos Astartes                       */
  /* ================================================================ */

  {
    id: 'sm-assault-intercessors',
    faccaoId: 'space-marines',
    nome: 'Assault Intercessor Squad',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 75,
    pontosPara: '5 modelos',
    habilidades: [
      'Chainsword e pistola: versão de corpo a corpo do Intercessor.',
      'Aguentam a carga e seguram objetivo à frente.',
      'Melhoram muito lideradas por um Capitão ou Chaplain.',
    ],
    cores: ['Cor do capítulo', 'Prata na chainsword', 'Osso na ombreira'],
    dicasPintura: [
      'Os dentes da chainsword ficam ótimos com prata clara e um wash escuro por cima.',
      'Poses dinâmicas: alinhe os pés com a base antes de colar, senão o modelo fica torto.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano com laje quebrada.',
  },
  {
    id: 'sm-heavy-intercessors',
    faccaoId: 'space-marines',
    nome: 'Heavy Intercessor Squad',
    papel: 'Battleline',
    modelos: '5 ou 10 modelos',
    pontos: 100,
    pontosPara: '5 modelos',
    habilidades: [
      'Armadura Gravis: muito mais resistentes que o Intercessor comum.',
      'Heavy bolt rifle com bom alcance e penetração.',
      'Lentos: 5" de movimento, feitos para ficar parados num objetivo.',
    ],
    cores: ['Cor do capítulo', 'Prata nas armas', 'Vermelho nas lentes'],
    dicasPintura: [
      'Placa Gravis é enorme e lisa — o melhor lugar do exército para praticar aerógrafo.',
      'Faça a luz de quina mais forte que nos Intercessors: o volume maior pede contraste maior.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro pesado à altura do modelo.',
  },
  {
    id: 'sm-infiltrators',
    faccaoId: 'space-marines',
    nome: 'Infiltrator Squad',
    papel: 'Tropa (Phobos)',
    modelos: '5 ou 10 modelos',
    pontos: 100,
    pontosPara: '5 modelos',
    habilidades: [
      'Infiltrators: começam adiantados no tabuleiro.',
      'Impedem reservas inimigas de chegar perto — bloqueio de deep strike.',
      'Marksman bolt carbine com tiro confiável.',
    ],
    cores: ['Cor do capítulo em tom mais escuro', 'Preto no equipamento Phobos', 'Verde nas lentes'],
    dicasPintura: [
      'Armadura Phobos costuma ser pintada mais escura que a do resto do capítulo — é doutrina furtiva.',
      'O equipamento preto separa a silhueta: não pinte tudo da cor do capítulo.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro baixo, mato seco — eles se escondem.',
  },
  {
    id: 'sm-incursors',
    faccaoId: 'space-marines',
    nome: 'Incursor Squad',
    papel: 'Tropa (Phobos)',
    modelos: '5 ou 10 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Infiltrators com occulus bolt carbine: ignoram cobertura.',
      'Enxergam através de fumaça e camuflagem.',
      'Bons para tirar unidades escondidas do objetivo.',
    ],
    cores: ['Armadura escura', 'Preto no equipamento', 'Lentes claras'],
    dicasPintura: [
      'O visor grande é o ponto focal do rosto: um degradê de escuro para claro nele muda o modelo.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano com detrito.',
  },
  {
    id: 'sm-eliminators',
    faccaoId: 'space-marines',
    nome: 'Eliminator Squad',
    papel: 'Tiro pesado (Phobos)',
    modelos: '3 modelos',
    pontos: 75,
    pontosPara: '3 modelos',
    habilidades: [
      'Snipers de longo alcance que atacam personagens.',
      'Ganham cobertura pesada onde estiverem.',
      'Munição alternativa: anti-personagem ou explosiva.',
    ],
    cores: ['Armadura escura', 'Capa de camuflagem', 'Preto no rifle'],
    dicasPintura: [
      'As capas são a maior superfície: um esquema de camuflagem simples já dá muito resultado.',
      'Coloque-os numa base elevada — reforça a ideia de posição de tiro.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Ruína elevada ou telhado quebrado.',
  },
  {
    id: 'sm-bladeguard',
    faccaoId: 'space-marines',
    nome: 'Bladeguard Veteran Squad',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 80,
    pontosPara: '3 modelos',
    habilidades: [
      'Escudo de tempestade: invulnerável bom mesmo fora de Terminator.',
      'Master-crafted power sword: cortam infantaria pesada.',
      'A guarda de honra que acompanha um personagem na linha de frente.',
    ],
    cores: ['Cor do capítulo', 'Ouro no trim', 'Vermelho no penacho', 'Branco no pergaminho'],
    dicasPintura: [
      'Os escudos são superfície plana e visível: melhor lugar do exército para heráldica.',
      'Poucos modelos e muito ornamento — trate como peça de destaque, não como tropa.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com detalhe narrativo; eles são a guarda de honra.',
  },
  {
    id: 'sm-sternguard',
    faccaoId: 'space-marines',
    nome: 'Sternguard Veteran Squad',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 125,
    pontosPara: '5 modelos',
    habilidades: [
      'Munição especial: bolter que fere quase tudo.',
      'Veteranos com melhor liderança e disciplina de tiro.',
      'Boa unidade para segurar meio de campo atirando.',
    ],
    cores: ['Cor do capítulo', 'Ouro nos ornamentos', 'Osso nos pergaminhos'],
    dicasPintura: [
      'Veteranos carregam mais bugiganga: selos, pergaminhos e correntes pedem paciência.',
      'Ombreira preta com borda dourada é o padrão de veterano em vários capítulos.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano.',
  },
  {
    id: 'sm-hellblasters',
    faccaoId: 'space-marines',
    nome: 'Hellblaster Squad',
    papel: 'Tiro pesado',
    modelos: '5 ou 10 modelos',
    pontos: 115,
    pontosPara: '5 modelos',
    habilidades: [
      'Plasma incinerator: derrete armadura pesada e monstros.',
      'Podem sobrecarregar a arma por mais dano, arriscando o próprio modelo.',
      'A principal resposta anti-tanque de infantaria do codex.',
    ],
    cores: ['Cor do capítulo', 'Azul luminoso no plasma', 'Prata no cano'],
    dicasPintura: [
      'As bobinas de plasma são o ponto de luz do modelo: azul escuro na base, branco no centro.',
      'Um leve brilho azul na armadura ao redor da arma vende o efeito de luz — só um glaze.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano.',
  },
  {
    id: 'sm-aggressors',
    faccaoId: 'space-marines',
    nome: 'Aggressor Squad',
    papel: 'Elite (Gravis)',
    modelos: '3 ou 6 modelos',
    pontos: 120,
    pontosPara: '3 modelos',
    habilidades: [
      'Boltstorm gauntlets ou flamestorm: volume brutal em curta distância.',
      'Armadura Gravis resistente.',
      'Lentos: dependem de transporte ou de avanço apoiado.',
    ],
    cores: ['Cor do capítulo', 'Prata nas armas', 'Fuligem nos bocais'],
    dicasPintura: [
      'Modelos grandes com poucos detalhes finos: pintam rápido e ficam vistosos.',
      'Fuligem preta na boca dos lança-chamas é um detalhe de dois segundos que dá muito realismo.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro pesado.',
  },
  {
    id: 'sm-outriders',
    faccaoId: 'space-marines',
    nome: 'Outrider Squad',
    papel: 'Ataque rápido',
    modelos: '3 modelos',
    pontos: 80,
    pontosPara: '3 modelos',
    habilidades: [
      'Motos rápidas para tomar objetivo distante cedo.',
      'Tiro em movimento e carga razoável.',
      'Frágeis se ficarem expostas.',
    ],
    cores: ['Cor do capítulo', 'Preto nos pneus', 'Prata no motor'],
    dicasPintura: [
      'Pinte piloto e moto separados antes de montar.',
      'Pneus em cinza muito escuro, nunca preto puro — preto puro some.',
    ],
    baseTamanho: '75x42mm oval',
    baseTerreno: 'Estrada ou terra batida com marca de pneu.',
  },
  {
    id: 'sm-scouts',
    faccaoId: 'space-marines',
    nome: 'Scout Squad',
    papel: 'Tropa',
    modelos: '5 modelos',
    pontos: 65,
    pontosPara: '5 modelos',
    habilidades: [
      'Infiltrators baratos para pegar objetivo cedo.',
      'Configuráveis: sniper rifle, shotgun ou corpo a corpo.',
      'Frágeis, mas custam pouco.',
    ],
    cores: ['Cor do capítulo', 'Camuflagem nas capas', 'Pele nos rostos descobertos'],
    dicasPintura: [
      'Rostos descobertos: é o esquadrão do capítulo onde a pele mais aparece.',
      'Capas de camuflagem permitem experimentar padrões sem comprometer o esquema do exército.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Mato seco e escombro baixo.',
  },
  {
    id: 'sm-chaplain',
    faccaoId: 'space-marines',
    nome: 'Chaplain',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 60,
    pontosPara: '1 modelo',
    habilidades: [
      'Concede re-roll de ferimentos ou ataques extras na unidade que lidera.',
      'Litanias que melhoram o desempenho em combate.',
      'Bom acompanhando Assault Intercessors ou Bladeguard.',
    ],
    cores: ['Preto na armadura', 'Osso no crânio', 'Ouro no rosarius', 'Vermelho nos panos'],
    dicasPintura: [
      'A máscara de crânio é o rosto do modelo: pinte em osso claro com sombra nos recessos.',
      'Preto com luz cinza-azulada nas quinas; sem isso o Chaplain vira uma sombra.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com selo de pureza caído.',
  },
  {
    id: 'sm-librarian',
    faccaoId: 'space-marines',
    nome: 'Librarian',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 65,
    pontosPara: '1 modelo',
    habilidades: [
      'Psíquico: poderes de dano e de proteção.',
      'Melhora a resistência ou o ataque da unidade que lidera.',
      'Force weapon com bom dano contra personagens.',
    ],
    cores: ['Azul na armadura', 'Ouro nos ornamentos', 'Osso nos livros', 'Azul claro na energia'],
    dicasPintura: [
      'A armadura azul é padrão mesmo em capítulos de outra cor: aproveite para variar.',
      'Energia psíquica: azul escuro na base, quase branco no centro, e um glaze azul ao redor.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com pequeno efeito de energia.',
  },
  {
    id: 'sm-apothecary',
    faccaoId: 'space-marines',
    nome: 'Apothecary Biologis',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 55,
    pontosPara: '1 modelo',
    habilidades: [
      'Concede dano crítico melhorado à unidade que lidera.',
      'Pode recuperar um modelo perdido por turno.',
      'Costuma acompanhar Hellblasters ou Sternguard.',
    ],
    cores: ['Branco na armadura', 'Vermelho na cruz', 'Prata no narthecium'],
    dicasPintura: [
      'Branco é a cor mais difícil do hobby: comece em cinza claro e suba, nunca do branco puro.',
      'A ombreira branca contra o capítulo colorido é o que identifica o Apothecary de longe.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro urbano.',
  },
  {
    id: 'sm-rhino',
    faccaoId: 'space-marines',
    nome: 'Rhino',
    papel: 'Transporte',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Transporta 10 modelos de infantaria.',
      'Barato e resistente o bastante para atravessar o campo.',
      'Se auto-repara um pouco a cada turno.',
    ],
    cores: ['Cor do capítulo', 'Metal nas esteiras', 'Poeira na saia lateral'],
    dicasPintura: [
      'Superfície plana enorme: aerógrafo ou spray colorido resolvem em minutos.',
      'Chipping com esponja nas quinas e poeira só na parte baixa — em cima parece erro.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base; a sujeira das esteiras deve combinar com a do exército.',
  },
  {
    id: 'sm-impulsor',
    faccaoId: 'space-marines',
    nome: 'Impulsor',
    papel: 'Transporte',
    modelos: '1 modelo',
    pontos: 85,
    pontosPara: '1 modelo',
    habilidades: [
      'Antigrav rápido: leva 6 modelos e ainda avança.',
      'Opções de escudo ou de suporte de tiro.',
      'Frágil comparado ao Rhino, mas muito mais móvel.',
    ],
    cores: ['Cor do capítulo', 'Preto nos motores', 'Azul no brilho antigrav'],
    dicasPintura: [
      'A parte de baixo dos motores antigrav pede um brilho azulado — pinte antes de fechar o casco.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Flutuante; sem sujeira nas laterais baixas.',
  },
  {
    id: 'sm-repulsor',
    faccaoId: 'space-marines',
    nome: 'Repulsor Executioner',
    papel: 'Veículo pesado',
    modelos: '1 modelo',
    pontos: 220,
    pontosPara: '1 modelo',
    habilidades: [
      'Plataforma de tiro pesada com muitas armas secundárias.',
      'Resistente e capaz de transportar.',
      'Âncora de fogo que domina uma metade do tabuleiro.',
    ],
    cores: ['Cor do capítulo', 'Prata nas armas', 'Preto nas grades'],
    dicasPintura: [
      'Monte em subconjuntos: torre, casco e armas laterais separados.',
      'São muitas armas pequenas — pinte todas de uma vez, em lote, como se fossem tropa.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'sm-predator',
    faccaoId: 'space-marines',
    nome: 'Predator Annihilator',
    papel: 'Veículo',
    modelos: '1 modelo',
    pontos: 135,
    pontosPara: '1 modelo',
    habilidades: [
      'Lascannon torreta: anti-tanque de longo alcance.',
      'Bom perfil de resistência pelo custo.',
      'Fica parado atirando; não avance com ele.',
    ],
    cores: ['Cor do capítulo', 'Metal nos canos', 'Fuligem nas bocas'],
    dicasPintura: [
      'Chassi de Rhino: mesma receita, mesmo tempo.',
      'Fuligem na boca do lascannon e marca de calor no cano dão vida ao veículo.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'sm-land-raider',
    faccaoId: 'space-marines',
    nome: 'Land Raider',
    papel: 'Veículo pesado / Transporte',
    modelos: '1 modelo',
    pontos: 240,
    pontosPara: '1 modelo',
    habilidades: [
      'O transporte mais resistente do Imperium.',
      'Dois lascannons gêmeos e heavy bolter.',
      'Leva Terminators direto para a linha inimiga.',
    ],
    cores: ['Cor do capítulo', 'Metal', 'Ouro nos ornamentos'],
    dicasPintura: [
      'É o maior veículo básico do codex: trate como projeto próprio, não como mais um tanque.',
      'As laterais grandes pedem um brasão grande — vale usar decalque e disfarçar com verniz.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'sm-ballistus',
    faccaoId: 'space-marines',
    nome: 'Ballistus Dreadnought',
    papel: 'Veículo / Walker',
    modelos: '1 modelo',
    pontos: 140,
    pontosPara: '1 modelo',
    habilidades: [
      'Lascannon e míssil: anti-tanque puro.',
      'Resistente para o custo.',
      'Fica na retaguarda escolhendo alvo.',
    ],
    cores: ['Cor do capítulo', 'Prata nos pistões', 'Ouro no sarcófago'],
    dicasPintura: [
      'Pistões metálicos com wash preto localizado dão profundidade instantânea.',
      'O sarcófago é o rosto do modelo: capriche na placa dourada e no símbolo.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Escombro em alturas diferentes — a base é grande e aparece.',
  },
  {
    id: 'sm-shrike',
    faccaoId: 'space-marines',
    nome: 'Kayvaan Shrike',
    nomeado: true,
    papel: 'Personagem nomeado (Raven Guard)',
    modelos: '1 modelo',
    pontos: 85,
    pontosPara: '1 modelo',
    habilidades: [
      'Mestre do capítulo Raven Guard, especialista em infiltração.',
      'Concede movimento e furtividade à unidade que lidera.',
      'Bom em corpo a corpo com as garras relâmpago.',
    ],
    cores: ['Preto na armadura', 'Branco nas asas', 'Vermelho nas lentes', 'Prata nas garras'],
    dicasPintura: [
      'Preto Raven Guard: use cinza azulado nas quinas, senão não se vê nada do modelo.',
      'As penas brancas do jump pack são o contraste que salva a silhueta.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Ruína elevada, sugerindo que ele acabou de descer.',
  },
  {
    id: 'sm-vulkan',
    faccaoId: 'space-marines',
    nome: "Vulkan He'stan",
    nomeado: true,
    papel: 'Personagem nomeado (Salamanders)',
    modelos: '1 modelo',
    pontos: 90,
    pontosPara: '1 modelo',
    habilidades: [
      'Forjador dos Salamanders, caçador de relíquias.',
      'Melhora armas de fogo e de fusão do exército.',
      'Resistente e bom no corpo a corpo.',
    ],
    cores: ['Verde escuro na armadura', 'Pele preta com olhos vermelhos', 'Ouro nos ornamentos'],
    dicasPintura: [
      'A pele preta dos Salamanders com olhos vermelhos é a assinatura do capítulo — não pule.',
      'Verde escuro sobre primer preto cobre bem e economiza camadas.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Rocha vulcânica com fissura brilhante.',
  },
  {
    id: 'sm-pedro-kantor',
    faccaoId: 'space-marines',
    nome: 'Pedro Kantor',
    nomeado: true,
    papel: 'Personagem nomeado (Crimson Fists)',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Mestre do capítulo Crimson Fists.',
      'Melhora o tiro de bolter das unidades próximas.',
      'Dourado Dorn: bom em duelo e resistente.',
    ],
    cores: ['Azul na armadura', 'Vermelho nas mãos', 'Ouro nos ornamentos'],
    dicasPintura: [
      'As mãos vermelhas sobre a armadura azul são o capítulo inteiro numa imagem — capriche nelas.',
      'Vermelho vivo sobre azul escuro exige base clara nas mãos, senão suja.',
    ],
    baseTamanho: '40mm',
    baseTerreno: "Escombro de Rynn's World.",
  },

  /* ================================================================ */
  /* ULTRAMARINES — personagens e peças do capítulo                    */
  /* ================================================================ */

  {
    id: 'um-titus',
    faccaoId: 'ultramarines',
    nome: 'Lieutenant Titus',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Tenente da 2ª Companhia, protagonista de Space Marine.',
      'Lidera uma unidade e concede re-roll de hits.',
      'Perfil de combate acima do Tenente comum, com power sword e bolt pistol.',
    ],
    cores: ['Azul Macragge', 'Ouro nos ornamentos', 'Vermelho no pergaminho', 'Prata na espada'],
    dicasPintura: [
      'Rosto descoberto e marcado: é um dos poucos Astartes onde vale pintar cicatriz e olhos.',
      'A espada é grande e lisa — bom lugar para tentar um efeito de metal não-metálico.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro de Graia com destroço mecanicus.',
  },
  {
    id: 'um-calgar',
    faccaoId: 'ultramarines',
    nome: 'Marneus Calgar',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo + 2 Victrix Guard',
    pontos: 185,
    pontosPara: '1 modelo',
    habilidades: [
      'Mestre do capítulo Ultramarines.',
      'Concede re-roll de hits e de wounds em certas condições.',
      'Gunslinger com punhos de poder: muito forte no duelo.',
    ],
    cores: ['Azul Macragge', 'Ouro na armadura Gravis', 'Vermelho na capa', 'Branco nos pergaminhos'],
    dicasPintura: [
      'É a peça de vitrine do exército: gaste nela o tempo de cinco Intercessors.',
      'A capa vermelha por dentro e escura por fora dá profundidade sem esforço.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Piso de mármore de Macragge com relíquia.',
  },
  {
    id: 'um-guilliman',
    faccaoId: 'ultramarines',
    nome: 'Roboute Guilliman',
    nomeado: true,
    papel: 'Primarca',
    modelos: '1 modelo',
    pontos: 325,
    pontosPara: '1 modelo',
    habilidades: [
      'Primarca e Lorde Comandante do Imperium.',
      'Aura enorme que melhora todas as unidades Imperiais próximas.',
      'Resistência e dano de nível de monstro — muda a partida sozinho.',
    ],
    cores: ['Azul Macragge', 'Ouro na Armour of Fate', 'Vermelho na capa', 'Azul luminoso na espada'],
    dicasPintura: [
      'Modelo enorme e cheio de ouro: monte em subconjuntos e pinte a capa separada.',
      'A Emperor’s Sword pede um efeito de energia — degradê do azul escuro ao branco.',
      'É um projeto de várias sessões. Registre o tempo, vai surpreender.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Piso imperial com águia e escombro nobre.',
  },
  {
    id: 'um-victrix',
    faccaoId: 'ultramarines',
    nome: 'Victrix Honour Guard',
    papel: 'Elite',
    modelos: '2 modelos',
    pontos: 65,
    pontosPara: '2 modelos',
    habilidades: [
      'Guarda pessoal de Marneus Calgar.',
      'Escudo de tempestade com invulnerável e power sword.',
      'Existem para morrer no lugar do personagem que acompanham.',
    ],
    cores: ['Azul Macragge', 'Ouro nos escudos', 'Vermelho nos penachos', 'Branco nos pergaminhos'],
    dicasPintura: [
      'Só dois modelos e muito ornamento — trate como personagens, não como tropa.',
      'Os escudos dourados com brasão são o ponto alto: vale desenhar o U de Ultramar à mão.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Mármore de Macragge, combinando com Calgar.',
  },
  {
    id: 'um-tigurius',
    faccaoId: 'ultramarines',
    nome: 'Chief Librarian Tigurius',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 70,
    pontosPara: '1 modelo',
    habilidades: [
      'O psíquico mais poderoso dos Ultramarines.',
      'Manipula os dados do exército inteiro com a Hood of Hellfire.',
      'Frágil no corpo a corpo: fique atrás da linha.',
    ],
    cores: ['Azul Macragge', 'Azul de Librarian mais claro', 'Osso nos pergaminhos', 'Ouro'],
    dicasPintura: [
      'A capa cheia de pergaminhos é a maior área — resolva ela primeiro.',
      'O bastão psíquico pede efeito de energia; um azul quase branco no topo funciona bem.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com pequeno efeito de energia psíquica.',
  },
  {
    id: 'um-sicarius',
    faccaoId: 'ultramarines',
    nome: 'Captain Cato Sicarius',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 95,
    pontosPara: '1 modelo',
    habilidades: [
      'Capitão da 2ª Companhia, vaidoso e brilhante.',
      'Melhora bastante a unidade que lidera em combate.',
      'Talassarian Tempest Blade com bom dano.',
    ],
    cores: ['Azul Macragge', 'Ouro pesado', 'Branco no penacho', 'Vermelho nos detalhes'],
    dicasPintura: [
      'Ele é o mais ornamentado dos capitães: quase tudo é ouro e relevo.',
      'O penacho branco é difícil — comece em cinza e suba, nunca do branco puro.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com estandarte caído.',
  },
  {
    id: 'um-uriel-ventris',
    faccaoId: 'ultramarines',
    nome: 'Uriel Ventris',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Capitão da 4ª Companhia, protagonista dos romances de Graham McNeill.',
      'Lidera e melhora uma unidade de infantaria.',
      'Sword of Idaeus com bom perfil de ataque.',
    ],
    cores: ['Azul Macragge', 'Ouro', 'Vermelho no pergaminho'],
    dicasPintura: [
      'Modelo mais sóbrio que Sicarius: menos ouro, mais azul — pinta mais rápido.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro urbano.',
  },
  {
    id: 'um-chronus',
    faccaoId: 'ultramarines',
    nome: 'Sergeant Chronus',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 55,
    pontosPara: '1 modelo',
    habilidades: [
      'O melhor piloto de tanque do capítulo.',
      'Embarca num veículo e melhora seu tiro e resistência.',
      'Sozinho, fora do tanque, é frágil.',
    ],
    cores: ['Azul Macragge', 'Prata nas ferramentas', 'Vermelho nas lentes'],
    dicasPintura: [
      'Meio corpo saindo da escotilha: pinte antes de encaixar no tanque.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Vai dentro do veículo; a base é só para quando estiver a pé.',
  },
  {
    id: 'um-telion',
    faccaoId: 'ultramarines',
    nome: 'Sergeant Telion',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 50,
    pontosPara: '1 modelo',
    habilidades: [
      'Mestre atirador que treina os Scouts do capítulo.',
      'Melhora muito o tiro da unidade de Scouts que acompanha.',
      'Alcance e precisão acima da média.',
    ],
    cores: ['Azul Macragge', 'Camuflagem na capa', 'Prata no rifle'],
    dicasPintura: [
      'A capa camuflada é a chance de sair do azul liso do capítulo.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Mato seco e escombro baixo.',
  },
  {
    id: 'um-cassius',
    faccaoId: 'ultramarines',
    nome: 'Chaplain Cassius',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 65,
    pontosPara: '1 modelo',
    habilidades: [
      'Mestre da Sanctidade, veterano de guerras contra Tyranids.',
      'Concede resistência e fúria à unidade que lidera.',
      'Rosto queimado e meio biônico — modelo com muita personalidade.',
    ],
    cores: ['Preto na armadura', 'Osso no crânio', 'Ouro no rosarius', 'Pele queimada no rosto'],
    dicasPintura: [
      'O rosto cicatrizado é o detalhe que faz o modelo: vale pintar com calma.',
      'Preto Chaplain com luz cinza nas quinas, contra o azul do resto do exército.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro com quitina tyranid, referência às guerras dele.',
  },

  /* ================================================================ */
  /* CHAOS SPACE MARINES                                               */
  /* ================================================================ */

  {
    id: 'csm-terminators',
    faccaoId: 'chaos-space-marines',
    nome: 'Chaos Terminator Squad',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 175,
    pontosPara: '5 modelos',
    habilidades: [
      'Deep Strike com armadura 2+ e invulnerável.',
      'Combi-weapons e power fists: bons contra quase tudo.',
      'A unidade de bater porta clássica do codex.',
    ],
    cores: ['Cor da legião', 'Bronze envelhecido', 'Ferro sujo', 'Vermelho nas lentes'],
    dicasPintura: [
      'Placa enorme: dá para praticar oxidação, verdete e desgaste sem medo.',
      'Diferencie os cinco modelos com marcas e sujeira diferentes — Caos não é uniforme.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Terra queimada com escombro e crânios.',
  },
  {
    id: 'csm-havocs',
    faccaoId: 'chaos-space-marines',
    nome: 'Havocs',
    papel: 'Tiro pesado',
    modelos: '5 modelos',
    pontos: 125,
    pontosPara: '5 modelos',
    habilidades: [
      'Quatro armas pesadas num único esquadrão.',
      'Lascannon, autocannon, missile launcher ou heavy bolter.',
      'Ficam parados numa ruína e atiram a partida inteira.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Metal escuro nas armas'],
    dicasPintura: [
      'As armas pesadas são a metade do modelo: pinte-as separadas antes de colar.',
      'Fuligem preta nas bocas dos canos dá uso e realismo.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Ruína elevada com munição gasta no chão.',
  },
  {
    id: 'csm-raptors',
    faccaoId: 'chaos-space-marines',
    nome: 'Raptors',
    papel: 'Ataque rápido',
    modelos: '5 ou 10 modelos',
    pontos: 90,
    pontosPara: '5 modelos',
    habilidades: [
      'Jump pack: chegam onde quiserem.',
      'Bons contra infantaria leve e para caçar unidades de suporte.',
      'Causam medo — reduzem a liderança inimiga.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Osso nos crânios', 'Preto nos jatos'],
    dicasPintura: [
      'Poses no ar: use pino de voo e escolha o ângulo antes de colar.',
      'Fuligem preta saindo dos jatos vende o movimento.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Base com pino de voo ou escombro elevado.',
  },
  {
    id: 'csm-possessed',
    faccaoId: 'chaos-space-marines',
    nome: 'Possessed',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 130,
    pontosPara: '5 modelos',
    habilidades: [
      'Daemons dentro da armadura: muitos ataques fortes.',
      'Invulnerável e boa resistência.',
      'Só corpo a corpo — precisam chegar.',
    ],
    cores: ['Cor da legião', 'Carne daemônica', 'Chifres em osso', 'Garras escuras'],
    dicasPintura: [
      'A carne mutante pede uma cor diferente da armadura, senão o modelo vira uma massa só.',
      'Modelos orgânicos e assimétricos — aqui não existe errado, aproveite.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terreno distorcido pela Warp, cor irreal.',
  },
  {
    id: 'csm-obliterators',
    faccaoId: 'chaos-space-marines',
    nome: 'Obliterators',
    papel: 'Elite',
    modelos: '2 ou 3 modelos',
    pontos: 150,
    pontosPara: '2 modelos',
    habilidades: [
      'Fleshmetal guns: mudam de arma conforme o alvo.',
      'Deep Strike com muita resistência.',
      'Poucos modelos, dano concentrado e alto.',
    ],
    cores: ['Carne cinzenta fundida ao metal', 'Bronze', 'Vermelho nas feridas'],
    dicasPintura: [
      'A fusão de carne com metal é o tema: transições sujas entre os dois é o que faz funcionar.',
      'Não deixe o metal limpo em nenhum ponto — tudo aqui é doente.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Terreno corrompido, com metal derretido.',
  },
  {
    id: 'csm-cultists',
    faccaoId: 'chaos-space-marines',
    nome: 'Accursed Cultists',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 90,
    pontosPara: '10 modelos',
    habilidades: [
      'Mutantes e torturados: baratos e numerosos.',
      'Seguram objetivo e absorvem fogo que iria nos Legionaries.',
      'Fracos individualmente.',
    ],
    cores: ['Panos sujos', 'Carne pálida mutada', 'Ferro enferrujado'],
    dicasPintura: [
      'Dez modelos baratos: pintura em lote e Contrast resolvem.',
      'Varie o tom de pele entre eles — mutação não é padronizada.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terra queimada com entulho.',
  },
  {
    id: 'csm-rhino',
    faccaoId: 'chaos-space-marines',
    nome: 'Chaos Rhino',
    papel: 'Transporte',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Transporta 10 modelos de infantaria do Caos.',
      'Barato, resistente e essencial para levar Legionaries ao alvo.',
      'Combi-bolter no teto para não ficar sem fazer nada.',
    ],
    cores: ['Cor da legião', 'Bronze nos ornamentos', 'Ferrugem nas quinas', 'Preto na fuligem'],
    dicasPintura: [
      'Superfície plana grande: aerógrafo ou spray colorido resolvem a base em minutos.',
      'Aqui o desgaste é obrigatório: chipping com esponja, ferrugem escorrendo e sujeira pesada embaixo.',
      'Espinhos e crânios adicionados devem parecer parafusados depois, não parte do tanque.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base; sujeira das esteiras combinando com a infantaria.',
  },
  {
    id: 'csm-predator',
    faccaoId: 'chaos-space-marines',
    nome: 'Chaos Predator',
    papel: 'Veículo',
    modelos: '1 modelo',
    pontos: 130,
    pontosPara: '1 modelo',
    habilidades: [
      'Torreta com lascannon ou autocannon.',
      'Sponsons laterais configuráveis.',
      'Plataforma de tiro que sobrevive bem atrás de cobertura.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Ferrugem'],
    dicasPintura: [
      'Mesmo chassi do Rhino: se você já fez um, o segundo sai na metade do tempo.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'csm-forgefiend',
    faccaoId: 'chaos-space-marines',
    nome: 'Forgefiend',
    papel: 'Veículo daemônico',
    modelos: '1 modelo',
    pontos: 145,
    pontosPara: '1 modelo',
    habilidades: [
      'Máquina daemônica de tiro pesado.',
      'Ectoplasma ou hades autocannons.',
      'Corre e atira sem penalidade em certas configurações.',
    ],
    cores: ['Cor da legião', 'Bronze', 'Carne daemônica nas juntas', 'Verde ou azul no ectoplasma'],
    dicasPintura: [
      'O ectoplasma brilhante é o ponto de cor: faça o centro quase branco.',
      'Junte carne e metal nas articulações — é o que separa máquina daemônica de veículo comum.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Terreno corrompido, base grande com composição.',
  },
  {
    id: 'csm-abaddon',
    faccaoId: 'chaos-space-marines',
    nome: 'Abaddon the Despoiler',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 235,
    pontosPara: '1 modelo',
    habilidades: [
      'Senhor da Guerra Negra, líder da Legião Negra.',
      'Drach’nyen e Talon of Horus: mata praticamente qualquer coisa em duelo.',
      'Concede re-rolls poderosos ao exército inteiro.',
    ],
    cores: ['Preto na armadura', 'Bronze pesado', 'Vermelho nos olhos e panos', 'Ouro na Talon'],
    dicasPintura: [
      'Preto com luz cinza-azulada e trim de bronze — a paleta mais icônica do Caos.',
      'A capa de peles pede drybrush em várias camadas; é a maior área do modelo.',
      'Peça de vitrine: separe uma sessão inteira só para ele.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Escombro imperial pisoteado, com águia quebrada.',
  },
  {
    id: 'csm-huron',
    faccaoId: 'chaos-space-marines',
    nome: 'Huron Blackheart',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 95,
    pontosPara: '1 modelo',
    habilidades: [
      'Tirano de Badab, líder dos Red Corsairs.',
      'Permite estratagemas extras e infiltração.',
      'Corpo meio reconstruído, com a Hamadrya no ombro.',
    ],
    cores: ['Vermelho escuro', 'Bronze', 'Metal biônico no rosto', 'Verde na Hamadrya'],
    dicasPintura: [
      'Metade do rosto é biônica: o contraste entre pele e metal é o detalhe central.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Piso de nave saqueada.',
  },
  {
    id: 'csm-fabius',
    faccaoId: 'chaos-space-marines',
    nome: 'Fabius Bile',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 90,
    pontosPara: '1 modelo',
    habilidades: [
      'Cirurgião-mor do Caos, criador dos New Men.',
      'Melhora a resistência da unidade que acompanha.',
      'Chirurgeon com ataques venenosos.',
    ],
    cores: ['Roxo e osso', 'Metal cirúrgico', 'Carne pálida', 'Verde nos frascos'],
    dicasPintura: [
      'Os frascos e tubos pedem cor viva e verniz brilhante — é o que dá o clima de laboratório.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Piso de laboratório com restos.',
  },
  {
    id: 'csm-cypher',
    faccaoId: 'chaos-space-marines',
    nome: 'Cypher',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 70,
    pontosPara: '1 modelo',
    habilidades: [
      'O Anjo Caído mais misterioso do cenário.',
      'Gunslinger: atira com duas pistolas com muita precisão.',
      'Difícil de matar por causa das regras de esquiva.',
    ],
    cores: ['Preto e verde escuro', 'Osso no capuz', 'Prata nas pistolas'],
    dicasPintura: [
      'A capa com capuz domina a silhueta: resolva ela primeiro e o resto é rápido.',
      'A espada nas costas nunca é sacada — mas é o detalhe que os fãs procuram.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro neutro; ele não pertence a lugar nenhum.',
  },

  /* ================================================================ */
  /* WORLD EATERS                                                      */
  /* ================================================================ */

  {
    id: 'we-jakhals',
    faccaoId: 'world-eaters',
    nome: 'Jakhals',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 65,
    pontosPara: '10 modelos',
    habilidades: [
      'Cultistas frenéticos, baratos e descartáveis.',
      'Correm à frente para amarrar o inimigo e liberar os Berzerkers.',
      'Dishonoured e Icon of Khorne mudam o comportamento da unidade.',
    ],
    cores: ['Vermelho nos panos', 'Pele suja', 'Ferro enferrujado', 'Sangue'],
    dicasPintura: [
      'Vinte modelos baratos: Contrast e pintura em lote, sem culpa.',
      'Sangue e sujeira escondem qualquer imperfeição — a unidade perfeita para pintar rápido.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terra árida rachada com crânios.',
  },
  {
    id: 'we-exalted-eightbound',
    faccaoId: 'world-eaters',
    nome: 'Exalted Eightbound',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 165,
    pontosPara: '3 modelos',
    habilidades: [
      'Versão superior dos Eightbound, com ainda mais ataques.',
      'Daemons plenamente manifestados dentro da armadura.',
      'Se chegarem inteiros, apagam praticamente qualquer unidade.',
    ],
    cores: ['Vermelho', 'Bronze', 'Carne daemônica', 'Fogo nos olhos'],
    dicasPintura: [
      'Olhos e fendas brilhando em amarelo-alaranjado dão a impressão de fogo interno.',
      'Poses muito dinâmicas: monte com a base já em mãos para acertar o equilíbrio.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Terra queimada com fissura brilhante.',
  },
  {
    id: 'we-terminators',
    faccaoId: 'world-eaters',
    nome: 'World Eaters Terminators',
    papel: 'Elite',
    modelos: '5 modelos',
    pontos: 190,
    pontosPara: '5 modelos',
    habilidades: [
      'Deep Strike direto no corpo a corpo.',
      'Armadura 2+ com invulnerável e muitos ataques.',
      'A forma mais confiável de entregar dano onde o exército precisa.',
    ],
    cores: ['Vermelho', 'Bronze pesado', 'Aço nas lâminas', 'Sangue'],
    dicasPintura: [
      'Placa grande em vermelho: primer vermelho ou base clara, nunca preto.',
      'Bronze com wash marrom escuro nas frestas é o contraponto ao vermelho.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Terra rachada com crânios empilhados.',
  },
  {
    id: 'we-rhino',
    faccaoId: 'world-eaters',
    nome: 'World Eaters Rhino',
    papel: 'Transporte',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Leva os Berzerkers ao corpo a corpo, que é a única coisa que importa.',
      'Barato e resistente o bastante para uma travessia.',
      'Sem ele, o exército anda a pé e morre atirado.',
    ],
    cores: ['Vermelho', 'Bronze', 'Ferrugem', 'Sangue nas lâminas frontais'],
    dicasPintura: [
      'Vermelho grande e liso: aerógrafo ou spray vermelho poupa muitas camadas.',
      'Sujeira e sangue pesados embaixo e na frente — este tanque atropela gente.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'we-lord-of-skulls',
    faccaoId: 'world-eaters',
    nome: 'Khorne Lord of Skulls',
    papel: 'Veículo super-pesado',
    modelos: '1 modelo',
    pontos: 425,
    pontosPara: '1 modelo',
    habilidades: [
      'Máquina daemônica gigantesca.',
      'Canhão pesado e lâmina de corpo a corpo em escala titânica.',
      'Absorve uma quantidade absurda de fogo.',
    ],
    cores: ['Vermelho', 'Bronze pesado', 'Metal escuro', 'Sangue'],
    dicasPintura: [
      'Modelo enorme: pinte em subconjuntos e conte com várias sessões.',
      'Aqui o aerógrafo deixa de ser luxo e vira necessidade prática.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'we-kharn',
    faccaoId: 'world-eaters',
    nome: 'Kharn the Betrayer',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 100,
    pontosPara: '1 modelo',
    habilidades: [
      'O campeão mais famoso de Khorne.',
      'Gorechild: muitos ataques que matam qualquer coisa em contato.',
      'Acerta aliados também — parte do charme.',
    ],
    cores: ['Vermelho', 'Bronze', 'Aço em Gorechild', 'Sangue fresco'],
    dicasPintura: [
      'O topete e o rosto exposto são a assinatura: vale caprichar na pele e no cabelo.',
      'Gorechild com sangue seco escuro na base da lâmina e fresco na ponta parece muito melhor.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Pilha de crânios — literal, é Khorne.',
  },
  {
    id: 'we-invocatus',
    faccaoId: 'world-eaters',
    nome: 'Lord Invocatus',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo',
    pontos: 145,
    pontosPara: '1 modelo',
    habilidades: [
      'Montado em juggernaut: muito rápido para o tamanho.',
      'Permite reposicionar unidades do exército antes do jogo.',
      'Carga devastadora.',
    ],
    cores: ['Vermelho', 'Bronze do juggernaut', 'Ferro escuro', 'Fogo nas narinas'],
    dicasPintura: [
      'O juggernaut é maior que o cavaleiro: trate o bronze dele como a área principal.',
      'Um brilho quente saindo das juntas da máquina daemônica dá vida ao modelo.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Terra revirada com marca de casco e crânios.',
  },
  {
    id: 'we-eightbound-lord',
    faccaoId: 'world-eaters',
    nome: 'Master of Executions',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 70,
    pontosPara: '1 modelo',
    habilidades: [
      'Caçador de personagens: mata HQ inimigo em duelo.',
      'Axe of Dismemberment com dano alto.',
      'Barato para o que entrega.',
    ],
    cores: ['Vermelho', 'Bronze', 'Osso nos troféus', 'Sangue'],
    dicasPintura: [
      'Os crânios-troféu na cintura são o detalhe narrativo — pinte-os em tons diferentes.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Crânios e terra queimada.',
  },

  /* ================================================================ */
  /* ORKS                                                              */
  /* ================================================================ */

  {
    id: 'ork-beast-snagga-boyz',
    faccaoId: 'orks',
    nome: 'Beast Snagga Boyz',
    papel: 'Battleline',
    modelos: '10 modelos',
    pontos: 105,
    pontosPara: '10 modelos',
    habilidades: [
      'Caçadores de monstros: ferem melhor alvos grandes.',
      'Mais resistentes que os Boyz comuns.',
      'Ignoram parte dos efeitos que reduzem movimento.',
    ],
    cores: ['Pele verde', 'Couro e pele de bicho', 'Ferro', 'Vermelho do clã'],
    dicasPintura: [
      'Mais couro e osso que os Boyz normais: bom lugar para variar do verde.',
      'As presas e ossos amarrados no corpo pedem osso claro para saltar.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terra batida com sucata e osso.',
  },
  {
    id: 'ork-nobz',
    faccaoId: 'orks',
    nome: 'Nobz',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 105,
    pontosPara: '5 modelos',
    habilidades: [
      'Orks grandes com armas melhores e mais ferimentos.',
      'Acompanham um Warboss e viram uma unidade brutal.',
      'Bosspole e opções de arma variadas.',
    ],
    cores: ['Pele verde', 'Ferro pesado', 'Couro', 'Cor do clã'],
    dicasPintura: [
      'Modelos maiores que os Boyz: dá para caprichar mais sem perder muito tempo.',
      'Diferencie cada Nob com uma cor de pano ou marca — eles são chefes, não tropa.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Sucata empilhada.',
  },
  {
    id: 'ork-meganobz',
    faccaoId: 'orks',
    nome: 'Meganobz',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 140,
    pontosPara: '3 modelos',
    habilidades: [
      'Mega armour: resistência de Terminator.',
      'Power klaws que abrem veículo.',
      'Lentos: vão de Trukk ou Battlewagon.',
    ],
    cores: ['Ferro pesado', 'Pele verde', 'Cor do clã nas placas'],
    dicasPintura: [
      'Armadura enorme e amassada: esponja com prata nas quinas resolve em minutos.',
      'Ferrugem laranja nas juntas é obrigatória — nada ork é bem cuidado.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Chapa de metal amassada sobre terra.',
  },
  {
    id: 'ork-kommandos',
    faccaoId: 'orks',
    nome: 'Kommandos',
    papel: 'Tropa infiltrada',
    modelos: '10 modelos',
    pontos: 100,
    pontosPara: '10 modelos',
    habilidades: [
      'Infiltram e aparecem no flanco.',
      'Boa mistura de tiro e corpo a corpo.',
      'Os modelos de Kill Team mais bonitos que os Orks já tiveram.',
    ],
    cores: ['Pele verde', 'Panos escuros de camuflagem', 'Ferro sujo'],
    dicasPintura: [
      'Camuflagem orky é só borrão escuro — não tente padrão militar, fica errado.',
      'O kit tem muita personalidade por modelo: aqui vale fugir do batch painting.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Mato e sucata escondida.',
  },
  {
    id: 'ork-lootas',
    faccaoId: 'orks',
    nome: 'Lootas',
    papel: 'Tiro pesado',
    modelos: '5 ou 10 modelos',
    pontos: 70,
    pontosPara: '5 modelos',
    habilidades: [
      'Deffguns: muito tiro a longa distância, com quantidade imprevisível.',
      'Ficam parados numa ruína atirando.',
      'Baratos pelo volume de fogo.',
    ],
    cores: ['Pele verde', 'Ferro enferrujado', 'Cor do clã'],
    dicasPintura: [
      'As armas são maiores que os orks: comece por elas.',
      'Ferrugem pesada com esponja e pigmento laranja é o que define a estética Loota.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Sucata com munição espalhada.',
  },
  {
    id: 'ork-stormboyz',
    faccaoId: 'orks',
    nome: 'Stormboyz',
    papel: 'Ataque rápido',
    modelos: '5 ou 10 modelos',
    pontos: 65,
    pontosPara: '5 modelos',
    habilidades: [
      'Rokkit packs: movimento longo e imprevisível.',
      'Chegam cedo ao corpo a corpo.',
      'Frágeis, mas baratos.',
    ],
    cores: ['Pele verde', 'Preto nos rokkits', 'Vermelho do clã'],
    dicasPintura: [
      'Fuligem preta saindo dos foguetes vende o movimento.',
      'Poses no ar pedem pino de voo ou apoio bem escolhido.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Base com pino ou escombro elevado.',
  },
  {
    id: 'ork-squighog',
    faccaoId: 'orks',
    nome: 'Squighog Boyz',
    papel: 'Cavalaria',
    modelos: '3 modelos',
    pontos: 85,
    pontosPara: '3 modelos',
    habilidades: [
      'Cavalaria rápida montada em squigs.',
      'Carga forte com lanças.',
      'Boa para pegar objetivo distante cedo.',
    ],
    cores: ['Vermelho vivo do squig', 'Pele verde', 'Couro', 'Branco nos dentes'],
    dicasPintura: [
      'O squig é a maior área e a mais divertida: vermelho vivo, dentes brancos, língua rosada.',
      'Contraste entre o vermelho do squig e o verde do ork é o que faz a unidade funcionar.',
    ],
    baseTamanho: '60x35mm oval',
    baseTerreno: 'Terra revirada com marca de pata.',
  },
  {
    id: 'ork-trukk',
    faccaoId: 'orks',
    nome: 'Trukk',
    papel: 'Transporte',
    modelos: '1 modelo',
    pontos: 65,
    pontosPara: '1 modelo',
    habilidades: [
      'Leva 12 Boyz para a briga rapidamente.',
      'Frágil: costuma explodir, mas já entregou a carga.',
      'Barato o bastante para ser descartável.',
    ],
    cores: ['Cor do clã', 'Ferro enferrujado', 'Madeira nas tábuas'],
    dicasPintura: [
      'Nada precisa estar reto nem simétrico — é o veículo mais perdoado do hobby.',
      'Ferrugem por toda parte e chapas de cor diferente contam a história da sucata.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'ork-battlewagon',
    faccaoId: 'orks',
    nome: 'Battlewagon',
    papel: 'Transporte pesado',
    modelos: '1 modelo',
    pontos: 165,
    pontosPara: '1 modelo',
    habilidades: [
      'Transporte grande e resistente para Meganobz ou Boyz.',
      'Deff rolla atropela na carga.',
      'Muitas opções de arma montada.',
    ],
    cores: ['Cor do clã', 'Ferro', 'Ferrugem pesada'],
    dicasPintura: [
      'Veículo enorme e cheio de placas: cada chapa pode ser de um tom diferente.',
      'Sangue e sujeira no deff rolla — ele existe para atropelar.',
    ],
    baseTamanho: 'Sem base',
    baseTerreno: 'Não usa base.',
  },
  {
    id: 'ork-deff-dread',
    faccaoId: 'orks',
    nome: 'Deff Dread',
    papel: 'Walker',
    modelos: '1 modelo',
    pontos: 130,
    pontosPara: '1 modelo',
    habilidades: [
      'Walker com quatro braços de corpo a corpo.',
      'Resistente e barato para o dano que entrega.',
      'Anda para frente e destrói o que alcançar.',
    ],
    cores: ['Cor do clã', 'Ferro', 'Ferrugem', 'Verde do piloto pela grade'],
    dicasPintura: [
      'Dá para deixar o ork piloto visível pela grade — detalhe que sempre chama atenção.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Sucata pesada.',
  },
  {
    id: 'ork-killa-kans',
    faccaoId: 'orks',
    nome: 'Killa Kans',
    papel: 'Walker',
    modelos: '3 modelos',
    pontos: 105,
    pontosPara: '3 modelos',
    habilidades: [
      'Grots pilotando walkers pequenos.',
      'Baratos e numerosos para walkers.',
      'Coragem ruim: fogem se ficarem sozinhos.',
    ],
    cores: ['Cor do clã', 'Ferro enferrujado', 'Grot visível na cabine'],
    dicasPintura: [
      'Três modelos com cara diferente: pinte cada um com uma cor de chapa distinta.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Sucata e chapa amassada.',
  },
  {
    id: 'ork-gretchin',
    faccaoId: 'orks',
    nome: 'Gretchin',
    papel: 'Tropa',
    modelos: '10 modelos',
    pontos: 40,
    pontosPara: '10 modelos',
    habilidades: [
      'Baratíssimos: existem para segurar objetivo em casa.',
      'Fracos em tudo.',
      'Acompanhados de um Runtherd.',
    ],
    cores: ['Pele verde clara', 'Panos sujos', 'Ferro'],
    dicasPintura: [
      'Use um verde mais claro que o dos Boyz — diferencia a espécie de longe.',
      'São dez modelos minúsculos: Contrast e pronto, não invista mais que isso.',
    ],
    baseTamanho: '25mm',
    baseTerreno: 'Terra batida com sucata pequena.',
  },
  {
    id: 'ork-big-mek',
    faccaoId: 'orks',
    nome: 'Big Mek with Shokk Attack Gun',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 90,
    pontosPara: '1 modelo',
    habilidades: [
      'Teleporta grots dentro do inimigo: dano imprevisível e alto.',
      'Repara veículos próximos.',
      'Um dos modelos mais divertidos do exército.',
    ],
    cores: ['Pele verde', 'Ferro', 'Vermelho nos cabos', 'Grots na gaiola'],
    dicasPintura: [
      'A gaiola de grots é o detalhe narrativo: pinte-os com cara de pânico.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Sucata mecânica.',
  },
  {
    id: 'ork-weirdboy',
    faccaoId: 'orks',
    nome: 'Weirdboy',
    papel: 'Personagem (HQ)',
    modelos: '1 modelo',
    pontos: 65,
    pontosPara: '1 modelo',
    habilidades: [
      'Psíquico ork: poderes fortes e instáveis.',
      'Teleporta uma unidade de Boyz pelo campo.',
      'Pode explodir a própria cabeça — literalmente.',
    ],
    cores: ['Pele verde', 'Panos roxos', 'Verde luminoso na energia'],
    dicasPintura: [
      'A energia psíquica verde é o único ponto de luz: faça o centro quase branco.',
      'Um brilho verde refletido na pele ao redor da cabeça vende o efeito.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Terra com efeito de energia.',
  },
  {
    id: 'ork-ghazghkull',
    faccaoId: 'orks',
    nome: 'Ghazghkull Thraka',
    nomeado: true,
    papel: 'Personagem nomeado (HQ)',
    modelos: '1 modelo + Makari',
    pontos: 235,
    pontosPara: '1 modelo',
    habilidades: [
      'O maior Warboss do cenário, profeta do Waaagh!.',
      'Resistência enorme e ataques devastadores.',
      'Melhora o Waaagh! do exército inteiro.',
    ],
    cores: ['Ferro pesado', 'Pele verde', 'Vermelho e amarelo das placas', 'Branco nos dentes'],
    dicasPintura: [
      'Modelo enorme com placas gigantes: perfeito para grafite ork e símbolos pintados à mão.',
      'Makari, o grot porta-bandeira, vem junto e merece atenção própria.',
      'Ferrugem e batidas por toda parte — nada nele deve parecer novo.',
    ],
    baseTamanho: '80mm',
    baseTerreno: 'Sucata pesada com capacete imperial amassado.',
  },
  {
    id: 'ork-snikrot',
    faccaoId: 'orks',
    nome: 'Boss Snikrot',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Chefe dos Kommandos, mestre da emboscada.',
      'Aparece no flanco com a unidade que lidera.',
      'Muito bom no corpo a corpo contra infantaria.',
    ],
    cores: ['Pele verde', 'Panos escuros', 'Aço nas lâminas', 'Vermelho nos olhos'],
    dicasPintura: [
      'Modelo escuro e furtivo: use verdes mais frios que no resto do exército.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Mato alto e sombra.',
  },
  {
    id: 'ork-badrukk',
    faccaoId: 'orks',
    nome: 'Kaptin Badrukk',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 75,
    pontosPara: '1 modelo',
    habilidades: [
      'Chefe dos Flash Gitz, mercenário e vaidoso.',
      'Melhora o tiro da unidade que lidera.',
      'Cheio de ouro roubado.',
    ],
    cores: ['Pele verde', 'Ouro e vermelho', 'Ferro', 'Branco na pena do chapéu'],
    dicasPintura: [
      'É o ork mais espalhafatoso do codex: quanto mais ouro, mais certo.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Sucata com tesouro espalhado.',
  },
  {
    id: 'ork-grotsnik',
    faccaoId: 'orks',
    nome: 'Mad Dok Grotsnik',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 65,
    pontosPara: '1 modelo',
    habilidades: [
      'Painboy insano: cura e deixa a unidade mais agressiva.',
      'Ataques cirúrgicos e imprevisíveis.',
      'Barato para o efeito que dá numa unidade grande.',
    ],
    cores: ['Pele verde', 'Branco sujo do avental', 'Metal cirúrgico', 'Vermelho de sangue'],
    dicasPintura: [
      'O avental branco ensanguentado é a peça central — sangue seco escuro funciona melhor.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Sucata com restos.',
  },

  /* ================================================================ */
  /* TYRANIDS                                                          */
  /* ================================================================ */

  {
    id: 'tyr-hormagaunts',
    faccaoId: 'tyranids',
    nome: 'Hormagaunts',
    papel: 'Battleline',
    modelos: '10 ou 20 modelos',
    pontos: 65,
    pontosPara: '10 modelos',
    habilidades: [
      'Movimento alto: chegam ao corpo a corpo antes de qualquer coisa.',
      'Muitos ataques baratos.',
      'Morrem fácil, mas custam quase nada.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras escuras'],
    dicasPintura: [
      'Vinte modelos em pose de corrida: Contrast resolve, não tente mais que isso.',
      'Pinte a carne primeiro, a carapaça por cima é mais fácil de corrigir que o contrário.',
    ],
    baseTamanho: '28mm',
    baseTerreno: 'Biomassa alienígena ou terra devastada.',
  },
  {
    id: 'tyr-genestealers',
    faccaoId: 'tyranids',
    nome: 'Genestealers',
    papel: 'Elite',
    modelos: '5 ou 10 modelos',
    pontos: 75,
    pontosPara: '5 modelos',
    habilidades: [
      'Garras rasgadoras: perfuram armadura pesada.',
      'Infiltram e avançam muito rápido.',
      'Lideradas por um Broodlord, viram uma ameaça de primeira ordem.',
    ],
    cores: ['Carapaça roxa ou azul', 'Carne clara', 'Garras escuras', 'Vermelho nos olhos'],
    dicasPintura: [
      'A carapaça lisa e curva das costas é o melhor lugar para uma transição suave.',
      'Olhos vermelhos pequenos em modelo escuro: um ponto vale mais que um desenho.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Piso de nave com biomassa começando a tomar conta.',
  },
  {
    id: 'tyr-warriors',
    faccaoId: 'tyranids',
    nome: 'Tyranid Warriors',
    papel: 'Elite',
    modelos: '3 ou 6 modelos',
    pontos: 85,
    pontosPara: '3 modelos',
    habilidades: [
      'Nós de sinapse: mantêm a horda funcionando ao redor.',
      'Configuráveis para tiro ou corpo a corpo.',
      'Resistência média: precisam de apoio.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras', 'Detalhes viscosos'],
    dicasPintura: [
      'São a versão média do enxame: bom lugar para testar o esquema antes de fazer vinte gaunts.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Biomassa com esporo.',
  },
  {
    id: 'tyr-zoanthropes',
    faccaoId: 'tyranids',
    nome: 'Zoanthropes',
    papel: 'Elite psíquica',
    modelos: '3 modelos',
    pontos: 110,
    pontosPara: '3 modelos',
    habilidades: [
      'Ataque psíquico de longo alcance que ignora cobertura.',
      'Invulnerável bom: sobrevivem a tiro.',
      'Flutuam — a base precisa de pino.',
    ],
    cores: ['Carapaça', 'Cérebro exposto rosado', 'Azul na energia psíquica'],
    dicasPintura: [
      'O cérebro exposto é o ponto focal: rosa com veias e verniz brilhante por cima.',
      'Modelos flutuantes pedem base com pino transparente ou suporte de biomassa.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Biomassa com pino de voo.',
  },
  {
    id: 'tyr-lictor',
    faccaoId: 'tyranids',
    nome: 'Lictor',
    papel: 'Infiltrador',
    modelos: '1 modelo',
    pontos: 60,
    pontosPara: '1 modelo',
    habilidades: [
      'Aparece do nada perto do inimigo.',
      'Muito bom contra personagens e unidades de suporte.',
      'Camuflagem: difícil de acertar à distância.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras longas', 'Língua e tentáculos'],
    dicasPintura: [
      'Modelo alto e fino: a silhueta é tudo, use contraste forte entre carapaça e carne.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Biomassa ou ruína, sugerindo emboscada.',
  },
  {
    id: 'tyr-hive-tyrant',
    faccaoId: 'tyranids',
    nome: 'Hive Tyrant',
    papel: 'Monstro / Sinapse',
    modelos: '1 modelo',
    pontos: 200,
    pontosPara: '1 modelo',
    habilidades: [
      'O comandante do enxame: sinapse forte e boa aura.',
      'Configurável para tiro pesado ou corpo a corpo.',
      'Muitos ferimentos e boa proteção.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras', 'Detalhes de destaque'],
    dicasPintura: [
      'É a peça central do exército: aqui vale caprichar na transição da carapaça.',
      'Asas, quando presentes, pedem pintura separada antes de colar.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Biomassa com esporos e restos.',
  },
  {
    id: 'tyr-broodlord',
    faccaoId: 'tyranids',
    nome: 'Broodlord',
    papel: 'Personagem',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Lidera Genestealers e melhora muito o ataque deles.',
      'Poder psíquico que reduz a liderança inimiga.',
      'Rápido e letal no corpo a corpo.',
    ],
    cores: ['Carapaça escura', 'Carne clara', 'Garras', 'Olhos vermelhos'],
    dicasPintura: [
      'Ele é um Genestealer grande: use o mesmo esquema, mas com mais camadas e contraste.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Piso de nave com biomassa.',
  },
  {
    id: 'tyr-screamer-killer',
    faccaoId: 'tyranids',
    nome: 'Screamer-Killer',
    papel: 'Monstro',
    modelos: '1 modelo',
    pontos: 125,
    pontosPara: '1 modelo',
    habilidades: [
      'Carnifex especializado em corpo a corpo.',
      'Bio-plasma de curto alcance antes da carga.',
      'Resistente e barato para um monstro.',
    ],
    cores: ['Carapaça', 'Carne', 'Azul ou verde no bio-plasma'],
    dicasPintura: [
      'O bio-plasma na boca é o único ponto de luz: faça o centro quase branco.',
      'Peito e barriga mais claros que as costas dá volume de graça.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Cratera com biomassa.',
  },
  {
    id: 'tyr-exocrine',
    faccaoId: 'tyranids',
    nome: 'Exocrine',
    papel: 'Monstro de tiro',
    modelos: '1 modelo',
    pontos: 135,
    pontosPara: '1 modelo',
    habilidades: [
      'Canhão bio-plasmático de longo alcance.',
      'Fica parado e atira: melhora a precisão se não se mover.',
      'Boa resistência para o custo.',
    ],
    cores: ['Carapaça pesada', 'Carne', 'Plasma brilhante'],
    dicasPintura: [
      'A carapaça das costas é uma placa gigante — perfeita para aerógrafo.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Biomassa densa.',
  },
  {
    id: 'tyr-trygon',
    faccaoId: 'tyranids',
    nome: 'Trygon',
    papel: 'Monstro',
    modelos: '1 modelo',
    pontos: 160,
    pontosPara: '1 modelo',
    habilidades: [
      'Sai do subsolo com uma unidade junto.',
      'Muitos ataques no corpo a corpo.',
      'Grande e resistente, mas sem proteção especial.',
    ],
    cores: ['Carapaça', 'Carne', 'Garras enormes'],
    dicasPintura: [
      'O corpo comprido pede um degradê ao longo do dorso — do escuro na cabeça ao claro na cauda.',
      'A base precisa sugerir o buraco de onde ele saiu; vale esculpir terra revirada.',
    ],
    baseTamanho: '120x92mm oval',
    baseTerreno: 'Cratera de emergência, terra revirada em volta.',
  },
  {
    id: 'tyr-neurotyrant',
    faccaoId: 'tyranids',
    nome: 'Neurotyrant',
    papel: 'Personagem psíquico',
    modelos: '1 modelo + Neuroloids',
    pontos: 105,
    pontosPara: '1 modelo',
    habilidades: [
      'Sinapse forte e ataque psíquico em área.',
      'Reduz a liderança das unidades inimigas próximas.',
      'Acompanhado de dois Neuroloids.',
    ],
    cores: ['Carapaça', 'Cérebro exposto', 'Roxo na energia'],
    dicasPintura: [
      'Cérebro e tecido nervoso expostos: rosa e roxo com brilho, é o tema da unidade.',
    ],
    baseTamanho: '50mm',
    baseTerreno: 'Biomassa com esporo nervoso.',
  },
  {
    id: 'tyr-swarmlord',
    faccaoId: 'tyranids',
    nome: 'The Swarmlord',
    nomeado: true,
    papel: 'Personagem nomeado (Monstro)',
    modelos: '1 modelo',
    pontos: 240,
    pontosPara: '1 modelo',
    habilidades: [
      'O maior estrategista da Mente-Colmeia.',
      'Quatro bone sabres: mata monstros e veículos em duelo.',
      'Permite que outra unidade se mova fora do turno.',
    ],
    cores: ['Carapaça', 'Carne', 'Osso nas lâminas', 'Detalhes de destaque'],
    dicasPintura: [
      'As quatro lâminas de osso são a assinatura: pinte-as mais claras que o resto.',
      'É a peça de vitrine do enxame — reserve uma sessão inteira.',
    ],
    baseTamanho: '60mm',
    baseTerreno: 'Biomassa elevada, ele deve dominar a cena.',
  },
  {
    id: 'tyr-deathleaper',
    faccaoId: 'tyranids',
    nome: 'Deathleaper',
    nomeado: true,
    papel: 'Personagem nomeado',
    modelos: '1 modelo',
    pontos: 80,
    pontosPara: '1 modelo',
    habilidades: [
      'Lictor lendário, caçador de personagens.',
      'Muito difícil de acertar à distância.',
      'Reduz a eficácia dos comandantes inimigos.',
    ],
    cores: ['Carapaça escura', 'Carne pálida', 'Garras longas'],
    dicasPintura: [
      'Modelo escuro e furtivo: use um esquema mais frio que o do resto do enxame.',
    ],
    baseTamanho: '40mm',
    baseTerreno: 'Ruína com biomassa, em pose de emboscada.',
  },
  {
    id: 'tyr-old-one-eye',
    faccaoId: 'tyranids',
    nome: 'Old One Eye',
    nomeado: true,
    papel: 'Personagem nomeado (Monstro)',
    modelos: '1 modelo',
    pontos: 140,
    pontosPara: '1 modelo',
    habilidades: [
      'Carnifex lendário que se regenera.',
      'Melhora os Carnifexes próximos.',
      'Muito forte no corpo a corpo.',
    ],
    cores: ['Carapaça cicatrizada', 'Carne', 'Garras', 'Cicatrizes claras'],
    dicasPintura: [
      'As cicatrizes são o personagem: pinte-as em tom mais claro que a carapaça ao redor.',
      'Um olho fechado ou destruído — não esqueça, é literalmente o nome dele.',
    ],
    baseTamanho: '90mm oval',
    baseTerreno: 'Cratera com restos de veículo destruído.',
  },
]

/**
 * Unidades disponíveis para uma facção, já somando o que ela herda.
 *
 * Um capítulo de Space Marines não repete Intercessores na própria lista: ele
 * herda a linha genérica dos Astartes e acrescenta só o que é dele — os
 * personagens nomeados e as peças exclusivas do capítulo.
 */
export function unidadesDaFaccao(faccaoId: string): {
  proprias: Unidade[]
  herdadas: Unidade[]
  todas: Unidade[]
} {
  const proprias = UNIDADES_POR_FACCAO[faccaoId] ?? []
  const paiId = FACCOES_POR_ID.get(faccaoId)?.herdaUnidadesDe
  const herdadas = paiId ? (UNIDADES_POR_FACCAO[paiId] ?? []) : []
  return { proprias, herdadas, todas: [...proprias, ...herdadas] }
}

/** Separa unidades comuns de personagens nomeados, para a interface agrupar. */
export function separarNomeados(lista: Unidade[]): {
  unidades: Unidade[]
  nomeados: Unidade[]
} {
  return {
    unidades: lista.filter((u) => !u.nomeado),
    nomeados: lista.filter((u) => u.nomeado),
  }
}

export const UNIDADES_POR_FACCAO = UNIDADES.reduce<Record<string, Unidade[]>>((acc, u) => {
  ;(acc[u.faccaoId] ??= []).push(u)
  return acc
}, {})

/* ================================================================== */
/* STATUS DE PINTURA                                                   */
/* ================================================================== */

export type StatusMini =
  | 'desmontada'
  | 'montada'
  | 'primer'
  | 'pintando'
  | 'detalhes'
  | 'base'
  | 'finalizada'

export const STATUS_ORDEM: StatusMini[] = [
  'desmontada',
  'montada',
  'primer',
  'pintando',
  'detalhes',
  'base',
  'finalizada',
]

export const STATUS_INFO: Record<
  StatusMini,
  { label: string; cor: string; descricao: string }
> = {
  desmontada: {
    label: 'Desmontada',
    cor: '#8a8f94',
    descricao: 'Ainda no sprue ou em partes soltas.',
  },
  montada: {
    label: 'Montada',
    cor: '#a8752f',
    descricao: 'Colada, rebarba limpa, pronta para o primer.',
  },
  primer: {
    label: 'Com primer',
    cor: '#5d7f9c',
    descricao: 'Base aplicada, esperando a primeira cor.',
  },
  pintando: {
    label: 'Em pintura',
    cor: '#3f7fc0',
    descricao: 'Cores principais em andamento.',
  },
  detalhes: {
    label: 'Detalhes',
    cor: '#7e5fa5',
    descricao: 'Luzes, sombras, lentes, insígnias.',
  },
  base: {
    label: 'Base / acabamento',
    cor: '#8a6a44',
    descricao: 'Falta terminar a base e passar verniz.',
  },
  finalizada: {
    label: 'Finalizada',
    cor: '#3f9a5a',
    descricao: 'Pronta para a vitrine e para a mesa.',
  },
}

/** Quanto do caminho já foi andado — usado nas barras de progresso. */
export function progressoDoStatus(status: StatusMini): number {
  const i = STATUS_ORDEM.indexOf(status)
  return Math.round((i / (STATUS_ORDEM.length - 1)) * 100)
}

/* ================================================================== */
/* MATERIAIS DE BASE                                                   */
/* ================================================================== */

export const RECEITAS_BASE: {
  id: string
  nome: string
  ambiente: string
  passos: string[]
  combina: string[]
}[] = [
  {
    id: 'urbano',
    nome: 'Escombro urbano',
    ambiente: 'Cidade destruída, ruína imperial',
    passos: [
      'Cole areia grossa e pedaços de cortiça irregulares.',
      'Pinte tudo de cinza escuro (Vallejo 70.995 German Grey).',
      'Drybrush cinza médio e depois cinza claro nas quinas.',
      'Wash marrom localizado nas depressões para sujar.',
      'Opcional: um tufo de grama morta quebrando a monotonia.',
    ],
    combina: ['ultramarines', 'astra-militarum', 'adepta-sororitas', 'blood-angels'],
  },
  {
    id: 'deserto',
    nome: 'Areia de deserto',
    ambiente: 'Mundo árido, tumba necron, Prospero',
    passos: [
      'Textura de areia fina uniforme.',
      'Base em marrom areia (Vallejo 70.976 Buff).',
      'Wash marrom bem diluído.',
      'Drybrush em osso claro para secar a superfície.',
      'Rachaduras com produto de craquelê nas áreas maiores.',
    ],
    combina: ['necrons', 'tau', 'thousand-sons', 'world-eaters'],
  },
  {
    id: 'lama',
    nome: 'Lama e pântano',
    ambiente: 'Nurgle, esgoto, campo alagado',
    passos: [
      'Massa de textura marrom grossa, aplicada irregular.',
      'Pinte em marrom escuro e deixe secar completamente.',
      'Drybrush marrom claro nas partes altas.',
      'Verniz brilhante (ou resina) nas depressões para virar poça.',
      'Tinta verde diluída na poça para dar aspecto de água parada.',
    ],
    combina: ['death-guard', 'maggotkin-of-nurgle', 'skaven', 'orks'],
  },
  {
    id: 'neve',
    nome: 'Neve sobre rocha',
    ambiente: 'Mundo gelado, Fenris',
    passos: [
      'Faça a rocha completa primeiro: cinza com drybrush claro.',
      'Só então aplique a pasta de neve, acumulando no lado do vento.',
      'Não cubra tudo: neve parcial parece mais real que neve total.',
      'Um toque de azul bem diluído na sombra da neve dá frio à cena.',
    ],
    combina: ['space-wolves', 'grey-knights', 'nighthaunt'],
  },
  {
    id: 'industrial',
    nome: 'Piso industrial',
    ambiente: 'Nave, forja, Mechanicus',
    passos: [
      'Placa de plasticard cortada ou base texturizada de piso.',
      'Metal escuro (Leadbelcher) como base.',
      'Wash preto pesado nas frestas.',
      'Drybrush prata nas quinas onde o pé passaria.',
      'Ferrugem com esponja e pigmento laranja nas juntas.',
    ],
    combina: ['adeptus-mechanicus', 'necrons', 'leagues-of-votann', 'grey-knights'],
  },
  {
    id: 'grama',
    nome: 'Campo e grama',
    ambiente: 'Age of Sigmar, batalha em campo aberto',
    passos: [
      'Areia média colada com cola branca diluída.',
      'Marrom escuro de base, drybrush em bege.',
      'Cole tufos de grama estática em 2 ou 3 pontos, nunca espalhados por igual.',
      'Uma pedra maior quebra a silhueta plana da base.',
    ],
    combina: ['stormcast-eternals', 'cities-of-sigmar', 'orruk-warclans', 'seraphon'],
  },
  {
    id: 'preta',
    nome: 'Base preta minimalista',
    ambiente: 'Vitrine, fantasma, foco total no modelo',
    passos: [
      'Massa lisa ou base sem textura.',
      'Preto fosco uniforme.',
      'Borda em preto brilhante para acabamento de vitrine.',
      'Opcional: leve névoa clara na borda para peças etéreas.',
    ],
    combina: ['nighthaunt', 'soulblight-gravelords', 'drukhari'],
  },
]

/* ================================================================== */
/* KILL TEAM                                                           */
/* ================================================================== */

/**
 * Times de Kill Team.
 *
 * Kill Team é o jogo de escaramuça: seis a doze modelos por lado, cada um com
 * ficha própria. Para quem pinta, é o formato ideal — dá para caprichar em
 * cada peça sem enfrentar um exército inteiro, e um time completo cabe numa
 * sessão de fim de semana.
 *
 * Os times aqui têm composição por papéis, não a lista fechada de operativos:
 * a composição exata muda a cada edição e a cada errata.
 */
export type KillTeam = {
  id: string
  nome: string
  faccao: string
  /** Vínculo com a facção da biblioteca, quando existe. */
  faccaoId?: string
  operativos: string
  resumo: string
  /** Como o time se comporta na mesa. */
  comoJoga: string[]
  /** Papéis que compõem o time. */
  papeis: { nome: string; funcao: string }[]
  cores: string[]
  dicasPintura: string[]
  baseTamanho: string
  baseTerreno: string
  /** Quanto trabalho de pintura o time dá, de 1 (rápido) a 5 (projeto). */
  esforcoPintura: number
}

export const KILL_TEAMS: KillTeam[] = [
  {
    id: 'kt-vespid-stingwings',
    nome: 'Vespid Stingwings',
    faccao: "T'au Empire (auxiliares)",
    faccaoId: 'tau',
    operativos: '6 operativos',
    resumo:
      'Alienígenas alados de Vespid, auxiliares do Império T\'au. Voam sobre o terreno e atacam com neutron blasters que ignoram armadura. Time pequeno, rápido e frágil — erra uma vez e perde o operativo.',
    comoJoga: [
      'Voo: ignoram terreno e atacam de ângulos que ninguém espera.',
      'Neutron blaster tem penetração alta: bom contra alvos blindados, apesar do tamanho do time.',
      'Poucos operativos e pouca resistência — o time perde rápido se trocar tiro de frente.',
      'A estratégia é chegar, atirar do alto e sumir para trás da cobertura.',
    ],
    papeis: [
      { nome: 'Strain Leader', funcao: 'Líder, coordena o enxame e melhora o time' },
      { nome: 'Longsting', funcao: 'Alcance longo, ataca alvos específicos' },
      { nome: 'Skyblast', funcao: 'Ataque em área a partir do alto' },
      { nome: 'Stingwing Warrior', funcao: 'Corpo do time, neutron blaster padrão' },
    ],
    cores: [
      'Quitina azul ou verde iridescente',
      'Asas translúcidas',
      'Capacete e armas em bege T\'au',
      'Lentes vermelhas ou âmbar',
    ],
    dicasPintura: [
      'As asas são o desafio: pinte por trás com cor bem diluída para dar translucidez, nunca cor sólida.',
      'A quitina fica excelente com um esquema de troca de cor — azul na base, verde nas quinas. Dá o efeito de inseto sem precisar de tinta camaleão.',
      'O contraste entre a quitina orgânica e o equipamento T\'au bege é o que identifica o time. Não pinte tudo da mesma família.',
      'Seis modelos apenas: dá para tratar cada um como peça de vitrine.',
    ],
    baseTamanho: '28mm com haste de voo',
    baseTerreno:
      'Base simples com haste — eles voam, então o chão importa pouco. Um pouco de areia clara combinando com o resto da mesa basta.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-hand-of-the-archon',
    nome: 'Hand of the Archon',
    faccao: 'Drukhari',
    faccaoId: 'drukhari',
    operativos: '10 operativos (escolhidos de uma lista maior)',
    resumo:
      'A mão direita de um Archon de Commorragh: kabalitas especializados, cada um com um papel distinto. Um dos times mais versáteis do jogo, porque você monta a equipe escolhendo especialistas para a missão.',
    comoJoga: [
      'Composição flexível: você escolhe entre vários especialistas, o que muda o time a cada partida.',
      'Splinter weapons são venenosas — ferem alvos resistentes tão bem quanto os fracos.',
      'Muito rápidos e com boa capacidade de reposicionamento.',
      'Frágeis: cada operativo perdido dói, então o jogo é de posicionamento, não de troca de tiros.',
    ],
    papeis: [
      { nome: 'Sybarite', funcao: 'Líder, melhora a coordenação do time' },
      { nome: 'Kabalite Warrior', funcao: 'Corpo do time, splinter rifle' },
      { nome: 'Gunner', funcao: 'Blaster ou shredder para alvos difíceis' },
      { nome: 'Heavy Gunner', funcao: 'Splinter cannon de apoio' },
      { nome: 'Skysplinter Assassin', funcao: 'Mobilidade extrema e ataque de flanco' },
      { nome: 'Elixicant', funcao: 'Suporte químico, melhora ou recupera operativos' },
      { nome: 'Trueborn', funcao: 'Nascido em Commorragh, combatente superior' },
    ],
    cores: [
      'Roxo escuro ou verde-escuro na armadura',
      'Pele muito pálida',
      'Verde ácido no veneno das armas',
      'Ouro ou bronze nos ornamentos do Sybarite',
    ],
    dicasPintura: [
      'A pele pálida contra a armadura escura é a assinatura Drukhari — invista nela, é o que se vê primeiro.',
      'O verde do veneno nas lâminas e munições é pequeno mas obrigatório: sem ele o time fica sem foco.',
      'Diferencie o Sybarite e os especialistas com um detalhe de cor próprio. Em Kill Team você precisa reconhecer cada operativo na mesa de relance.',
      'Dez modelos com muito detalhe fino: é um time de várias sessões, não de uma noite.',
    ],
    baseTamanho: '25mm (28,5mm em alguns operativos)',
    baseTerreno:
      'Piso escuro de metal de Commorragh, com correntes e respingos. Base escura reforça a pele pálida.',
    esforcoPintura: 4,
  },
  {
    id: 'kt-mandrakes',
    nome: 'Mandrakes',
    faccao: 'Drukhari / Aelindrach',
    faccaoId: 'drukhari',
    operativos: '9 operativos',
    resumo:
      'Criaturas de sombra de Aelindrach, o reino de penumbra dentro de Commorragh. Não são exatamente Drukhari — são algo mais antigo e mais estranho. Atacam com chamas frias e se movem pelas sombras.',
    comoJoga: [
      'Movimento pelas sombras: reaparecem em pontos do tabuleiro difíceis de prever.',
      'Baleblast é um ataque à distância que ignora boa parte da cobertura.',
      'Bons no corpo a corpo para um time frágil.',
      'Sem armadura de verdade: dependem de nunca estarem onde o inimigo aponta.',
    ],
    papeis: [
      { nome: 'Nightfiend', funcao: 'Líder, o mais antigo e forte da matilha' },
      { nome: 'Dirgemaw', funcao: 'Grito que abala a coragem inimiga' },
      { nome: 'Shadeweaver', funcao: 'Manipula sombras, apoio e controle' },
      { nome: 'Mandrake', funcao: 'Corpo do time, baleblast e lâminas' },
    ],
    cores: [
      'Pele cinza-azulada pálida, quase morta',
      'Tatuagens pretas fluindo pelo corpo',
      'Olhos e boca brancos brilhando',
      'Chamas frias em branco-azulado ou verde',
    ],
    dicasPintura: [
      'A pele é quase todo o modelo: comece em cinza-azulado escuro e suba até quase branco nas partes altas. É praticamente um exercício de valor puro.',
      'As tatuagens pretas devem seguir a musculatura, não ser desenhadas por cima de qualquer jeito. Pinte com a peça na mão, girando.',
      'Olhos e boca brilhando em branco quase puro fazem o modelo inteiro funcionar — é o único ponto de luz.',
      'A chama fria não é fogo: use branco-azulado ou verde pálido, nunca laranja.',
      'Base bem escura para a pele pálida saltar, igual à receita de Nighthaunt.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno:
      'Base escura, quase preta, com névoa clara na borda. Menos elementos, mais sombra — eles vêm da penumbra.',
    esforcoPintura: 4,
  },
  {
    id: 'kt-kommandos',
    nome: 'Kommandos',
    faccao: 'Orks',
    faccaoId: 'orks',
    operativos: '10 operativos',
    resumo:
      'Orks furtivos — sim, isso existe. Um dos times mais queridos do jogo, com esculturas cheias de personalidade e uma mistura rara de furtividade e brutalidade.',
    comoJoga: [
      'Infiltram e aparecem no flanco.',
      'Muito bons no corpo a corpo para um time furtivo.',
      'Especialistas variados: Burna Boy, Rokkit Boy, Dakka Boy, Snipa, Bomb Squig.',
      'Resistentes o bastante para trocar golpes, o que quase nenhum time furtivo consegue.',
    ],
    papeis: [
      { nome: 'Boss Nob', funcao: 'Líder, o maior e mais bruto' },
      { nome: 'Burna Boy', funcao: 'Lança-chamas de curto alcance' },
      { nome: 'Rokkit Boy', funcao: 'Anti-blindado' },
      { nome: 'Snipa', funcao: 'Tiro de longo alcance' },
      { nome: 'Bomb Squig', funcao: 'Squig explosivo, exatamente o que parece' },
    ],
    cores: ['Pele verde', 'Panos escuros de camuflagem', 'Ferro sujo', 'Cor do clã nos detalhes'],
    dicasPintura: [
      'Camuflagem orky é borrão escuro, não padrão militar. Tentar fazer certo fica errado.',
      'Cada modelo do kit é único: aqui vale abandonar a pintura em lote e tratar como dez personagens.',
      'O Bomb Squig é a peça mais divertida do time — vermelho vivo e dentes brancos.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Mato alto, sucata e sombra.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-legionary',
    nome: 'Legionary',
    faccao: 'Chaos Space Marines',
    faccaoId: 'chaos-space-marines',
    operativos: '6 operativos',
    resumo:
      'Traidores da Longa Guerra em escaramuça. Poucos modelos, cada um duríssimo, com liberdade total de esquema de cor por legião.',
    comoJoga: [
      'Cada operativo é resistente: o time absorve muito castigo.',
      'Especialistas variados cobrem tiro pesado, corpo a corpo e suporte psíquico.',
      'Marca de deus do Caos muda o comportamento do time inteiro.',
      'Poucos corpos: perder dois operativos já compromete a missão.',
    ],
    papeis: [
      { nome: 'Aspiring Champion', funcao: 'Líder, forte no duelo' },
      { nome: 'Butcher', funcao: 'Corpo a corpo pesado' },
      { nome: 'Gunner', funcao: 'Arma especial' },
      { nome: 'Heavy Gunner', funcao: 'Arma pesada de apoio' },
      { nome: 'Balefire Acolyte', funcao: 'Psíquico' },
      { nome: 'Shrivetalon', funcao: 'Assassino furtivo' },
    ],
    cores: ['Cor da legião', 'Bronze envelhecido', 'Ferro sujo', 'Vermelho escuro no sangue seco'],
    dicasPintura: [
      'Seis modelos: o time perfeito para testar um esquema de legião antes de comprometer um exército inteiro.',
      'Bronze com verdete nas frestas envelhece instantaneamente e é rápido.',
      'Cada operativo tem um papel — dê a cada um um detalhe visual próprio para reconhecê-los na mesa.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro industrial com crânios.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-angels-of-death',
    nome: 'Angels of Death',
    faccao: 'Adeptus Astartes',
    faccaoId: 'space-marines',
    operativos: '6 operativos',
    resumo:
      'Intercessores e assaltantes em escaramuça. Poucos modelos muito resistentes, com doutrinas de capítulo que mudam o estilo de jogo.',
    comoJoga: [
      'Resistência alta por operativo: aguentam o que outros times não aguentam.',
      'Doutrinas de capítulo alteram tiro, movimento ou corpo a corpo.',
      'Time pequeno: cada baixa é 1/6 da força.',
      'Bom para quem está aprendendo — perdoa erro de posicionamento.',
    ],
    papeis: [
      { nome: 'Sergeant', funcao: 'Líder' },
      { nome: 'Gunner', funcao: 'Arma especial' },
      { nome: 'Heavy Gunner', funcao: 'Arma pesada' },
      { nome: 'Assault Intercessor', funcao: 'Corpo a corpo' },
      { nome: 'Intercessor', funcao: 'Tiro padrão' },
    ],
    cores: ['Cor do capítulo', 'Osso nas ombreiras', 'Prata nas armas', 'Vermelho nas lentes'],
    dicasPintura: [
      'Seis modelos do mesmo capítulo: ótimo para praticar a receita antes de fazer um exército.',
      'Em Kill Team a insígnia de ombreira aparece muito mais que em 40k — capriche nela.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro urbano.',
    esforcoPintura: 2,
  },
  {
    id: 'kt-pathfinders',
    nome: 'Pathfinders',
    faccao: "T'au Empire",
    faccaoId: 'tau',
    operativos: '10 operativos',
    resumo:
      'Batedores T\'au que marcam alvos para o resto da força. Time de tiro puro, que perde feio se deixar o inimigo chegar perto.',
    comoJoga: [
      'Markerlight: marcar alvos melhora muito o tiro seguinte.',
      'Boa variedade de especialistas e drones de apoio.',
      'Péssimos no corpo a corpo — evite contato a qualquer custo.',
      'Recompensa jogo posicional e paciente.',
    ],
    papeis: [
      { nome: 'Shas\'ui', funcao: 'Líder' },
      { nome: 'Marksman', funcao: 'Rail rifle de longo alcance' },
      { nome: 'Blooded', funcao: 'Veterano de combate' },
      { nome: 'Drone Controller', funcao: 'Comanda os drones do time' },
      { nome: 'Drones', funcao: 'Apoio, escudo e marcação' },
    ],
    cores: ['Bege da armadura', 'Marrom no macacão', 'Vermelho nos sensores', 'Branco nos drones'],
    dicasPintura: [
      'Placas grandes e lisas: o time ideal para aerógrafo, mesmo com poucos modelos.',
      'Linhas limpas entre a placa bege e o macacão escuro definem o visual T\'au. Precisão importa mais que técnica aqui.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Deserto claro ou piso urbano limpo.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-hierotek-circle',
    nome: 'Hierotek Circle',
    faccao: 'Necrons',
    faccaoId: 'necrons',
    operativos: '9 operativos',
    resumo:
      'Cripta-tecnólogos necrons com escaravelhos de reanimação. Os operativos voltam do túmulo, o que torna o time exaustivo de enfrentar.',
    comoJoga: [
      'Reanimação: operativos derrubados podem voltar.',
      'Boa resistência e tiro confiável.',
      'Lentos: não disputam objetivo distante.',
      'Time de desgaste — ganha no longo prazo.',
    ],
    papeis: [
      { nome: 'Technomancer', funcao: 'Líder, reanima e melhora o time' },
      { nome: 'Immortal', funcao: 'Corpo do time, tiro resistente' },
      { nome: 'Deathmark', funcao: 'Atirador de precisão' },
      { nome: 'Despotek', funcao: 'Suporte tecnológico' },
      { nome: 'Plasmacyte', funcao: 'Escaravelho de apoio' },
    ],
    cores: ['Metal escuro', 'Prata clara no realce', 'Verde de energia', 'Preto nos detalhes'],
    dicasPintura: [
      'Spray metálico, wash escuro, drybrush prata: o time mais rápido de pintar do jogo.',
      'O verde de energia é o único ponto de cor — deixe o centro quase branco para parecer luz.',
    ],
    baseTamanho: '32mm / 40mm',
    baseTerreno: 'Areia clara de tumba com placa gravada.',
    esforcoPintura: 2,
  },
  {
    id: 'kt-void-dancer-troupe',
    nome: 'Void-Dancer Troupe',
    faccao: 'Harlequins',
    operativos: '8 operativos',
    resumo:
      'Arlequins da Cegonha Negra: acrobatas letais em roupas de losangos. O time mais difícil de pintar do jogo e um dos mais bonitos.',
    comoJoga: [
      'Mobilidade absurda: atravessam o tabuleiro e chegam ao corpo a corpo no primeiro turno.',
      'Campo holográfico: difíceis de acertar em movimento.',
      'Frágeis se pegos parados.',
      'Time de alto risco e alta recompensa.',
    ],
    papeis: [
      { nome: 'Lead Player', funcao: 'Líder da trupe' },
      { nome: 'Death Jester', funcao: 'Tiro pesado e terror' },
      { nome: 'Shadowseer', funcao: 'Psíquico, ilusões' },
      { nome: 'Player', funcao: 'Acrobata de corpo a corpo' },
    ],
    cores: ['Losangos multicoloridos', 'Preto e branco nas máscaras', 'Cores vivas contrastantes'],
    dicasPintura: [
      'Os losangos são o desafio: use fita ou desenhe a lápis antes. Não tente à mão livre de primeira.',
      'Uma alternativa honesta é fazer metade do corpo lisa e só a outra metade em losangos — visualmente funciona e custa metade do tempo.',
      'Oito modelos, mas cada um vale por três em tempo de pintura. Planeje.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Base limpa e escura, para as cores saltarem.',
    esforcoPintura: 5,
  },
  {
    id: 'kt-novitiates',
    nome: 'Novitiates',
    faccao: 'Adepta Sororitas',
    faccaoId: 'adepta-sororitas',
    operativos: '12 operativos',
    resumo:
      'Noviças em provação, misturando fé, chicote e bolter. Time numeroso para os padrões de Kill Team.',
    comoJoga: [
      'Atos de fé dão recursos que melhoram ações em momentos-chave.',
      'Muitos corpos: aguenta perder alguns operativos.',
      'Mistura de tiro e corpo a corpo.',
      'Bom para quem gosta de gerenciar recursos.',
    ],
    papeis: [
      { nome: 'Superior', funcao: 'Líder' },
      { nome: 'Hospitaller', funcao: 'Cura operativos feridos' },
      { nome: 'Dialogus', funcao: 'Suporte de fé' },
      { nome: 'Penitent', funcao: 'Corpo a corpo desesperado' },
      { nome: 'Novitiate', funcao: 'Corpo do time' },
    ],
    cores: ['Preto na armadura', 'Vermelho nos panos', 'Osso nos pergaminhos', 'Pele nos rostos'],
    dicasPintura: [
      'Doze modelos com muito pano: Contrast nos panos economiza horas.',
      'Rostos descobertos em quase todas: a pele é o que dá vida ao time.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Piso de catedral com vitral quebrado.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-corsair-voidscarred',
    nome: 'Corsair Voidscarred',
    faccao: 'Aeldari',
    faccaoId: 'aeldari',
    operativos: '9 operativos',
    resumo:
      'Piratas aeldari sem craftworld nem Commorragh. Time versátil, com operativos que misturam elegância élfica com equipamento saqueado.',
    comoJoga: [
      'Composição muito flexível com especialistas variados.',
      'Rápidos e precisos, mas frágeis.',
      'Bom em tiro e em corpo a corpo, sem dominar nenhum dos dois.',
      'Recompensa quem sabe escolher a ferramenta certa para a missão.',
    ],
    papeis: [
      { nome: 'Felarch', funcao: 'Líder' },
      { nome: 'Gunner', funcao: 'Arma especial saqueada' },
      { nome: 'Kurnathi', funcao: 'Corpo a corpo' },
      { nome: 'Way Seeker', funcao: 'Psíquico' },
      { nome: 'Starstorm Duellist', funcao: 'Pistoleiro' },
    ],
    cores: ['Cores vivas contrastantes', 'Couro saqueado', 'Osso nos capacetes', 'Gemas coloridas'],
    dicasPintura: [
      'Piratas: cada operativo pode ter uma paleta própria, ao contrário de um craftworld uniforme.',
      'As gemas são a assinatura aeldari — escuro embaixo, claro em cima, ponto de branco.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Piso de nave saqueada.',
    esforcoPintura: 4,
  },
  {
    id: 'kt-warpcoven',
    nome: 'Warpcoven',
    faccao: 'Thousand Sons',
    faccaoId: 'thousand-sons',
    operativos: '9 operativos',
    resumo:
      'Feiticeiros de Tzeentch com Rubric Marines e Tzaangors. Time psíquico pesado, que joga de um jeito diferente de todo o resto.',
    comoJoga: [
      'Três feiticeiros com disciplinas psíquicas distintas.',
      'Rubric Marines são muito resistentes a tiro leve.',
      'Lentos: o time não disputa corrida por objetivo.',
      'Estratégia baseada em poderes, não em tiro bruto.',
    ],
    papeis: [
      { nome: 'Sorcerer', funcao: 'Líder psíquico' },
      { nome: 'Rubric Marine', funcao: 'Corpo resistente do time' },
      { nome: 'Tzaangor', funcao: 'Corpo a corpo barato' },
      { nome: 'Gunner', funcao: 'Warpflamer ou soulreaper' },
    ],
    cores: ['Azul turquesa', 'Ouro no trim', 'Vermelho nos panos', 'Azul claro no fogo psíquico'],
    dicasPintura: [
      'O trim dourado fino é o que define os Thousand Sons e o que mais consome tempo — apoie a mão.',
      'Nove modelos com esse nível de detalhe: é um time de projeto, não de fim de semana.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Areia vermelha de Prospero com fragmento de coluna dourada.',
    esforcoPintura: 5,
  },
  {
    id: 'kt-nemesis-claw',
    nome: 'Nemesis Claw',
    faccao: 'Night Lords',
    faccaoId: 'chaos-space-marines',
    operativos: '6 operativos',
    resumo:
      'Night Lords especializados em terror. Mesma resistência dos Legionaries, com foco em quebrar a moral do inimigo.',
    comoJoga: [
      'Causam terror: reduzem a capacidade do inimigo de agir.',
      'Muito bons em emboscada e corpo a corpo.',
      'Poucos operativos, muito resistentes.',
      'Estilo de jogo psicológico, atacando quem está isolado.',
    ],
    papeis: [
      { nome: 'Visionary', funcao: 'Líder' },
      { nome: 'Skinthief', funcao: 'Corpo a corpo brutal' },
      { nome: 'Ghorisvex', funcao: 'Especialista pesado' },
      { nome: 'Nightmare', funcao: 'Corpo do time' },
    ],
    cores: ['Azul-escuro quase preto', 'Bronze', 'Osso nos crânios', 'Vermelho nas lentes'],
    dicasPintura: [
      'O azul Night Lords com relâmpagos é o esquema mais reconhecível do Caos — e os relâmpagos assustam menos do que parecem: comece com azul claro e vá afinando.',
      'Seis modelos: o time perfeito para finalmente tentar aquele padrão de relâmpago.',
    ],
    baseTamanho: '32mm',
    baseTerreno: 'Escombro escuro com corpos.',
    esforcoPintura: 4,
  },
  {
    id: 'kt-blooded',
    nome: 'Blooded',
    faccao: 'Traitor Guard',
    operativos: '10 operativos',
    resumo:
      'Guarda Imperial traidora, servindo ao Caos. Baratos, numerosos e descartáveis — o oposto dos times de elite.',
    comoJoga: [
      'Muitos corpos: perder operativos faz parte do plano.',
      'Especialistas variados, incluindo um comissário corrompido.',
      'Fracos individualmente.',
      'Bom para quem gosta de jogar com números em vez de qualidade.',
    ],
    papeis: [
      { nome: 'Chieftain', funcao: 'Líder' },
      { nome: 'Butcher', funcao: 'Corpo a corpo' },
      { nome: 'Gunner', funcao: 'Arma especial' },
      { nome: 'Ogryn', funcao: 'Bruto pesado' },
      { nome: 'Trooper', funcao: 'Corpo do time' },
    ],
    cores: ['Uniforme militar sujo', 'Vermelho e preto do Caos', 'Ferro enferrujado', 'Pele'],
    dicasPintura: [
      'Uniformes sujos perdoam tudo: é um dos times mais rápidos de pintar bem.',
      'Marcas do Caos pintadas à mão nos capacetes contam a história melhor que qualquer detalhe fino.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Trincheira lamacenta com arame.',
    esforcoPintura: 2,
  },
  {
    id: 'kt-hearthkyn-salvager',
    nome: 'Hearthkyn Salvager',
    faccao: 'Leagues of Votann',
    faccaoId: 'leagues-of-votann',
    operativos: '10 operativos',
    resumo:
      'Anões espaciais recolhendo o que sobrou. Resistentes, metódicos e com muito equipamento tecnológico.',
    comoJoga: [
      'Resistência alta para o custo.',
      'Judgement tokens deixam o time melhor contra alvos marcados.',
      'Boa variedade de armas especiais.',
      'Lentos, mas difíceis de remover de um objetivo.',
    ],
    papeis: [
      { nome: 'Theyn', funcao: 'Líder' },
      { nome: 'Warrior', funcao: 'Corpo do time' },
      { nome: 'Jump-pack Warrior', funcao: 'Mobilidade' },
      { nome: 'Lokâtr', funcao: 'Batedor' },
      { nome: 'E-COG', funcao: 'Robô de apoio' },
    ],
    cores: ['Macacão azul', 'Ouro nas placas', 'Aço', 'Barbas variadas'],
    dicasPintura: [
      'Capacetes cobrem a maioria dos rostos: menos trabalho de pele do que parece.',
      'Varie a cor das poucas barbas visíveis — é o que dá personalidade ao grupo.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Chapa metálica com minério exposto.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-farstalker-kinband',
    nome: 'Farstalker Kinband',
    faccao: 'Kroot',
    faccaoId: 'tau',
    operativos: '12 operativos',
    resumo:
      'Mercenários kroot com cães e um pássaro. Time numeroso, orgânico e cheio de personalidade — e um dos mais divertidos de pintar.',
    comoJoga: [
      'Muitos operativos com papéis bem distintos.',
      'Bons em emboscada e em terreno difícil.',
      'Frágeis individualmente.',
      'Kroot hound e Krootox dão variedade tática.',
    ],
    papeis: [
      { nome: 'Kill-broker', funcao: 'Líder' },
      { nome: 'Cut-skin', funcao: 'Corpo a corpo' },
      { nome: 'Long-sight', funcao: 'Tiro de precisão' },
      { nome: 'Kroot Hound', funcao: 'Cão rastreador, rápido' },
      { nome: 'Pech\'ra', funcao: 'Pássaro batedor' },
    ],
    cores: ['Pele esverdeada ou acinzentada', 'Couro', 'Penas coloridas', 'Ossos e troféus'],
    dicasPintura: [
      'As penas são a chance de cor viva num time todo terroso — não desperdice.',
      'Doze modelos orgânicos: Contrast na pele resolve a maior parte do trabalho.',
      'O Pech\'ra é minúsculo e adorável; vale tratá-lo como uma peça só sua.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Selva ou terreno agreste com folhagem.',
    esforcoPintura: 3,
  },
  {
    id: 'kt-wyrmblade',
    nome: 'Wyrmblade',
    faccao: 'Genestealer Cults',
    faccaoId: 'genestealer-cults',
    operativos: '12 operativos',
    resumo:
      'Célula infiltrada do culto. Mistura civis disfarçados com híbridos abertamente alienígenas.',
    comoJoga: [
      'Infiltração e emboscada como marca do time.',
      'Muitos operativos com papéis distintos.',
      'Frágeis, mas numerosos e imprevisíveis.',
      'Bom para quem gosta de esconder informação do oponente.',
    ],
    papeis: [
      { nome: 'Kelermorph', funcao: 'Pistoleiro lendário do culto' },
      { nome: 'Locus', funcao: 'Corpo a corpo de elite' },
      { nome: 'Sanctus', funcao: 'Atirador ou assassino' },
      { nome: 'Neophyte', funcao: 'Corpo do time' },
      { nome: 'Acolyte', funcao: 'Corpo a corpo com garras' },
    ],
    cores: ['Macacão de mineiro', 'Pele híbrida arroxeada', 'Amarelo nos capacetes', 'Metal sujo'],
    dicasPintura: [
      'O contraste entre roupa civil comum e pele alienígena é o tema do time inteiro.',
      'Poeira clara nas botas vende a história de quem trabalha na mina.',
    ],
    baseTamanho: '28,5mm',
    baseTerreno: 'Túnel de mina com cascalho e trilho.',
    esforcoPintura: 3,
  },
]

export const KILL_TEAMS_POR_ID = new Map(KILL_TEAMS.map((k) => [k.id, k]))
