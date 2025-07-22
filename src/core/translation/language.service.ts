import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('es');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeLanguage();
  }

  private initializeLanguage() {
    let savedLanguage = 'es'; // Idioma por defecto
    
    // Solo acceder a localStorage si estamos en el browser
    if (isPlatformBrowser(this.platformId)) {
      savedLanguage = localStorage.getItem('preferred-language') || 'es';
    }
    
    this.translate.setDefaultLang('es');
    this.translate.use(savedLanguage);
    this.currentLanguageSubject.next(savedLanguage);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguageSubject.next(language);
    
    // Solo guardar en localStorage si estamos en el browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('preferred-language', language);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}