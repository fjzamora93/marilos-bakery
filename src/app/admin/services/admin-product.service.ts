import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, of, forkJoin } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Product } from '@app/products/models/product';
import { Auth } from '@angular/fire/auth';
import { FIREBASE_MAIN_COLLECTION } from '@app/shared/constants/firebase.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  private user = this.auth.currentUser;

  // Verificar si estamos en el navegador
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  // Obtener todos los productos
getMyProducts(): Observable<Product[]> {
  if (!this.isBrowser) {
    return of([]);
  }

  const productsCollection = collection(this.firestore, FIREBASE_MAIN_COLLECTION);
  const productsQuery = query(productsCollection, limit(10));

  return from(getDocs(productsQuery)).pipe(
    map(snapshot =>
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product))
    ),
    catchError(error => {
      console.error('Error fetching products:', error);
      // Devuelve un array vacío en caso de error
      return of([]);
    })
  );
}



 

}