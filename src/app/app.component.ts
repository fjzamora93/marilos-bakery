import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LanguageService } from 'core/translation/language.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentPath = window.location.pathname;
      const hasLang = this.languageService.getCurrentLanguageFromUrl(currentPath);

  

      // Solo redirige en producción
      if (environment.production) {
        if (!currentPath.match(/^\/(es|en)(\/|$)/)) {
          const preferredLang = this.languageService.getPreferredLanguage();
          const newUrl = `/${preferredLang}${currentPath}`;
          this.router.navigateByUrl(newUrl, { replaceUrl: true });
          return;
        }
      }


      // Guardar idioma actual como preferido
      this.languageService.setPreferredLanguage(hasLang);
    }

    // SEO básico (sin TranslateService)
    this.seoService.updateMetaTags({
      title: "Momentos dulces de Mariló - Repostería artesanal en Almuñécar",
      description: 'Tartas, dulces, bizcochos y galletas caseras por encargo a partir de recetas únicas en la costa de Granada.',
      keywords: 'tartas, dulces, bizcochos, galletas, repostería, artesanal, casero',
      author: 'Marilo',
      type: 'website',
      url: 'https://marilosbakery.com'
    });
  }
}
