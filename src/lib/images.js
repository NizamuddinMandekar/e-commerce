const BASE = 'https://images.unsplash.com/photo-';

export function img(id, { w = 900, q = 80 } = {}) {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMG = {
  sareePurpleStudio: '1610030469983-98e550d6193c',
  sareeBridalTrees: '1617627143750-d86bc21e42bb',
  sareeVillageColor: '1628477116196-48afe0d209e0',
  sareeCreamStation: '1726076574747-c0fb20b3cf37',
  sareeGreenStudio: '1708182564325-fb1d3a3864d3',

  lehengaRedVeil: '1654764746225-e63f5e90facd',
  lehengaRedHall: '1629118477133-b8b1499f2b8a',

  suitMaroonSit: '1708534246051-7f47b279e94b',
  suitNavyPrint1: '1764740184986-ad5306463ae1',
  suitNavyPrint2: '1764740185240-58527413f572',
  suitGreenSharara: '1597983073750-16f5ded1321f',

  necklaceLayeredBlue: '1599643478518-a784e5dc4c8f',
  necklaceNeckCloseup: '1611652022419-a9419f74343d',
  necklacePendant: '1599643477877-530eb83abc8e',
  necklaceSetBust: '1758995115857-2de1eb6283d0',
  necklaceWall: '1758995116106-113264be5365',

  earringsSapphireLeaf: '1535632066927-ab7c9ab60908',
  earringsJhumkaRow: '1762686130435-897de4b26aac',
  earringsJhumkaWorn: '1778148046574-c1509f5a40d4',
  earringsRackMarket: '1679590988891-2357406aca80',

  bangleDiamond: '1573408301185-9146fe634ad0',
  bangleRoseGold: '1611591437281-460bfbe1220a',
  bangleShopDisplay: '1760786933951-ce3791011d1e',

  ringDiamondBox: '1605100804763-247f67b3557e',
  ringGoldPair: '1606800052052-a08af7148866',

  lifestyleBrideJewelry: '1763578590148-fbac0711f3b2',
  artisanCraft: '1715374033196-0ff662284a7e',
};
