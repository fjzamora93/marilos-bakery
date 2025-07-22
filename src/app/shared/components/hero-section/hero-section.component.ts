import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingButtonComponent } from "../floating-button/floating-button.component";
import { LogoComponent } from "../logo/logo.component";

@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [TranslateModule, FloatingButtonComponent, LogoComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
