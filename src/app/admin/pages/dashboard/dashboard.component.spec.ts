import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminProductsService } from '../../services/admin-product.service';
import { Product } from '../../../shared/models/product';
import DashboardComponent from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let adminProductsService: jasmine.SpyObj<AdminProductsService>;
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProducts: Product[] = [
    {
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
    }
  ];

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([]);
    const adminProductsServiceSpy = jasmine.createSpyObj('AdminProductsService', 
      ['deleteProduct'], 
      { products$: productsSubject.asObservable() }
    );

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, MatIconModule, MatButtonModule],
      providers: [
        { provide: AdminProductsService, useValue: adminProductsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    adminProductsService = TestBed.inject(AdminProductsService) as jasmine.SpyObj<AdminProductsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    productsSubject.next(mockProducts);
    expect(component.products).toEqual(mockProducts);
    expect(component.isLoading).toBeFalse();
  });

  it('should show create form when onCreateProduct is called', () => {
    component.onCreateProduct();
    expect(component.showCreateForm).toBeTrue();
    expect(component.editingProductId).toBeNull();
  });

  it('should show edit form when onEditProduct is called', () => {
    component.onEditProduct('test-id');
    expect(component.showCreateForm).toBeTrue();
    expect(component.editingProductId).toBe('test-id');
  });

  it('should close form when onFormClose is called', () => {
    component.showCreateForm = true;
    component.editingProductId = 'test-id';
    
    component.onFormClose();
    
    expect(component.showCreateForm).toBeFalse();
    expect(component.editingProductId).toBeNull();
  });
});
