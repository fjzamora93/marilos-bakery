import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap, catchError, throwError, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Lista de URLs que requieren autenticación
  const protectedUrls = [
    'https://stopmultas-test.up.railway.app/api',
    // Añade más URLs si es necesario
  ];

  // Verificar si la URL requiere autenticación
  const isProtectedUrl = protectedUrls.some(url => req.url.startsWith(url));
  
  if (!isProtectedUrl) {
    return next(req);
  }

  // Si no hay usuario autenticado, continuar sin token
  if (!authService.isAuthenticated || !authService.currentUser) {
    console.warn('Petición a URL protegida sin usuario autenticado:', req.url);
    return next(req);
  }

  // Obtener el token de Firebase
  return from(authService.getIdToken()).pipe(
    switchMap(token => {
      if (!token) {
        console.warn('No se pudo obtener token para la petición:', req.url);
        return next(req);
      }

      // Clonar la petición y añadir headers
      const authReq = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      });

      console.log('Token añadido a la petición:', req.url);
      return next(authReq);
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error en interceptor de autenticación:', error);
      
      // Si es error 401, intentar refrescar token
      if (error.status === 401) {
        console.log('Token expirado, intentando refrescar...');
        return from(authService.getIdTokenForced()).pipe(
          switchMap(newToken => {
            if (!newToken) {
              console.error('No se pudo refrescar el token');
              return throwError(() => error);
            }

            // Reintentar petición con nuevo token
            const retryReq = req.clone({
              headers: req.headers
                .set('Authorization', `Bearer ${newToken}`)
                .set('Content-Type', 'application/json')
            });

            console.log('Reintentando petición con nuevo token');
            return next(retryReq);
          }),
          catchError(() => {
            console.error('Error refrescando token');
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};