import { Product } from '@app/products/models/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Producto 1',
    price: 29.99,
    description: 'Descripción del producto 1',
    imageUrl: 'https://example.com/product1.jpg',
    category: 'Categoría 1',
    slug: 'producto-1',
    seoTitle: 'Producto 1 - SEO Title',
    seoDescription: 'Descripción SEO del producto 1',
    seoKeywords: 'producto1, categoria1, test',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '2',
    name: 'Producto 2',
    price: 49.99,
    description: 'Descripción del producto 2',
    imageUrl: 'https://example.com/product2.jpg',
    category: 'Categoría 2',
    slug: 'producto-2',
    seoTitle: 'Producto 2 - SEO Title',
    seoDescription: 'Descripción SEO del producto 2',
    seoKeywords: 'producto2, categoria2, test',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-04')
  },
  {
    id: '3',
    name: 'Producto 3',
    price: 19.99,
    description: 'Descripción del producto 3',
    imageUrl: 'https://example.com/product3.jpg',
    category: 'Categoría 3',
    slug: 'producto-3',
    seoTitle: 'Producto 3 - SEO Title',
    seoDescription: 'Descripción SEO del producto 3',
    seoKeywords: 'producto3, categoria3, test',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-06')
  }
];