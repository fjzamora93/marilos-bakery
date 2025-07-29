import { Component } from '@angular/core';
import { FloatingButtonComponent } from "../floating-button/floating-button.component";
import { LogoComponent } from "../logo/logo.component";
@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [FloatingButtonComponent, LogoComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
