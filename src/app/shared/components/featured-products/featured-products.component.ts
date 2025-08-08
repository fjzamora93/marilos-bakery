import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from './feature-card/feature-card.component';

interface FeatureCardData {
  image: string;
  color: string;
  title: string;
  body: string;
  badge: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {
  
}