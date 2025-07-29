import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';

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


   constructor(private router: Router, private route: ActivatedRoute) {
    this.currentLang = this.route.snapshot.paramMap.get('lang') || 'es';
  }



  // Navegar al detalle del producto
   goToProductDetail() {
    const url = ['/', this.currentLang, 'reposteria', this.product.slug];
    console.log('Navegando a:', url.join('/'));
    this.router.navigate(url, { relativeTo: null });
  }
}