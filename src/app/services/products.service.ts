import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, map, of, forkJoin } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore = inject(Firestore);

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const productsQuery = query(productsCollection, limit(10));
      
      return from(getDocs(productsQuery)).pipe(
        map(snapshot => 
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Product))
        ),
        switchMap(products => {
          // Si no hay productos en la base de datos, cargar los mockeados
          if (products.length === 0) {
            console.log('No hay productos en Firebase, cargando productos de ejemplo...');
            return this.loadMockProductsToFirebase().pipe(
              switchMap(() => this.getProducts()) // Volver a cargar después de insertar
            );
          }
          return of(products);
        }),
        catchError(error => {
          console.error('Error fetching products:', error);
          return of(this.getMockProducts());
        })
      );
    } catch (error) {
      console.error('Error in getProducts:', error);
      return of(this.getMockProducts());
    }
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<Product | null> {
    try {
      const productDoc = doc(this.firestore, `products/${id}`);
      
      return from(getDoc(productDoc)).pipe(
        map(doc => {
          if (doc.exists()) {
            return {
              id: doc.id,
              ...doc.data()
            } as Product;
          }
          return null;
        }),
        catchError(error => {
          console.error('Error fetching product by ID:', error);
          return of(null);
        })
      );
    } catch (error) {
      console.error('Error in getProductById:', error);
      return of(null);
    }
  }

  // Obtener producto por slug (para SEO)
  getProductBySlug(slug: string): Observable<Product | null> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const productQuery = query(productsCollection, where('slug', '==', slug), limit(1));
      
      return from(getDocs(productQuery)).pipe(
        map(snapshot => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return {
              id: doc.id,
              ...doc.data()
            } as Product;
          }
          return null;
        }),
        catchError(error => {
          console.error('Error fetching product by slug:', error);
          return of(this.getMockProducts().find(p => p.slug === slug) || null);
        })
      );
    } catch (error) {
      console.error('Error in getProductBySlug:', error);
      return of(this.getMockProducts().find(p => p.slug === slug) || null);
    }
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const categoryQuery = query(
        productsCollection, 
        where('category', '==', category),
        limit(10)
      );
      
      return from(getDocs(categoryQuery)).pipe(
        map(snapshot => 
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Product))
        ),
        catchError(error => {
          console.error('Error fetching products by category:', error);
          return of(this.getMockProducts().filter(p => p.category === category));
        })
      );
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      return of(this.getMockProducts().filter(p => p.category === category));
    }
  }

  // Subir un producto a Firebase
  uploadProduct(product: Omit<Product, 'id'>): Observable<string> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      
      // Añadir timestamps
      const productData = {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return from(addDoc(productsCollection, productData)).pipe(
        map(docRef => {
          console.log('Producto creado con ID:', docRef.id);
          return docRef.id;
        }),
        catchError(error => {
          console.error('Error uploading product:', error);
          throw error;
        })
      );
    } catch (error) {
      console.error('Error in uploadProduct:', error);
      throw error;
    }
  }

  // Actualizar un producto existente
  updateProduct(id: string, product: Partial<Product>): Observable<void> {
    try {
      const productDoc = doc(this.firestore, `products/${id}`);
      
      const updateData = {
        ...product,
        updatedAt: new Date()
      };
      
      return from(setDoc(productDoc, updateData, { merge: true })).pipe(
        map(() => {
          console.log('Producto actualizado con ID:', id);
        }),
        catchError(error => {
          console.error('Error updating product:', error);
          throw error;
        })
      );
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  }

  // Cargar productos mockeados a Firebase
  loadMockProductsToFirebase(): Observable<string[]> {
    try {
      const mockProducts = this.getMockProducts();
      const uploadObservables = mockProducts.map(product => {
        const { id, ...productData } = product; // Remover el ID mockeado
        return this.uploadProduct(productData);
      });
      
      return forkJoin(uploadObservables).pipe(
        map(productIds => {
          console.log('Productos mockeados cargados a Firebase:', productIds);
          return productIds;
        }),
        catchError(error => {
          console.error('Error cargando productos mockeados:', error);
          throw error;
        })
      );
    } catch (error) {
      console.error('Error in loadMockProductsToFirebase:', error);
      throw error;
    }
  }

  // Verificar si hay productos en la base de datos
  hasProducts(): Observable<boolean> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const productsQuery = query(productsCollection, limit(1));
      
      return from(getDocs(productsQuery)).pipe(
        map(snapshot => !snapshot.empty),
        catchError(error => {
          console.error('Error checking if products exist:', error);
          return of(false);
        })
      );
    } catch (error) {
      console.error('Error in hasProducts:', error);
      return of(false);
    }
  }

  // Inicializar productos si no existen
  initializeProducts(): Observable<void> {
    return this.hasProducts().pipe(
      switchMap(hasProducts => {
        if (!hasProducts) {
          console.log('Inicializando productos en Firebase...');
          return this.loadMockProductsToFirebase().pipe(
            map(() => void 0)
          );
        }
        return of(void 0);
      })
    );
  }

  // Productos de ejemplo para desarrollo
  private getMockProducts(): Product[] {
    return [
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
  }
}