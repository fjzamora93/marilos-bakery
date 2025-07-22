import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() size: number = 20; // Tamaño por defecto (w-20 h-20)
  @Input() isNegative: boolean = false; // Logo negativo por defecto false

  // Getter para obtener las clases de tamaño dinámicamente
  get sizeClasses(): string {
    return `w-${this.size} h-${this.size}`;
  }

  // Getter para obtener el tamaño del icono (aproximadamente 55% del contenedor)
  get iconSize(): number {
    return Math.round(this.size * 0.55);
  }
}