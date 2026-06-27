import { slugify } from './slugify';

export function computeNavGroups(categories) {
  const order = [];
  const map = new Map();
  categories.forEach((cat) => {
    if (!map.has(cat.group)) {
      map.set(cat.group, []);
      order.push(cat.group);
    }
    map.get(cat.group).push({ name: cat.name, slug: cat.slug });
  });
  return order.map((title) => ({
    title,
    slug: slugify(title),
    items: map.get(title),
  }));
}
