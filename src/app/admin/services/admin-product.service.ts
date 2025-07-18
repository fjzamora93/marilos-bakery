import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  limit,
  DocumentReference,
  where,
  getDoc
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators';
import { Auth, authState, User } from '@angular/fire/auth';
import { Product } from '@app/products/models/product';
import { FIREBASE_MAIN_COLLECTION } from '@app/shared/constants/firebase.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  private productsCollection = collection(this.firestore, FIREBASE_MAIN_COLLECTION);
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor() {
    if (this.isBrowser) {
      // Cuando cambia el usuario, recarga productos
      authState(this.auth)
        .pipe(
          filter(user => !!user), // solo usuarios logueados
          switchMap(user => this.loadProductsForUser(user!))
        )
        .subscribe({
          next: products => this.productsSubject.next(products),
          error: err => {
            console.error('Error cargando productos:', err);
            this.productsSubject.next([]);
          }
        });
    }
  }

  private loadProductsForUser(user: User): Observable<Product[]> {
    const productsQuery = query(
      this.productsCollection,
      where('userUid', '==', user.uid),
      limit(10)
    );
    return from(getDocs(productsQuery)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product))
      ),
      catchError(error => {
        console.error('Error fetching user products:', error);
        return of([]);
      })
    );
  }

  // Opcional: método público para forzar recarga manual
  reloadProducts(): void {
    const user = this.auth.currentUser;
    if (user && this.isBrowser) {
      this.loadProductsForUser(user).subscribe(products => this.productsSubject.next(products));
    }
  }

  createProduct(product: Product): Observable<DocumentReference> {
    return from(addDoc(this.productsCollection, product)).pipe(
      tap(() => this.reloadProducts()), // refrescar lista
      catchError(error => {
        console.error('Error creating product:', error);
        throw error;
      })
    );
  }

  updateProduct(productId: string, data: Partial<Product>): Observable<void> {
    const productRef = doc(this.firestore, `${FIREBASE_MAIN_COLLECTION}/${productId}`);
    return from(updateDoc(productRef, data)).pipe(
      tap(() => this.reloadProducts()), // refrescar lista
      catchError(error => {
        console.error('Error updating product:', error);
        throw error;
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const productRef = doc(this.firestore, `${FIREBASE_MAIN_COLLECTION}/${productId}`);
    return from(deleteDoc(productRef)).pipe(
      tap(() => this.reloadProducts()), // refrescar lista
      catchError(error => {
        console.error('Error deleting product:', error);
        throw error;
      })
    );
  }


  getProductDetail(productId: string): Observable<Product | null> {
    if (!this.isBrowser) {
      return of(null);
    }

    const productRef = doc(this.firestore, `${FIREBASE_MAIN_COLLECTION}/${productId}`);

    return from(getDoc(productRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as Product;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching product detail:', error);
        return of(null);
      })
    );
  }

}
