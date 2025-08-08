import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, of, forkJoin } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Product } from '@app/shared/models/product';
import { FIREBASE_MAIN_COLLECTION } from '@app/shared/constants/firebase.constants';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);
  private productsCollection = collection(this.firestore, FIREBASE_MAIN_COLLECTION);

  private productsCache: Product[] | null = null;
  private categoryCache = new Map<string, Product[]>();

  private randomProduct: Product | null = null;



  // Verificar si estamos en el navegador
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {

    if (this.productsCache) {
      return of(this.productsCache);
    }

    // Si no estamos en el navegador, devolver productos mock
    if (!this.isBrowser) {
      return of([]);
    }

    try {
      const productsCollection = collection(this.firestore, FIREBASE_MAIN_COLLECTION);
      const productsQuery = query(productsCollection);
      
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
            return of([]);

          }
          return of(products);
        }),
        catchError(error => {
          console.error('Error fetching products:', error);
          return of([]);
        })
      );
    } catch (error) {
      console.error('Error in getProducts:', error);
            return of([]);

    }
  }

  // Método adicional si quieres acceder al producto por slug desde cache
  getProductBySlug(slug: string): Observable<Product | null> {
    // Si ya hay productos en cache, buscar ahí
    if (this.productsCache) {
      const found = this.productsCache.find(p => p.slug === slug);
      if (found) {
        return of(found);
      }
    
    }

    // Si no hay cache, primero cargar todos
    return this.getProducts().pipe(
      map(products => {
        const found = products.find(p => p.slug === slug);
        return found ?? null; // <-- aquí convertimos undefined a null
      })
    );
  
  }

  getProductsByCategory(category: Category): Observable<Product[]> {
    if (!this.isBrowser) {
      return of([]);
    }

    const categoryKey = typeof category; // o category.id, según cómo esté estructurado

    // Si ya tenemos la categoría en cache, la devolvemos directamente
    if (this.categoryCache.has(categoryKey)) {
      return of(this.categoryCache.get(categoryKey)!);
    }

    try {
      const productsCollection = collection(this.firestore, 'products');
      const categoryQuery = query(
        productsCollection,
        where('category', '==', categoryKey),
        limit(10)
      );

      return from(getDocs(categoryQuery)).pipe(
        map(snapshot =>
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Product))
        ),
        tap(products => {
          this.categoryCache.set(categoryKey, products); // cachear resultados
        }),
        catchError(error => {
          console.error(`Error fetching products for category ${categoryKey}:`, error);
          return of([]);
        })
      );
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      return of([]);
    }
  }

  
   // Método para forzar recarga
  clearCache(): void {
    this.productsCache = null;
  }


}