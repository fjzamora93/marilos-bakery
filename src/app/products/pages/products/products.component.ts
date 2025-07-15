import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private seoService = inject(SeoService);

  products: Product[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.setupSEO();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Error al cargar los productos';
        this.loading = false;
      }
    });
  }

  private setupSEO(): void {
    this.seoService.updateMetaTags({
      title: 'Productos - Tu Tienda Online',
      description: 'Descubre nuestra amplia gama de productos de calidad al mejor precio',
      keywords: 'productos, tienda online, comprar, ofertas',
      type: 'website',
      url: 'https://tu-dominio.com/productos'
    });
  }
  
}
