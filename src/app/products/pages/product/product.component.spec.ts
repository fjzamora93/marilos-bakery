import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import ProductComponent from './product.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/products/services/products.service';
import { activatedRouteProvider, productsServiceProvider } from '@test/index';




describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        activatedRouteProvider,
        productsServiceProvider,
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
