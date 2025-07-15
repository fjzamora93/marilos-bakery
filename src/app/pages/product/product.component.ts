import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { SeoService } from '../../services/seo.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private seoService = inject(SeoService);

  product: Product | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.productsService.getProductBySlug(slug).subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
          if (product) {
            this.updateSEO(product);
            this.addProductStructuredData(product);
          }
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.error = 'Error al cargar el producto';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Producto no encontrado';
      this.loading = false;
    }
  }

  private updateSEO(product: Product): void {
    const title = product.seoTitle || `${product.name} - Tu Tienda`;
    const description = product.seoDescription || product.description;
    const keywords = product.seoKeywords || `${product.name}, ${product.category}, tienda online`;

    this.seoService.updateMetaTags({
      title,
      description,
      keywords,
      image: product.imageUrl,
      type: 'product',
      url: `https://tu-dominio.com/producto/${product.slug}`
    });
  }

  private addProductStructuredData(product: Product): void {
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.imageUrl,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      "brand": {
        "@type": "Brand",
        "name": "Tu Marca"
      },
      "category": product.category
    };

    this.seoService.addJsonLd(structuredData);
  }
}
