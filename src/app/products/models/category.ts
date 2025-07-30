export enum Category {
  CAKES = 'tartas',
  SWEETS = 'dulces',
  EXPERIMENTAL = 'experimental',
  HEALTHY = 'saludable',
  OTHERS = 'otros',
}

export function stringToCategory(categoryString: string): Category | null {
  const normalized = categoryString.toLowerCase().replace(/-/g, '_');

  const categoryMap: { [key: string]: Category } = {
    'tartas': Category.CAKES,
    'dulces': Category.SWEETS,
    'experimental': Category.EXPERIMENTAL,
    'saludable': Category.HEALTHY,
    'otros': Category.OTHERS,
  };

  return categoryMap[normalized] || null;
}

