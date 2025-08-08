import { Product } from '@app/shared/models/product';

export const mockProducts: Product[] = [
 {
        id: '1',
        name: 'Smartphone Premium',
        description: 'Último modelo con tecnología avanzada, pantalla OLED y cámara de alta resolución',
        price: 699.99,
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        category: 'Electrónicos',
        slug: 'smartphone-premium',
        seoTitle: 'Smartphone Premium - La Mejor Tecnología',
        seoDescription: 'Compra el smartphone premium con la mejor tecnología del mercado',
        seoKeywords: 'smartphone, móvil, tecnología, premium',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        name: 'Laptop Profesional',
        description: 'Portátil de alto rendimiento para profesionales y gamers',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        category: 'Electrónicos',
        slug: 'laptop-profesional',
        seoTitle: 'Laptop Profesional - Alto Rendimiento',
        seoDescription: 'Laptop profesional con el mejor rendimiento para trabajo y gaming',
        seoKeywords: 'laptop, ordenador, gaming, profesional',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      },
      {
        id: '3',
        name: 'Auriculares Inalámbricos',
        description: 'Auriculares con cancelación de ruido y calidad de sonido excepcional',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        category: 'Electrónicos',
        slug: 'auriculares-inalambricos',
        seoTitle: 'Auriculares Inalámbricos - Sonido Premium',
        seoDescription: 'Auriculares inalámbricos con cancelación de ruido y sonido premium',
        seoKeywords: 'auriculares, inalámbricos, sonido, premium',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03')
      },
      {
        id: '4',
        name: 'Tablet Creativa',
        description: 'Tablet perfecta para diseño, ilustración y productividad',
        price: 549.99,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
        category: 'Electrónicos',
        slug: 'tablet-creativa',
        seoTitle: 'Tablet Creativa - Diseño y Productividad',
        seoDescription: 'Tablet perfecta para diseñadores y creativos',
        seoKeywords: 'tablet, diseño, creatividad, digital',
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04')
      },
      {
        id: '5',
        name: 'Smartwatch Deportivo',
        description: 'Reloj inteligente con GPS, monitor cardíaco y resistente al agua',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'Electrónicos',
        slug: 'smartwatch-deportivo',
        seoTitle: 'Smartwatch Deportivo - Fitness y Salud',
        seoDescription: 'Smartwatch deportivo con GPS y monitor de salud',
        seoKeywords: 'smartwatch, deportivo, fitness, salud',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      }
];