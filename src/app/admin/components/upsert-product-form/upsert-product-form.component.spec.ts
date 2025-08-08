import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { UpsertProductFormComponent } from './upsert-product-form.component';
import { AdminProductsService } from '../../services/admin-product.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Product } from '../../../shared/models/product';

describe('UpsertProductFormComponent', () => {
  let component: UpsertProductFormComponent;
  let fixture: ComponentFixture<UpsertProductFormComponent>;
  let adminProductsService: jasmine.SpyObj<AdminProductsService>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    imageUrl: 'https://example.com/image.jpg',
    category: 'Test Category',
    slug: 'test-product',
    seoTitle: 'Test Product SEO',
    seoDescription: 'Test SEO Description',
    seoKeywords: 'test, product',
    createdAt: new Date(),
    updatedAt: new Date(),
    userUid: 'test-user-id'
  };

  const mockUser = {
    uid: 'test-user-id',
    email: 'test@example.com'
  };

  beforeEach(async () => {
    const adminProductsServiceSpy = jasmine.createSpyObj('AdminProductsService', 
      ['getProductDetail', 'createProduct', 'updateProduct']
    );
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser: mockUser
    });

    await TestBed.configureTestingModule({
      imports: [UpsertProductFormComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
      providers: [
        { provide: AdminProductsService, useValue: adminProductsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpsertProductFormComponent);
    component = fixture.componentInstance;
    adminProductsService = TestBed.inject(AdminProductsService) as jasmine.SpyObj<AdminProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values for create mode', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('price')?.value).toBe('');
    expect(component.productForm.get('imageUrl')?.value).toBe('');
  });

  it('should emit closeForm when onCancel is called', () => {
    spyOn(component.closeForm, 'emit');
    
    component.onCancel();
    
    expect(component.closeForm.emit).toHaveBeenCalled();
  });

  it('should validate required fields', () => {
    const nameControl = component.productForm.get('name');
    const descriptionControl = component.productForm.get('description');
    const priceControl = component.productForm.get('price');
    const imageUrlControl = component.productForm.get('imageUrl');

    // Test required validation
    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(priceControl?.valid).toBeFalsy();
    expect(imageUrlControl?.valid).toBeFalsy();

    // Set valid values
    nameControl?.setValue('Test Product');
    descriptionControl?.setValue('Test Description with more than 10 characters');
    priceControl?.setValue('100');
    imageUrlControl?.setValue('https://example.com/image.jpg');

    expect(nameControl?.valid).toBeTruthy();
    expect(descriptionControl?.valid).toBeTruthy();
    expect(priceControl?.valid).toBeTruthy();
    expect(imageUrlControl?.valid).toBeTruthy();
  });
});
