import { Routes } from '@angular/router';
import { adminGuard, privateGuard, publicGuard } from './auth.guard';


// Rutas del lado del cliente. Se llama desde "app.config.ts"

export const routes: Routes = [
  // Rutas públicas con Layout
  {
    path: '',
    loadComponent: () => import('../app/shared/layout/layout.component'),
    loadChildren: () => import('../app/products/product.routes'),
  },

   // Home
  {
    path: 'about',
    loadComponent: () => import('../app/shared/layout/layout.component'),
    loadChildren: () => import('../app/shared/pages/shared.routes'),
  },
  
  // Rutas de administración SIN Layout (opcional)
  {
    path: 'admin',
    canActivateChild: [adminGuard],
    loadComponent: () => import('../app/shared/layout/layout.component'),
    loadChildren: () => import('../app/admin/admin.routes'),
  },
  
  // Rutas privadas con Layout diferente (opcional)
  {
    path: 'user',
    canActivateChild: [privateGuard],
    loadComponent: () => import('../app/shared/layout/layout.component'),
    loadChildren: () => import('../app/user/user.routes'),
  },
  
    // Ruta de error 404 - DEBE estar fuera del layout para evitar loops
  {
    path: '404',
    loadComponent: () => import('../app/shared/pages/not-found/not-found.component'),
    title: 'Error:404 - Página no encontrada'
  },
  
  // Wildcard route - SIEMPRE debe ser la última
  {
    path: '**',
    redirectTo: '/404'
  }
];