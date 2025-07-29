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
  featuredCards: FeatureCardData[] = [
    {
      image: 'img/cakes/cake_carrot.png',
      color: 'accent-strawberry',
      title: 'Tartas Caseras',
      body: 'Desde clásicos bizcochos hasta tartas innovadoras. Perfectas para celebraciones especiales y momentos únicos.',
      badge: 'popular',
      icon: 'cake',
      url: 'reposteria?category=tartas'
    },
    {
      image: 'img/cookies/cookies.jpg',
      color: 'accent-honey',
      title: 'Mesas dulces',
      body: 'Deliciosas combinaciones de sabores y texturas. Una combinación de dulces perfectas para acompañar todo tipo de eventos.',
      badge: 'a bocaditos',
      icon: 'star',
      url: '/reposteria?category=dulces'

    },
    {
      image: '/img/glutenfree/cake_cheese.jpg',
      color: 'accent-caramel',
      title: 'Innovaciones de la casa',
      body: 'Porque también nos gusta salirnos del modelo y probar nuevas experiencias. Atrévete a probar nuestras creaciones más atrevidas.',
      badge: 'experimental',
      icon: 'cookie',
      url: '/reposteria?category=experimental'

    }
  ];
}