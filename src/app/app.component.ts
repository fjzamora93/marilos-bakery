import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SeoService } from './products/services/seo.service';
import { LanguageService } from 'core/translation/language.service';
import { isPlatformBrowser } from '@angular/common';

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

      const path = window.location.pathname;
      const supportedLangs = ['es', 'en'];
      if (path === '/') {
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        const lang = supportedLangs.includes(browserLang) ? browserLang : 'es';
        this.router.navigateByUrl(`/${lang}`, { replaceUrl: true });
      }

      // Redirigir si no tiene idioma en la URL
      if (!currentPath.match(/^\/(es|en)(\/|$)/)) {
        const preferredLang = this.languageService.getPreferredLanguage();
        const newUrl = `/${preferredLang}${currentPath}`;
        this.router.navigateByUrl(newUrl, { replaceUrl: true });
        return;
      }

      // Guardar idioma actual como preferido
      this.languageService.setPreferredLanguage(hasLang);
    }

    // SEO básico (sin TranslateService)
    this.seoService.updateMetaTags({
      title: "Marilo's Bakery - Repostería artesanal en Almuñécar",
      description: 'Tartas, dulces, bizcochos y galletas caseras por encargo a partir de recetas únicas en la costa de Granada.',
      keywords: 'tartas, dulces, bizcochos, galletas, repostería, artesanal, casero',
      author: 'Marilo',
      type: 'website',
      url: 'https://marilosbakery.com'
    });
  }
}
