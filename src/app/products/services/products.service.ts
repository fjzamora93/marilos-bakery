import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, of, forkJoin } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Product } from '@products/models/product';
import { FIREBASE_MAIN_COLLECTION } from '@app/shared/constants/firebase.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  // Verificar si estamos en el navegador
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    // Si no estamos en el navegador, devolver productos mock
    if (!this.isBrowser) {
      return of([]);
    }

    try {
      const productsCollection = collection(this.firestore, FIREBASE_MAIN_COLLECTION);
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

  // Obtener producto por slug (para SEO)
  getProductBySlug(slug: string): Observable<Product | null> {
    // Si no estamos en el navegador, buscar en productos mock
    if (!this.isBrowser) {
      return of(null);
    }

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
          return of(null);
        })
      );
    } catch (error) {
      console.error('Error in getProductBySlug:', error);
      return of(null);
    }
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (!this.isBrowser) {
      return of([]);
    }

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
          return of([]);
        })
      );
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      return of([]);
    }
  }


}