import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_NAME } from '@app/shared/constants/app.constants';

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {
  
  appName = APP_NAME;
  welcomeMessage = 'Cargando...'; // Fallback text
  
  constructor(private translate: TranslateService) {}
  
  ngOnInit() {
    console.log('🔧 HomeComponent OnInit');
    console.log('🔧 TranslateService:', this.translate);
    
    // Configurar idioma
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    
    // 🔧 VERIFICAR: Que las traducciones se cargan
    this.translate.get('HOME.WELCOME_MESSAGE').subscribe(
      (translation: string) => {
        console.log('🔧 Translation loaded:', translation);
        this.welcomeMessage = translation;
      },
      (error) => {
        console.error('🔧 Translation error:', error);
        this.welcomeMessage = 'Error al cargar traducción';
      }
    );
  }
  
  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.translate.get('HOME.WELCOME_MESSAGE').subscribe(
      (translation: string) => {
        this.welcomeMessage = translation;
      }
    );
  }
}