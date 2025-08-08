import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [LogoComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
