import { Component, OnInit, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { SeoService } from '../../services/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from "@app/products/components/product-card/product-card.component";
import { Category, stringToCategory } from '@app/products/models/category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export default class ProductsComponent implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute); 
  private resizeListener?: () => void;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: Category | null = null;
  loading = true;
  error: string | null = null;
  
  // Funcionalidades nuevas
  searchTerm: string = '';
  isGridView: boolean = true;
  isMobile = false;

   ngOnInit(): void {
    this.detectCategoryFromQueryParams(); 
    // Solo verificar tamaño de pantalla en el browser
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      
      // Listener para cambios de tamaño de pantalla
      this.resizeListener = () => this.checkScreenSize();
      window.addEventListener('resize', this.resizeListener);
    }
    
    this.loadProducts();
    this.setupSEO();
  }

    ngOnDestroy(): void {
    // Solo remover listener si estamos en el browser
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        
        // ✅ Aplicar filtro de categoría si existe
        if (this.selectedCategory) {
          this.filterByCategory();
        } else {
          this.filteredProducts = [...products];
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Error al cargar los productos';
        this.loading = false;
      }
    });
  }

  private detectCategoryFromQueryParams(): void {
    this.route.queryParams.subscribe(queryParams => {
      const categoryParam = queryParams['category'];
      
      if (categoryParam) {
        this.selectedCategory = stringToCategory(categoryParam);
      } else {
        this.selectedCategory = null;
      }
      
      // Si hay una categoría válida, filtrar automáticamente
      if (this.selectedCategory && this.products.length > 0) {
        this.filterByCategory();
      }
    });
  }

  // ✅ Filtrar productos por categoría
  private filterByCategory(): void {
    if (!this.selectedCategory) {
      this.filteredProducts = [...this.products];
      return;
    }

    const normalizedCategory = this.selectedCategory.toLowerCase().replace(/-/g, ' ');
    this.filteredProducts = this.products.filter(product => 
      product.category.toLowerCase() === normalizedCategory ||
      product.category.toLowerCase().includes(normalizedCategory)
    );
  }

  // Filtrar productos por búsqueda
   filterProducts(): void {
    let productsToFilter = this.selectedCategory 
      ? this.products.filter(product => {
          const normalizedCategory = this.selectedCategory!.toLowerCase().replace(/-/g, ' ');
          return product.category.toLowerCase() === normalizedCategory ||
                 product.category.toLowerCase().includes(normalizedCategory);
        })
      : [...this.products];

    if (!this.searchTerm.trim()) {
      this.filteredProducts = productsToFilter;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = productsToFilter.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term)
    );
  }

  // Cambiar modo de visualización
   toggleView(): void {
    this.loadProducts();
    this.isGridView = !this.isGridView;
  }

  // Limpiar búsqueda
  clearSearch(): void {
    this.searchTerm = '';
    this.filterProducts();
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
    this.filteredProducts = [...this.products];
    // Navegar a la ruta sin categoría
    // this.router.navigate(['/reposteria']);
  }

  private setupSEO(): void {
    this.seoService.updateMetaTags({
      title: 'Repostería Artesanal - Marilo\'s Bakery',
      description: 'Descubre nuestra exquisita colección de tartas, pasteles y dulces artesanales hechos con amor y los mejores ingredientes.',
      keywords: 'repostería, tartas, pasteles, dulces, artesanal, Marilo\'s Bakery',
      type: 'website',
      url: 'https://marilosbakery.com/reposteria'
    });
  }

  checkScreenSize(): void {
    // Solo ejecutar en el browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;
    
    // Solo forzar lista en móvil si cambió el estado
    if (this.isMobile && !wasMobile) {
      this.isGridView = false;
    }
  }

  
}