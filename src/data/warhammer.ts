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
}

/* ================================================================== */
/* FACÇÕES                                                             */
/* ================================================================== */

export const FACCOES: Faccao[] = [
  /* --- 40k / Imperium ------------------------------------------- */
  {
    id: 'ultramarines',
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
    faccaoId: 'ultramarines',
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
    faccaoId: 'ultramarines',
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
    faccaoId: 'ultramarines',
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
    faccaoId: 'ultramarines',
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
]

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
