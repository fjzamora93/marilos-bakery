import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map, take, filter, from } from 'rxjs';
import { AuthService } from '../app/services/auth.service';


// Protege rutas privadas para que NO sean accesibles si NO está autentificado
export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

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


// Protege rutas públicas para que NO sean accesibles si ya está autentificado
export const publicGuard : CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return from(authService.waitForAuthInitialization()).pipe(
    map(() => {
      const user = authService.currentUser;
      //console.log('Public guard evaluating user after initialization:', user);
      
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


export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return from(authService.waitForAuthInitialization()).pipe(
    map(() => {
      const user = authService.currentUser;

      if (!user) {
        console.log('User not authenticated, redirecting to home');
        router.navigateByUrl('/home');
        return false;
      }

      if (user.email !== 'admin@gmail.com') {
        console.log('User is not admin, redirecting to unauthorized page or home');
        router.navigateByUrl('/home'); // o a alguna página de acceso denegado
        return false;
      }

      console.log('User is admin, access allowed');
      return true;
    })
  );
};
