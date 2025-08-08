import { Component, Input } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { Product } from '@app/shared/models/product';
@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [LogoComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  @Input() randomProduct: Product | null = null;

}
