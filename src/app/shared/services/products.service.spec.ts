import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideFirestoreMock } from 'test/mock-providers/firestore-mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideFirestoreMock]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
