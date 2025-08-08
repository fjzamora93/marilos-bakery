import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@app/shared/services/products.service';
import { SeoService } from '@app/shared/services/seo.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export default class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);

  product: Product | null = null;
  safeDescription!: SafeHtml;
  loading = true;
  error: string | null = null;
imageLoaded = false;
 

  ngOnInit(): void {
    this.loadProduct();
    console.log('PRODUCTO:', this.product?.seoTitle);
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
            this.formatDescription(); // 👈 formatea cuando llega
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

  private formatDescription() {
  if (this.product?.description) {
    let desc = this.product.description;

    // 1. Reemplazar saltos de línea por <br>
    desc = desc.replace(/(?:\r\n|\r|\n)/g, '<br>');

    // 2. Transformar guiones al inicio de línea o tras <br> en viñetas
    desc = desc.replace(/(^|<br\s*\/?>)\s*-\s*/g, '$1• ');

    // 3. Poner en negrita lo que está entre la viñeta y la primera coma
    desc = desc.replace(/(•\s*)([^,]+?),/g, (_, p1, p2) => {
      return `${p1}<strong>${p2.trim()}</strong>,`;
    });

    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(desc);
  }
}

onImageLoad() {
  this.imageLoaded = true;
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
