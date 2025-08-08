import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import ProductsComponent from './products.component';
import { mockProducts } from '@test/mock-models/products-mock';
import { productsServiceProvider, productsServiceMock } from '@test/mock-providers/products-service-mock';
import { activatedRouteProvider } from '@test/index';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        productsServiceProvider,
        activatedRouteProvider
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productsServiceMock.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();
  });

  it('should display the 5 products in the template', () => {
    const productElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productElements.length).toBe(5);

    productElements.forEach((el, index) => {
      const name = el.query(By.css('.product-name')).nativeElement.textContent.trim();
      expect(name).toBe(mockProducts[index].name);
    });
  });
});
