import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map, take, filter, from, of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { SINGLE_ADMIN_EMAIL } from '@app/shared/constants/firebase.constants';


// Protege rutas privadas para que NO sean accesibles si NO está autentificado
export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Rutas normales de la aplicación (SSR)
  return from(authService.waitForAuthInitialization()).pipe(
    map(() => {
      const user = authService.currentUser;
      //console.log('Private guard evaluating user after initialization:', user);
      
      if (!user) {
        console.log('User not authenticated, redirecting to home');
        router.navigateByUrl('/home');
        return false;
      }
      
      console.log('User authenticated, allowing access');
      return true;
    })
  );
};

// Rutas del Admin (no deben usar SSR)

export const adminGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    // SSR: no permitas el acceso
    return of(false);
  }

  const router = inject(Router);
  const authService = inject(AuthService);
  return from(authService.waitForAuthInitialization()).pipe(
    map(() => {
      const user = authService.currentUser;
      if (!user) {
        router.navigateByUrl('/home');
        return false;
      }
      if (user.email !== SINGLE_ADMIN_EMAIL) {
        router.navigateByUrl('/home');
        return false;
      }
      return true;
    })
  );
};



// Protege rutas públicas para que NO sean accesibles si ya está autentificado
export const publicGuard : CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return from(authService.waitForAuthInitialization()).pipe(
    map(() => {
      const user = authService.currentUser;
      if (user) {
        console.log('User authenticated, redirecting to home');
        router.navigateByUrl('/home');
        return false;
      }
      
      console.log('User not authenticated, allowing access to public route');
      return true;
    })
  );
};

