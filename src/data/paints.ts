/**
 * Catálogo semente de tintas.
 *
 * IMPORTANTE — leia antes de confiar cegamente:
 * os valores hex são *aproximações* da cor da tinta seca sobre base cinza,
 * boas o suficiente para achar equivalência entre marcas e para visualizar
 * esquemas na tela, mas nenhuma tela reproduz pigmento. Sempre confirme no
 * pote antes de comprar. Todo item deste catálogo pode ser corrigido,
 * duplicado ou apagado dentro do app (Estoque → editar), e as suas edições
 * ficam salvas no iPad, não neste arquivo.
 */

export type Marca =
  | 'Vallejo'
  | 'Citadel'
  | 'Army Painter'
  | 'Scale75'
  | 'AK'
  | 'P3'
  | 'Kimera'
  | 'Outra'

export type TipoTinta =
  | 'acrilica'
  | 'metalica'
  | 'wash'
  | 'contrast'
  | 'dry'
  | 'tecnica'
  | 'primer'
  | 'verniz'
  | 'medium'
  | 'tinta-ink'

export const TIPO_LABEL: Record<TipoTinta, string> = {
  acrilica: 'Acrílica',
  metalica: 'Metálica',
  wash: 'Wash / Shade',
  contrast: 'Contrast / Speedpaint',
  dry: 'Drybrush',
  tecnica: 'Técnica',
  primer: 'Primer',
  verniz: 'Verniz',
  medium: 'Medium',
  'tinta-ink': 'Tinta / Ink',
}

export type CatalogoTinta = {
  id: string
  marca: Marca
  linha: string
  codigo: string
  nome: string
  hex: string
  tipo: TipoTinta
}

const V = (codigo: string, nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `vmc-${codigo}`,
  marca: 'Vallejo',
  linha: 'Model Color',
  codigo: `70.${codigo}`,
  nome,
  hex,
  tipo,
})

const G = (codigo: string, nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `vgc-${codigo}`,
  marca: 'Vallejo',
  linha: 'Game Color',
  codigo: `72.${codigo}`,
  nome,
  hex,
  tipo,
})

const A = (codigo: string, nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `vma-${codigo}`,
  marca: 'Vallejo',
  linha: 'Model Air',
  codigo: `71.${codigo}`,
  nome,
  hex,
  tipo,
})

const C = (linha: string, nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `cit-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  marca: 'Citadel',
  linha,
  codigo: '',
  nome,
  hex,
  tipo,
})

const AP = (nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `ap-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  marca: 'Army Painter',
  linha: 'Warpaints',
  codigo: '',
  nome,
  hex,
  tipo,
})

const S = (nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `s75-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  marca: 'Scale75',
  linha: 'Scalecolor',
  codigo: '',
  nome,
  hex,
  tipo,
})

const K = (nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `ak-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  marca: 'AK',
  linha: '3rd Generation',
  codigo: '',
  nome,
  hex,
  tipo,
})

