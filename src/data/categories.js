import { img, IMG } from '../lib/images';

export const CATEGORIES = [
  {
    name: 'Sarees',
    slug: 'sarees',
    group: 'Traditional Wear',
    blurb: 'Handwoven silks & weaves',
    image: img(IMG.sareeGreenStudio, { w: 800 }),
  },
  {
    name: 'Lehengas',
    slug: 'lehengas',
    group: 'Traditional Wear',
    blurb: 'Bridal & festive edits',
    image: img(IMG.lehengaRedHall, { w: 800 }),
  },
  {
    name: 'Salwar Suits',
    slug: 'salwar-suits',
    group: 'Traditional Wear',
    blurb: 'Everyday elegance',
    image: img(IMG.suitNavyPrint1, { w: 800 }),
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    group: 'Fine Jewelry',
    blurb: 'Statement & layered pieces',
    image: img(IMG.necklaceSetBust, { w: 800 }),
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    group: 'Fine Jewelry',
    blurb: 'Jhumkas to studs',
    image: img(IMG.earringsJhumkaWorn, { w: 800 }),
  },
  {
    name: 'Bangles & Bracelets',
    slug: 'bangles',
    group: 'Fine Jewelry',
    blurb: 'Hand-finished metalwork',
    image: img(IMG.bangleRoseGold, { w: 800 }),
  },
  {
    name: 'Rings',
    slug: 'rings',
    group: 'Fine Jewelry',
    blurb: 'Everyday & occasion rings',
    image: img(IMG.ringDiamondBox, { w: 800 }),
  },
];
