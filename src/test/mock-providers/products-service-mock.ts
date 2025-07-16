import { ProductsService } from '@app/products/services/products.service';
import { of } from 'rxjs';
import { mockProducts } from '@test/mock-models/products-mock';

export const productsServiceMock = {
  getProducts: jasmine.createSpy('getProducts').and.returnValue(of(mockProducts)),
  getProductById: jasmine.createSpy('getProductById').and.returnValue(of(mockProducts[0])),
  getProductBySlug: jasmine.createSpy('getProductBySlug').and.returnValue(of(mockProducts[0])),
  createProduct: jasmine.createSpy('createProduct').and.returnValue(of(mockProducts[0])),
  updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of(mockProducts[0])),
  deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of(void 0))
};

export const productsServiceProvider = {
  provide: ProductsService,
  useValue: productsServiceMock
};