const P = (nome: string, hex: string, tipo: TipoTinta = 'acrilica'): CatalogoTinta => ({
  id: `p3-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  marca: 'P3',
  linha: 'Formula P3',
  codigo: '',
  nome,
  hex,
  tipo,
})

/* ================================================================== */
/* VALLEJO — MODEL COLOR                                               */
/* ================================================================== */

const VALLEJO_MODEL_COLOR: CatalogoTinta[] = [
  // Brancos, ossos e areias
  V('951', 'White', '#f4f4f2'),
  V('918', 'Ivory', '#ece2cb'),
  V('820', 'Off-White', '#e6dfd0'),
  V('917', 'Beige', '#cbb287'),
  V('819', 'Iraqi Sand', '#cbb996'),
  V('837', 'Pale Sand', '#ddcba6'),
  V('976', 'Buff', '#c9a875'),
  V('847', 'Dark Sand', '#c1a878'),
  V('821', 'German Camo Beige', '#a8926c'),
  V('988', 'Khaki', '#8b8163'),
  V('884', 'Stone Grey', '#9d9a86'),
  V('986', 'Deck Tan', '#d6c9a6'),

  // Amarelos e laranjas
  V('952', 'Lemon Yellow', '#f2d63c'),
  V('953', 'Flat Yellow', '#f0c419'),
  V('948', 'Golden Yellow', '#e8a317'),
  V('915', 'Deep Yellow', '#e6b422'),
  V('912', 'Tan Yellow', '#d9b06a'),
  V('914', 'Green Ochre', '#a98a45'),
  V('913', 'Yellow Ochre', '#c48f31'),
  V('911', 'Vermillion', '#dd5b26'),
  V('805', 'Burnt Cad. Red', '#a03018'),
  V('981', 'Orange Brown', '#a5552a'),

  // Vermelhos e rosas
  V('909', 'Vermillion', '#c33d20'),
  V('957', 'Flat Red', '#b32b25'),
  V('926', 'Red', '#a51f22'),
  V('946', 'Dark Red', '#83201f'),
  V('908', 'Carmine Red', '#93202f'),
  V('944', 'Old Rose', '#a8515c'),
  V('958', 'Red Violet', '#7d2a44'),
  V('945', 'Magenta', '#9c2456'),
  V('804', 'Beige Red', '#b6795e'),
  V('803', 'Brown Rose', '#a1665a'),

  // Peles
  V('955', 'Flat Flesh', '#d8a583'),
  V('815', 'Basic Skintone', '#d6a077'),
  V('845', 'Sunny Skintone', '#e0b28e'),
  V('928', 'Light Flesh', '#e5bb9a'),
  V('927', 'Dark Flesh', '#a86a53'),
  V('860', 'Medium Fleshtone', '#c78e6c'),

  // Verdes
  V('942', 'Light Green', '#4f8f4a'),
  V('968', 'Flat Green', '#3d6b3c'),
  V('970', 'Deep Green', '#2c4a30'),
  V('980', 'Black Green', '#22322a'),
  V('979', 'German Camo Dark Green', '#3f4a33'),
  V('891', 'Intermediate Green', '#4e6b4a'),
  V('971', 'Green Grey', '#5c6b52'),
  V('922', 'Uniform Green', '#3f5240'),
  V('894', 'Camouflage Olive Green', '#5b6337'),
  V('850', 'Medium Olive', '#5f6b3c'),
  V('924', 'Russian Uniform', '#6b6c4c'),
  V('969', 'Park Green Flat', '#3a6b4e'),
  V('887', 'Brown Violet', '#6a6350'),

  // Azuis e ciano
  V('925', 'Blue', '#22417d'),
  V('930', 'Dark Blue', '#1b2f5c'),
  V('963', 'Medium Blue', '#31569b'),
  V('961', 'Sky Blue', '#5a86bd'),
  V('906', 'Pale Blue', '#8fb0cf'),
  V('907', 'Pale Grey Blue', '#a9bcc9'),
  V('965', 'Prussian Blue', '#1d3a56'),
  V('899', 'Dark Prussian Blue', '#1a2c42'),
  V('898', 'Dark Sea Blue', '#2b4356'),
  V('900', 'French Mirage Blue', '#5d7f9c'),
  V('964', 'Field Blue', '#455e6b'),
  V('904', 'Dark Blue Grey', '#4a5a68'),
  V('936', 'Transparent Green', '#2a7f6b'),

  // Roxos
  V('960', 'Violet', '#5a3a72'),
  V('810', 'Refractive Green', '#3f5a4a'),
  V('959', 'Purple', '#6a3560'),

  // Marrons
  V('871', 'Leather Brown', '#7a5231'),
  V('872', 'Chocolate Brown', '#4a2c22'),
  V('846', 'Mahogany Brown', '#6b3a2c'),
  V('940', 'Saddle Brown', '#6a4023'),
  V('941', 'Burnt Umber', '#5a3a2a'),
  V('984', 'Flat Brown', '#6b4632'),
  V('985', 'Hull Red', '#5e3630'),
  V('983', 'Flat Earth', '#7a5a3e'),
  V('874', 'Tan Earth', '#8a6544'),
  V('875', 'Beige Brown', '#7c604a'),
  V('873', 'US Field Drab', '#6e5c42'),
  V('822', 'German Camo Black Brown', '#3a322c'),
  V('843', 'Cork Brown', '#9a7a58'),

  // Cinzas e pretos
  V('950', 'Black', '#1a1a1a'),
  V('995', 'German Grey', '#33383c'),
  V('994', 'Dark Grey', '#4c5257'),
  V('992', 'Neutral Grey', '#6e757a'),
  V('990', 'Light Grey', '#9aa1a6'),
  V('989', 'Sky Grey', '#b6bbbc'),
  V('870', 'Medium Sea Grey', '#7d878c'),
  V('869', 'Basalt Grey', '#4f5559'),
  V('868', 'Dark Grey Blue', '#42505a'),

  // Metálicos
  V('997', 'Silver', '#b9bcc0', 'metalica'),
  V('996', 'Gold', '#c2a04a', 'metalica'),
  V('998', 'Bright Bronze', '#a87545', 'metalica'),
  V('999', 'Copper', '#9c5e3a', 'metalica'),
  V('863', 'Gunmetal Grey', '#565b60', 'metalica'),
  V('864', 'Natural Steel', '#8d9296', 'metalica'),
  V('865', 'Oily Steel', '#5d6266', 'metalica'),
  V('866', 'Grey Metal', '#7b8083', 'metalica'),
]

/* ================================================================== */
/* VALLEJO — GAME COLOR                                                */
/* ================================================================== */

const VALLEJO_GAME_COLOR: CatalogoTinta[] = [
  G('001', 'Dead White', '#f6f6f4'),
  G('002', 'Pale Yellow', '#f0d95c'),
  G('003', 'Gold Yellow', '#eeb31c'),
  G('004', 'Bald Moon Yellow', '#f2c62a'),
  G('005', 'Moon Yellow', '#f0bb1e'),
  G('006', 'Sun Yellow', '#f2a71c'),
  G('007', 'Gory Red', '#a01d22'),
  G('008', 'Bloody Red', '#c02024'),
  G('009', 'Hot Orange', '#e2601f'),
  G('010', 'Bloody Red', '#b71f24'),
  G('011', 'Gory Red', '#8f1b22'),
  G('012', 'Scarlett Red', '#a52028'),
  G('013', 'Squid Pink', '#a83e5c'),
  G('014', 'Warlord Purple', '#6a3566'),
  G('015', 'Hexed Lichen', '#4a2c50'),
  G('016', 'Royal Purple', '#4c2a6b'),
  G('017', 'Imperial Blue', '#1d3466'),
  G('018', 'Stormy Blue', '#33526b'),
  G('019', 'Night Blue', '#1b2740'),
  G('020', 'Imperial Blue', '#22407c'),
  G('021', 'Magic Blue', '#2a5fa8'),
  G('022', 'Ultramarine Blue', '#20509b'),
  G('023', 'Electric Blue', '#3f86c4'),
  G('024', 'Turquoise', '#1f7f86'),
  G('025', 'Foul Green', '#2f9a5a'),
  G('026', 'Jade Green', '#3f8f6c'),
  G('027', 'Scurvy Green', '#6a9b3a'),
  G('028', 'Dark Green', '#2d4a32'),
  G('029', 'Sick Green', '#7fa03f'),
  G('030', 'Goblin Green', '#4b8a3f'),
  G('031', 'Camouflage Green', '#5b6b40'),
  G('032', 'Scorpy Green', '#8fbf3f'),
  G('033', 'Livery Green', '#8fa055'),
  G('034', 'Bone White', '#d9cba6'),
  G('035', 'Dead Flesh', '#b7bd93'),
  G('036', 'Filthy Brown', '#9a7440'),
  G('037', 'Plague Brown', '#b08a3c'),
  G('038', 'Scrofulous Brown', '#c09a3f'),
  G('039', 'Plague Brown', '#a5813a'),
  G('040', 'Leather Brown', '#7a5231'),
  G('041', 'Beasty Brown', '#6a4530'),
  G('043', 'Beasty Brown', '#5c3a28'),
  G('045', 'Charred Brown', '#3f2a24'),
  G('046', 'Cold Grey', '#5a656b'),
  G('047', 'Wolf Grey', '#7b8a96'),
  G('048', 'Sombre Grey', '#5f6468'),
  G('049', 'Stonewall Grey', '#8d9498'),
  G('050', 'Neutral Grey', '#6e757a'),
  G('051', 'Black', '#191919'),
  G('052', 'Silver', '#b9bcc0', 'metalica'),
  G('053', 'Chainmail Silver', '#8e9498', 'metalica'),
  G('054', 'Gunmetal', '#5b6165', 'metalica'),
  G('055', 'Polished Gold', '#c9a94b', 'metalica'),
  G('056', 'Glorious Gold', '#b8913c', 'metalica'),
  G('057', 'Bright Bronze', '#a87545', 'metalica'),
  G('058', 'Brassy Brass', '#a98a3e', 'metalica'),
  G('059', 'Hammered Copper', '#96593a', 'metalica'),
  G('061', 'Khaki', '#8b8163'),
  G('086', 'Verdigris', '#5a9a8a'),
  G('091', 'Elfic Flesh', '#ddb694'),
  G('093', 'Dwarf Skin', '#c48a63'),
  G('095', 'Pale Flesh', '#e3bd9c'),
  G('101', 'Off White', '#e6dfd0'),
  G('102', 'Steel Grey', '#66727a'),
  G('103', 'Ghost Grey', '#b3bcc0'),
  G('104', 'Bright Orange', '#e46a1e'),
  G('106', 'Deep Red', '#7a1a22'),
  G('107', 'Anthea Skin', '#8c6a4e'),
  G('108', 'Carnal Pink', '#c07a86'),
  G('109', 'Squid Pink', '#a8465f'),
  G('110', 'Sunset Red', '#8a2b3a'),
  G('111', 'Nocturnal Red', '#5e2030'),
  G('112', 'Evil Violet', '#4f2f66'),
  G('113', 'Nightmare Black', '#232529'),
  G('115', 'Escorpena Green', '#2b6b52'),
]

/* ================================================================== */
/* VALLEJO — MODEL AIR (aerógrafo, útil para basecoat de exército)      */
/* ================================================================== */

const VALLEJO_MODEL_AIR: CatalogoTinta[] = [
  A('001', 'White', '#f5f5f3'),
  A('057', 'Black', '#1b1b1b'),
  A('044', 'Light Grey', '#a3a9ac'),
  A('050', 'Light Sea Grey', '#8f989d'),
  A('009', 'Orange', '#e0701f'),
  A('002', 'Yellow', '#efc020'),
  A('003', 'Red', '#b02428'),
  A('004', 'Blue', '#24487f'),
  A('008', 'Light Green', '#4f8a4c'),
  A('093', 'Steel', '#8b9095', 'metalica'),
  A('063', 'Gold', '#c0a04c', 'metalica'),
  A('062', 'Aluminium', '#b6babd', 'metalica'),
]

/* ================================================================== */
/* CITADEL                                                             */
/* ================================================================== */

const CITADEL: CatalogoTinta[] = [
  // Base
  C('Base', 'Abaddon Black', '#231f20'),
  C('Base', 'Corax White', '#eeeeee'),
  C('Base', 'Grey Seer', '#c3c7c9'),
  C('Base', 'Wraithbone', '#d6cdb0'),
  C('Base', 'Averland Sunset', '#e0a81c'),
  C('Base', 'Balthasar Gold', '#a4762f', 'metalica'),
  C('Base', 'Barak-Nar Burgundy', '#4c2a34'),
  C('Base', 'Bugman\'s Glow', '#834f44'),
  C('Base', 'Caledor Sky', '#3a6b9e'),
  C('Base', 'Caliban Green', '#003d18'),
  C('Base', 'Castellan Green', '#364b24'),
  C('Base', 'Catachan Flesh', '#56503f'),
  C('Base', 'Celestra Grey', '#96a9a8'),
  C('Base', 'Corvus Black', '#17191b'),
  C('Base', 'Daemonette Hide', '#756d7e'),
  C('Base', 'Death Guard Green', '#6b7c59'),
  C('Base', 'Deathworld Forest', '#66703a'),
  C('Base', 'Dryad Bark', '#413b37'),
  C('Base', 'Incubi Darkness', '#133a3f'),
  C('Base', 'Ionrach Skin', '#c9ad8a'),
  C('Base', 'Jokaero Orange', '#e1591c'),
  C('Base', 'Kantor Blue', '#0f2b5b'),
  C('Base', 'Khorne Red', '#6c0f10'),
  C('Base', 'Leadbelcher', '#888c8f', 'metalica'),
  C('Base', 'Macragge Blue', '#16548c'),
  C('Base', 'Mechanicus Standard Grey', '#4a4e51'),
  C('Base', 'Mephiston Red', '#9a1115'),
  C('Base', 'Mournfang Brown', '#703a20'),
  C('Base', 'Naggaroth Night', '#4b3d5e'),
  C('Base', 'Rakarth Flesh', '#a9a395'),
  C('Base', 'Retributor Armour', '#c8a54b', 'metalica'),
  C('Base', 'Rhinox Hide', '#493033'),
  C('Base', 'Screamer Pink', '#7d2b4d'),
  C('Base', 'Steel Legion Drab', '#604f33'),
  C('Base', 'Stegadon Scale Green', '#12475a'),
  C('Base', 'The Fang', '#55707f'),
  C('Base', 'Thousand Sons Blue', '#0f6b7a'),
  C('Base', 'Warplock Bronze', '#6b4e3c', 'metalica'),
  C('Base', 'XV-88', '#7a5a2a'),
  C('Base', 'Zandri Dust', '#b0a160'),
  C('Base', 'Lupercal Green', '#10373a'),
  C('Base', 'Gal Vorbak Red', '#4a2130'),

  // Layer
  C('Layer', 'Administratum Grey', '#a0a5a3'),
  C('Layer', 'Ahriman Blue', '#1f8296'),
  C('Layer', 'Altdorf Guard Blue', '#275ca8'),
  C('Layer', 'Baneblade Brown', '#b08e5c'),
  C('Layer', 'Bestigor Flesh', '#b27152'),
  C('Layer', 'Blue Horror', '#a0b9cb'),
  C('Layer', 'Cadian Fleshtone', '#c87b5c'),
  C('Layer', 'Calgar Blue', '#4a76b5'),
  C('Layer', 'Dawnstone', '#6b6e6d'),
  C('Layer', 'Deathclaw Brown', '#c0714a'),
  C('Layer', 'Dorn Yellow', '#f2df8a'),
  C('Layer', 'Doombull Brown', '#6b2a25'),
  C('Layer', 'Emperor\'s Children', '#c0398e'),
  C('Layer', 'Eshin Grey', '#55585b'),
  C('Layer', 'Evil Sunz Scarlet', '#c51f1b'),
  C('Layer', 'Fenrisian Grey', '#7da4c7'),
  C('Layer', 'Fire Dragon Bright', '#ee8b4b'),
  C('Layer', 'Flash Gitz Yellow', '#fde725'),
  C('Layer', 'Fulgrim Pink', '#e48da1'),
  C('Layer', 'Gauss Blaster Green', '#8cc6a3'),
  C('Layer', 'Genestealer Purple', '#7e5fa5'),
  C('Layer', 'Gorthor Brown', '#6b5344'),
  C('Layer', 'Hoeth Blue', '#5d8fc0'),
  C('Layer', 'Kabalite Green', '#00785f'),
  C('Layer', 'Kislev Flesh', '#d9a57f'),
  C('Layer', 'Krieg Khaki', '#c0b584'),
  C('Layer', 'Loren Forest', '#5b7245'),
  C('Layer', 'Lothern Blue', '#4fa9d8'),
  C('Layer', 'Moot Green', '#63c34e'),
  C('Layer', 'Nurgling Green', '#97a46b'),
  C('Layer', 'Pallid Wych Flesh', '#ddd9c3'),
  C('Layer', 'Pink Horror', '#8e3c6c'),
  C('Layer', 'Russ Grey', '#4c7391'),
  C('Layer', 'Screaming Skull', '#d6d2a6'),
  C('Layer', 'Skarsnik Green', '#5fa271'),
  C('Layer', 'Skrag Brown', '#8a4a22'),
  C('Layer', 'Sotek Green', '#12727f'),
  C('Layer', 'Squig Orange', '#c0503e'),
  C('Layer', 'Straken Green', '#6e8a3b'),
  C('Layer', 'Sybarite Green', '#2fa97d'),
  C('Layer', 'Teclis Blue', '#3775c0'),
  C('Layer', 'Temple Guard Blue', '#45b0a0'),
  C('Layer', 'Thunderhawk Blue', '#4a6d75'),
  C('Layer', 'Troll Slayer Orange', '#f0803c'),
  C('Layer', 'Tuskgor Fur', '#7e3b34'),
  C('Layer', 'Ulthuan Grey', '#d5e2de'),
  C('Layer', 'Ushabti Bone', '#c6be8e'),
  C('Layer', 'Warboss Green', '#4a9648'),
  C('Layer', 'Warpstone Glow', '#1f8a3b'),
  C('Layer', 'White Scar', '#fafafa'),
  C('Layer', 'Wild Rider Red', '#e7392a'),
  C('Layer', 'Xereus Purple', '#4a2078'),
  C('Layer', 'Yriel Yellow', '#ffd213'),
  C('Layer', 'Karak Stone', '#c4a46b'),
  C('Layer', 'Zamesi Desert', '#c99a34'),
  C('Layer', 'Balor Brown', '#9c7a2e'),
  C('Layer', 'Runefang Steel', '#c3c8cb', 'metalica'),
  C('Layer', 'Ironbreaker', '#a3a8ab', 'metalica'),
  C('Layer', 'Stormhost Silver', '#d3d8da', 'metalica'),
  C('Layer', 'Auric Armour Gold', '#d3b055', 'metalica'),
  C('Layer', 'Liberator Gold', '#c9a959', 'metalica'),
  C('Layer', 'Hashut Copper', '#a5673a', 'metalica'),
  C('Layer', 'Sycorax Bronze', '#b08a4e', 'metalica'),
  C('Layer', 'Skullcrusher Brass', '#b08a3c', 'metalica'),

  // Shade
  C('Shade', 'Nuln Oil', '#14171a', 'wash'),
  C('Shade', 'Agrax Earthshade', '#4a3b2a', 'wash'),
  C('Shade', 'Reikland Fleshshade', '#8a4a34', 'wash'),
  C('Shade', 'Seraphim Sepia', '#a87a3c', 'wash'),
  C('Shade', 'Drakenhof Nightshade', '#26456b', 'wash'),
  C('Shade', 'Biel-Tan Green', '#1f5b3c', 'wash'),
  C('Shade', 'Carroburg Crimson', '#7a1f2e', 'wash'),
  C('Shade', 'Coelia Greenshade', '#16554f', 'wash'),
  C('Shade', 'Casandora Yellow', '#c4a02c', 'wash'),
  C('Shade', 'Athonian Camoshade', '#4f5b2e', 'wash'),
  C('Shade', 'Druchii Violet', '#47285c', 'wash'),
  C('Shade', 'Fuegan Orange', '#8a3b15', 'wash'),

  // Contrast
  C('Contrast', 'Black Templar', '#1b1d1f', 'contrast'),
  C('Contrast', 'Blood Angels Red', '#9c1017', 'contrast'),
  C('Contrast', 'Ultramarines Blue', '#1e4a8a', 'contrast'),
  C('Contrast', 'Talassar Blue', '#1c6fa8', 'contrast'),
  C('Contrast', 'Leviadon Blue', '#22405f', 'contrast'),
  C('Contrast', 'Akhelian Green', '#12756b', 'contrast'),
  C('Contrast', 'Terradon Turquoise', '#1a8a8a', 'contrast'),
  C('Contrast', 'Warp Lightning', '#4a9a3a', 'contrast'),
  C('Contrast', 'Militarum Green', '#5c6b33', 'contrast'),
  C('Contrast', 'Creed Camo', '#7a8a3c', 'contrast'),
  C('Contrast', 'Ork Flesh', '#3f8a45', 'contrast'),
  C('Contrast', 'Plaguebearer Flesh', '#8a9a4a', 'contrast'),
  C('Contrast', 'Iyanden Yellow', '#e0a51c', 'contrast'),
  C('Contrast', 'Nazdreg Yellow', '#c98a1c', 'contrast'),
  C('Contrast', 'Gryph-Hound Orange', '#c65a22', 'contrast'),
  C('Contrast', 'Snakebite Leather', '#8a5a2a', 'contrast'),
  C('Contrast', 'Wyldwood', '#3f2c22', 'contrast'),
  C('Contrast', 'Cygor Brown', '#5a3f2a', 'contrast'),
  C('Contrast', 'Gore-Grunta Fur', '#8a4a2a', 'contrast'),
  C('Contrast', 'Aggaros Dunes', '#a8894a', 'contrast'),
  C('Contrast', 'Skeleton Horde', '#b8a874', 'contrast'),
  C('Contrast', 'Apothecary White', '#d5d5cc', 'contrast'),
  C('Contrast', 'Basilicanum Grey', '#3f4348', 'contrast'),
  C('Contrast', 'Space Wolves Grey', '#5a7a94', 'contrast'),
  C('Contrast', 'Guilliman Flesh', '#c08a6a', 'contrast'),
  C('Contrast', 'Darkoath Flesh', '#b07a5a', 'contrast'),
  C('Contrast', 'Fyreslayer Flesh', '#a85a3a', 'contrast'),
  C('Contrast', 'Volupus Pink', '#a02a5a', 'contrast'),
  C('Contrast', 'Magos Purple', '#5a2a5c', 'contrast'),
  C('Contrast', 'Shyish Purple', '#4a2a6b', 'contrast'),

  // Dry / técnicas
  C('Dry', 'Longbeard Grey', '#9aa3a6', 'dry'),
  C('Dry', 'Necron Compound', '#c8ccce', 'dry'),
  C('Dry', 'Terminatus Stone', '#c2bb92', 'dry'),
  C('Dry', 'Tyrant Skull', '#cfc7a6', 'dry'),
  C('Técnica', 'Typhus Corrosion', '#3a352c', 'tecnica'),
  C('Técnica', 'Ryza Rust', '#c96a1e', 'tecnica'),
  C('Técnica', 'Nihilakh Oxide', '#7fb8ac', 'tecnica'),
  C('Técnica', 'Blood for the Blood God', '#7a0c10', 'tecnica'),
  C('Técnica', 'Astrogranite', '#6b6b66', 'tecnica'),
  C('Técnica', 'Agrellan Earth', '#8a7a5c', 'tecnica'),
  C('Técnica', 'Valhallan Blizzard', '#e8eaea', 'tecnica'),
  C('Técnica', 'Stirland Mud', '#4a3a28', 'tecnica'),
]

/* ================================================================== */
/* ARMY PAINTER                                                        */
/* ================================================================== */

const ARMY_PAINTER: CatalogoTinta[] = [
  AP('Matt Black', '#1c1c1c'),
  AP('Matt White', '#f5f5f3'),
  AP('Pure Red', '#c0201f'),
  AP('Dragon Red', '#a5171c'),
  AP('Mars Red', '#8f1f1c'),
  AP('Chaotic Red', '#6b1418'),
  AP('Lava Orange', '#e06a1c'),
  AP('Daemonic Yellow', '#f0bb1c'),
  AP('Desert Yellow', '#c8a355'),
  AP('Skeleton Bone', '#cec19a'),
  AP('Necrotic Flesh', '#b6bd9a'),
  AP('Greenskin', '#5a8f4a'),
  AP('Goblin Green', '#4a8a3f'),
  AP('Angel Green', '#2a5c38'),
  AP('Army Green', '#5c6b3c'),
  AP('Elven Flesh', '#dcb392'),
  AP('Barbarian Flesh', '#c9906a'),
  AP('Tanned Flesh', '#a86c4a'),
  AP('Ultramarine Blue', '#1f4c96'),
  AP('Crystal Blue', '#3f7fc0'),
  AP('Deep Blue', '#1b2f5e'),
  AP('Electric Blue', '#3f9ad4'),
  AP('Alien Purple', '#5c3570'),
  AP('Oozing Purple', '#452a58'),
  AP('Leather Brown', '#7a5433'),
  AP('Monster Brown', '#8a6a44'),
  AP('Fur Brown', '#5c4029'),
  AP('Dirt Splatter', '#6b5a42'),
  AP('Uniform Grey', '#5f6669'),
  AP('Ash Grey', '#8f9599'),
  AP('Wolf Grey', '#8fa2ab'),
  AP('Gun Metal', '#5f6569', 'metalica'),
  AP('Plate Mail Metal', '#9aa0a4', 'metalica'),
  AP('Shining Silver', '#c0c5c8', 'metalica'),
  AP('Weapon Bronze', '#a4763f', 'metalica'),
  AP('Greedy Gold', '#c8a648', 'metalica'),
  AP('Strong Tone', '#4a3524', 'wash'),
  AP('Dark Tone', '#16181a', 'wash'),
  AP('Soft Tone', '#7a5c3a', 'wash'),
  AP('Military Shader', '#3f4630', 'wash'),
  AP('Blue Tone', '#22406b', 'wash'),
  AP('Green Tone', '#204a30', 'wash'),
  AP('Red Tone', '#78202a', 'wash'),
  AP('Flesh Wash', '#8f4a36', 'wash'),
]

/* ================================================================== */
/* SCALE75 / AK / P3 — recortes úteis                                  */
/* ================================================================== */

const OUTRAS: CatalogoTinta[] = [
  S('Black', '#151515'),
  S('White', '#f4f4f2'),
  S('Blood Red', '#9c1d20'),
  S('Sunset Orange', '#d9601f'),
  S('Golden Yellow', '#e0a626'),
  S('Deep Blue', '#1c3663'),
  S('Prussian Blue', '#1f3d55'),
  S('Sky Blue', '#5c8ab8'),
  S('Grim Green', '#2f4a33'),
  S('Turquoise Blue', '#1f7a80'),
  S('Purple Fiction', '#5a3266'),
  S('Birth of Venus', '#e0bd9a'),
  S('Old Copper', '#94572f', 'metalica'),
  S('Elven Gold', '#c6a44c', 'metalica'),
  S('Thrash Metal', '#7d8388', 'metalica'),

  K('Intense Black', '#151517'),
  K('Pure White', '#f6f6f4'),
  K('Deep Red', '#8f1a1e'),
  K('Radiant Yellow', '#eeba1e'),
  K('Deep Blue', '#1e3a6b'),
  K('Dark Green', '#2c4630'),
  K('Rust Brown', '#7a4a2a'),
  K('Neutral Grey', '#6f767a'),
  K('Steel', '#8a9095', 'metalica'),
  K('Old Gold', '#bd9c46', 'metalica'),

  P('Thamar Black', '#1a1a1c'),
  P('Morrow White', '#f4f4f2'),
  P('Khador Red Base', '#9c1a1e'),
  P('Sanguine Base', '#6b1a20'),
  P('Cygnar Blue Base', '#26497f'),
  P('Cygnar Blue Highlight', '#4a76ad'),
  P('Iosan Green', '#4a7a52'),
  P('Gnarls Green', '#3a4a32'),
  P('Menoth White Base', '#d9cfa8'),
  P('Bloodstone', '#8a4a2a'),
  P('Pig Iron', '#7d8286', 'metalica'),
  P('Quick Silver', '#b9bec1', 'metalica'),
  P('Solid Gold', '#c4a44a', 'metalica'),
]

export const CATALOGO: CatalogoTinta[] = [
  ...VALLEJO_MODEL_COLOR,
  ...VALLEJO_GAME_COLOR,
  ...VALLEJO_MODEL_AIR,
  ...CITADEL,
  ...ARMY_PAINTER,
  ...OUTRAS,
]

export const CATALOGO_POR_ID = new Map(CATALOGO.map((t) => [t.id, t]))

export const MARCAS: Marca[] = [
  'Vallejo',
  'Citadel',
  'Army Painter',
  'Scale75',
  'AK',
  'P3',
  'Kimera',
  'Outra',
]

/**
 * Equivalências curadas — pares que a comunidade trata como substituição
 * direta, mesmo quando o ΔE não é o menor possível (às vezes uma tinta com
 * ΔE ligeiramente maior se comporta melhor por opacidade ou granulação).
 * Essas entram sempre no topo da lista de equivalentes.
 */
export const EQUIVALENCIAS_CURADAS: Record<string, string[]> = {
  'vmc-950': ['cit-abaddon-black', 'ap-matt-black', 'p3-thamar-black'],
  'vmc-951': ['cit-white-scar', 'ap-matt-white', 'p3-morrow-white'],
  'vmc-995': ['cit-corvus-black', 'ap-uniform-grey'],
  'vmc-992': ['cit-dawnstone', 'ap-uniform-grey'],
  'vmc-990': ['cit-administratum-grey', 'ap-ash-grey'],
  'vmc-926': ['cit-mephiston-red', 'ap-pure-red', 'p3-khador-red-base'],
  'vmc-946': ['cit-khorne-red', 'ap-dragon-red'],
  'vmc-957': ['cit-evil-sunz-scarlet', 'ap-pure-red'],
  'vmc-925': ['cit-macragge-blue', 'ap-ultramarine-blue', 'p3-cygnar-blue-base'],
  'vmc-930': ['cit-kantor-blue', 'ap-deep-blue'],
  'vmc-963': ['cit-altdorf-guard-blue', 'ap-crystal-blue'],
  'vmc-961': ['cit-hoeth-blue', 'ap-crystal-blue'],
  'vmc-942': ['cit-warboss-green', 'ap-greenskin'],
  'vmc-968': ['cit-castellan-green', 'ap-army-green'],
  'vmc-970': ['cit-caliban-green', 'ap-angel-green'],
  'vmc-980': ['cit-lupercal-green'],
  'vmc-953': ['cit-averland-sunset', 'ap-daemonic-yellow'],
  'vmc-948': ['cit-yriel-yellow', 'ap-daemonic-yellow'],
  'vmc-871': ['cit-mournfang-brown', 'ap-leather-brown'],
  'vmc-872': ['cit-rhinox-hide', 'ap-fur-brown'],
  'vmc-984': ['cit-gorthor-brown', 'ap-monster-brown'],
  'vmc-983': ['cit-steel-legion-drab', 'ap-dirt-splatter'],
  'vmc-918': ['cit-screaming-skull', 'ap-skeleton-bone'],
  'vmc-819': ['cit-ushabti-bone', 'ap-skeleton-bone'],
  'vmc-976': ['cit-zandri-dust', 'ap-desert-yellow'],
  'vmc-955': ['cit-cadian-fleshtone', 'ap-barbarian-flesh'],
  'vmc-928': ['cit-kislev-flesh', 'ap-elven-flesh'],
  'vmc-927': ['cit-bugmans-glow', 'ap-tanned-flesh'],
  'vmc-960': ['cit-xereus-purple', 'ap-alien-purple'],
  'vmc-959': ['cit-naggaroth-night', 'ap-oozing-purple'],
  'vmc-997': ['cit-runefang-steel', 'ap-shining-silver', 'p3-quick-silver'],
  'vmc-996': ['cit-retributor-armour', 'ap-greedy-gold', 'p3-solid-gold'],
  'vmc-863': ['cit-leadbelcher', 'ap-gun-metal', 'p3-pig-iron'],
  'vmc-864': ['cit-ironbreaker', 'ap-plate-mail-metal'],
  'vmc-999': ['cit-hashut-copper', 'ap-weapon-bronze'],
  'vmc-998': ['cit-sycorax-bronze', 'ap-weapon-bronze'],
  // Game Color nasceu como resposta direta à linha da Citadel
  'vgc-022': ['cit-macragge-blue', 'ap-ultramarine-blue'],
  'vgc-008': ['cit-mephiston-red', 'ap-pure-red'],
  'vgc-030': ['cit-warboss-green', 'ap-goblin-green'],
  'vgc-034': ['cit-ushabti-bone', 'ap-skeleton-bone'],
  'vgc-051': ['cit-abaddon-black', 'ap-matt-black'],
  'vgc-001': ['cit-white-scar', 'ap-matt-white'],
  'vgc-016': ['cit-xereus-purple', 'ap-alien-purple'],
  'vgc-054': ['cit-leadbelcher', 'ap-gun-metal'],
  'vgc-055': ['cit-retributor-armour', 'ap-greedy-gold'],
}
