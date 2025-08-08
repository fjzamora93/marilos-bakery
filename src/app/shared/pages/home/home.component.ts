import { Component, inject, OnInit } from '@angular/core';
import { APP_NAME } from '@app/shared/constants/app.constants';
import { HeroSectionComponent } from "@app/shared/components/hero-section/hero-section.component";
import { FeaturedProductsComponent } from "@app/shared/components/featured-products/featured-products.component";
import { AboutSectionComponent } from "@app/shared/components/about-section/about-section.component";
import { FloatingButtonComponent } from "@app/shared/components/floating-button/floating-button.component";
import { Product } from '@app/shared/models/product';
import { ProductsService } from '@app/shared/services/products.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    FeaturedProductsComponent,
    AboutSectionComponent,
    FloatingButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);

  products: Product[] = [];
  randomProduct: Product | null = null;

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.randomProduct = this.getRandomProduct();
    });
    
  }

  private getRandomProduct(): Product | null {
    if (this.products.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.products.length);
    console.log('Random Index:', this.products[randomIndex].imageUrl);
    return this.products[randomIndex];
  }
}
