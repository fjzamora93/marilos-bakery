import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient, withInterceptors, withFetch, HttpInterceptorFn } from '@angular/common/http';

import { routes } from '../core/app.routes';
import { environment } from '../environments/environment';
// import { provideTranslate } from '../core/translate-config'; // 🔧 SOLUCIÓN: Comentar temporalmente

// Crear un interceptor de autenticación básico
const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Agregar lógica de autenticación aquí si es necesario
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), // SISTEMA DE RUTAS DEL CLIENTE
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // provideTranslate(), // 🔧 SOLUCIÓN: Comentar temporalmente
  ],
};
