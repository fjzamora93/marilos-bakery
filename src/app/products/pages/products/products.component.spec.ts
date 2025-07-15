import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Importamos el componente usando default export
import ProductsComponent from '@products/pages/products/products.component';
import { Product } from '@app/products/models/product';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 🧪 TEST VISUAL: Verificar que los productos se muestran correctamente
  it('should display products correctly when products are loaded', () => {
    // 📋 PASO 1: Preparar datos de prueba (mock data)
    // Creamos un array de productos simulados para el test usando el tipo correcto
    const mockProducts: Product[] = [
      {
        id: '1',  // ✅ Cambiar a string si es necesario
        name: 'Producto 1',
        price: 29.99,
        description: 'Descripción del producto 1',
        imageUrl: 'https://example.com/product1.jpg',
        category: 'Categoría 1',
        slug: 'producto-1',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-02')
      },
      {
        id: '2',
        name: 'Producto 2',
        price: 49.99,
        description: 'Descripción del producto 2',
        imageUrl: 'https://example.com/product2.jpg',
        category: 'Categoría 2',
        slug: 'producto-2',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-04')
      },
      {
        id: '3',
        name: 'Producto 3',
        price: 19.99,
        description: 'Descripción del producto 3',
        imageUrl: 'https://example.com/product3.jpg',
        category: 'Categoría 3',
        slug: 'producto-3',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-06')
      }
    ];

    // 📋 PASO 2: Configurar el estado del componente
    component.products = mockProducts;  // ✅ Ahora compatible
    component.loading = false;
    component.error = null;

    // 📋 PASO 3: Detectar cambios en el DOM
    fixture.detectChanges();

    // 📋 PASO 4: Obtener elementos del DOM para verificar
    const productsContainer: DebugElement = fixture.debugElement.query(By.css('.products-container'));
    const productsGrid: DebugElement = fixture.debugElement.query(By.css('.products-grid'));
    const productElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.product-item'));

    // 📋 PASO 5: VERIFICACIONES VISUALES
    expect(productsContainer).toBeTruthy();
    expect(productsGrid).toBeTruthy();
    expect(productElements.length).toBe(3);

    // ✅ Verificar contenido de productos
    productElements.forEach((productElement, index) => {
      const productName = productElement.query(By.css('.product-name'));
      expect(productName).toBeTruthy();
      expect(productName.nativeElement.textContent.trim()).toBe(mockProducts[index].name);
      
      const productPrice = productElement.query(By.css('.product-price'));
      expect(productPrice).toBeTruthy();
      expect(productPrice.nativeElement.textContent).toContain(mockProducts[index].price.toString());
      
      console.log(`✅ Producto ${index + 1} verificado correctamente`);
    });

    console.log('🎉 TEST VISUAL COMPLETADO: Productos se muestran correctamente');
  });

  // ... resto de tests
});