// test/firestore.mock.ts
import { Firestore } from '@angular/fire/firestore';
import { mockProducts } from '@test/mock-models/products-mock';
import { of } from 'rxjs';

export const FirestoreMock = {
  collection: () => ({
    valueChanges: () => of(mockProducts),  // <--- aquí devuelves tus productos mock
    snapshotChanges: () => of([]),
    doc: () => ({
      valueChanges: () => of({}),
      set: () => Promise.resolve(),
      update: () => Promise.resolve()
    })
  })
};

export const provideFirestoreMock = {
  provide: Firestore,
  useValue: FirestoreMock
};