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
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage'; // ✅ Importar Storage de Firebase
import { Product } from '@app/shared/models/product';
import { FIREBASE_MAIN_COLLECTION, FIREBASE_STORAGE_FOLDER } from '@app/shared/constants/firebase.constants';
import { optimizeImageForWeb } from '@app/shared/helper/util-functions';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private firestore = inject(Firestore);
  private fireStorage = inject(Storage);

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

  createProduct(product: Product, imageFile: File): Observable<DocumentReference> {
    return from(this.uploadProductImage(imageFile, product.name!)).pipe(
      switchMap(downloadURL => {
        const productWithImage: Product = {
          ...product,
          imageUrl: downloadURL
        };
        return from(addDoc(this.productsCollection, productWithImage));
      }),
      tap(() => this.reloadProducts()),
      catchError(error => {
        console.error('Error creating product:', error);
        throw error;
      })
    );
  }

  updateProduct(productId: string, data: Partial<Product>, imageFile?: File | null): Observable<void> {
  const update$ = imageFile
    ? from(this.uploadProductImage(imageFile, data.name!)).pipe(
        switchMap(downloadURL => {
          const dataWithImage = { ...data, imageUrl: downloadURL };
          const productRef = doc(this.firestore, `${FIREBASE_MAIN_COLLECTION}/${productId}`);
          return from(updateDoc(productRef, dataWithImage));
        })
      )
    : from(updateDoc(doc(this.firestore, `${FIREBASE_MAIN_COLLECTION}/${productId}`), data));

  return update$.pipe(
    tap(() => this.reloadProducts()),
    catchError(error => {
      console.error('Error updating product:', error);
      throw error;
    })
  );
}

    // subida de ARCHIVOS A FIREBASE
  private async uploadProductImage(file: File, rename: string): Promise<string> {
    const optimizedBlob = await optimizeImageForWeb(file);

    // Asegura que el nombre termina en .webp
    const baseName = rename.replace(/\.[^/.]+$/, ''); // quita extensión si la hay
    const name = `${baseName}.webp`;

    const storagePath = `${FIREBASE_STORAGE_FOLDER}/${name}`;
    const storageRef = ref(this.fireStorage, storagePath);

    await uploadBytes(storageRef, optimizedBlob);
    return await getDownloadURL(storageRef);
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
