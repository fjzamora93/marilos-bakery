import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isGridView: boolean = true; 
  currentLang: string;
  imageLoaded: boolean = false;


   constructor(private router: Router, private route: ActivatedRoute) {
    this.currentLang = this.route.snapshot.paramMap.get('lang') || 'es';
  }

  onImageLoad() {
    this.imageLoaded = true;
  }


  // Navegar al detalle del producto
   goToProductDetail() {
    var url: string[];
    if (environment.production) {
      url = ['/', this.currentLang, 'reposteria', this.product.slug];
    } else {
      url = ['reposteria', this.product.slug];
    }
    this.router.navigate(url, { relativeTo: null });
  }
}