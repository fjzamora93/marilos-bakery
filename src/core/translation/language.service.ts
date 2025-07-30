import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private supportedLanguages = ['es', 'en'];
  private defaultLanguage = 'es';


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  detectBrowserLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const lang = navigator.language.slice(0, 2).toLowerCase();
      return this.supportedLanguages.includes(lang) ? lang : this.defaultLanguage;
    }
    return this.defaultLanguage;
  }

  getPreferredLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('preferred-language') || this.detectBrowserLanguage();
    }
    return this.defaultLanguage;
  }

  setPreferredLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('preferred-language', lang);
    }
  }

  getCurrentLanguageFromUrl(path: string): string {
    const segment = path.split('/')[1];
    return this.supportedLanguages.includes(segment) ? segment : this.defaultLanguage;
  }
}
