import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { SeoService } from '../../services/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from "@app/products/components/product-card/product-card.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private seoService = inject(SeoService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error: string | null = null;
  
  // Funcionalidades nuevas
  searchTerm: string = '';
  isGridView: boolean = true;
  isMobile = false;

  ngOnInit(): void {
    this.checkScreenSize();
    this.loadProducts();
    this.setupSEO();
    
    // Listener para cambios de tamaño de pantalla
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isGridView = false;
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Error al cargar los productos';
        this.loading = false;
      }
    });
  }

  // Filtrar productos por búsqueda
  filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
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

  private setupSEO(): void {
    this.seoService.updateMetaTags({
      title: 'Repostería Artesanal - Marilo\'s Bakery',
      description: 'Descubre nuestra exquisita colección de tartas, pasteles y dulces artesanales hechos con amor y los mejores ingredientes.',
      keywords: 'repostería, tartas, pasteles, dulces, artesanal, Marilo\'s Bakery',
      type: 'website',
      url: 'https://marilosbakery.com/reposteria'
    });
  }

  
}