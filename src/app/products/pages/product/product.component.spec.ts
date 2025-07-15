import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import ProductComponent from './product.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/products/services/products.service';

// 1. Mock de ActivatedRoute
const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => 'mockId'
    }
  }
};

// 2. Mock de ProductsService
class ProductsServiceMock {
  getProduct(id: string) {
    return of({ id, name: 'Producto de prueba' });
  }
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProductsService, useClass: ProductsServiceMock }
        // Si tu ProductsService internamente usa Firestore, podrías también mockear Firestore aquí.
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
