import { Component } from '@angular/core';
import { APP_NAME } from '@app/shared/constants/app.constants';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  
  // 🔧 SOLUCIÓN: Definir propiedades simples sin TranslateService por ahora
  HOME = {
    TITLE: 'Inicio',
    WELCOME_MESSAGE: 'Bienvenido a nuestra tienda',
    SUBTITLE: 'Los mejores productos te esperan'
  };

  appName = APP_NAME;
  
  constructor() {
    console.log('HomeComponent cargado correctamente');
  }
}
