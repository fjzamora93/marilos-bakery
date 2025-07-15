// src/app/core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      // Manejo global de errores
      if (error.status === 401) {
        // Redirigir a login
        console.error('No autorizado');
      } else if (error.status === 500) {
        console.error('Error del servidor');
      }
      
      return throwError(() => error);
    })
  );
};