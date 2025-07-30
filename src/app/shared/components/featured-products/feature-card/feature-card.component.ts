import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-feature-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss'
})
export class FeatureCardComponent {
  @Input() image: string = '';
  @Input() color: string = 'accent-strawberry'; // Color por defecto
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() badge: string = '';
  @Input() icon: string = 'cake'; // Tipo de icono por defecto
  @Input() url: string = '#';
  // Getter para obtener las clases de color del badge
  get badgeColorClass(): string {
    return `bg-${this.color}`;
  }

  // Getter para obtener las clases de color del icono
  get iconColorClass(): string {
    const colorMap: { [key: string]: string } = {
      'accent-strawberry': 'from-accent-strawberry to-sweet-pink',
      'accent-honey': 'from-accent-honey to-bakery-gold',
      'accent-caramel': 'from-accent-caramel to-bakery-gold',
      'accent-chocolate': 'from-accent-chocolate to-bakery-brown',
      'accent-cherry': 'from-accent-cherry to-sweet-pink',
    };

    const gradient = colorMap[this.color] || 'from-accent-strawberry to-sweet-pink';
    return `bg-gradient-to-r ${gradient}`;
  }

  // Getter para obtener las clases de hover del borde
  get hoverBorderClass(): string {
    return `hover:border-${this.color}/50`;
  }

  // Getter para obtener el SVG del icono
  get iconSvg(): string {
    const icons: { [key: string]: string } = {
      'cake': 'M12 2C10.89 2 10 2.89 10 4V5H8C6.89 5 6 5.89 6 7V8C4.89 8 4 8.89 4 10V18C4 19.11 4.89 20 6 20H18C19.11 20 20 19.11 20 18V10C20 8.89 19.11 8 18 8V7C18 5.89 17.11 5 16 5H14V4C14 2.89 13.11 2 12 2Z',
      'star': 'M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z',
      'cookie': 'M18.06 23H5.94C5.28 23 4.74 22.46 4.74 21.8V20.74C4.74 20.08 5.28 19.54 5.94 19.54H18.06C18.72 19.54 19.26 20.08 19.26 20.74V21.8C19.26 22.46 18.72 23 18.06 23M12 17C8.69 17 6 14.31 6 11S8.69 5 12 5 18 7.69 18 11 15.31 17 12 17Z'
    };
    return icons[this.icon] || icons['cake'];
  }
}