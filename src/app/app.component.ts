import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './products/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'core/translation/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'seo-project';

  constructor(
    private seoService: SeoService,
    private translate: TranslateService,
    private languageService: LanguageService

  ) {
    console.log('🚀 AppComponent constructor called');
    
    // Initialize translate service
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    
    console.log('🔧 TranslateService initialized:', this.translate);
  }

  ngOnInit(): void {
    console.log('App initialized with language:', this.languageService.getCurrentLanguage());
    this.seoService.updateMetaTags({
      title: 'Mi Aplicación Angular con SEO',
      description: 'Aplicación Angular optimizada para SEO con Server-Side Rendering',
      keywords: 'Angular, SEO, SSR, TypeScript, JavaScript',
      author: 'Tu Nombre',
      type: 'website',
      url: 'https://tu-dominio.com'
    });
  }
}
