import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_NAME } from '@app/shared/constants/app.constants';
import { HeroSectionComponent } from "@app/shared/components/hero-section/hero-section.component";
import { FeaturedProductsComponent } from "@app/shared/components/featured-products/featured-products.component";
import { AboutSectionComponent } from "@app/shared/components/about-section/about-section.component";
import { FloatingButtonComponent } from "@app/shared/components/floating-button/floating-button.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, HeroSectionComponent, FeaturedProductsComponent, AboutSectionComponent, FloatingButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  appName = APP_NAME;
}