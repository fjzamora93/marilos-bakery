import { Routes } from '@angular/router';
import { adminGuard, privateGuard, publicGuard } from './auth.guard';


// Rutas del lado del cliente. Se llama desde "app.config.ts"

export const routes: Routes = [
  // Rutas públicas con Layout
  {
    path: '',
    loadComponent: () => import('../app/layout/layout.component'),
    loadChildren: () => import('../app/pages/public.routes'),
  },
  
  //// Rutas de administración SIN Layout (opcional)
  // {
  //   path: 'admin',
  //   canActivateChild: [adminGuard],
  //   loadChildren: () => import('../app/pages/admin.routes'),
  // },
  
  // // Rutas privadas con Layout diferente (opcional)
  // {
  //   path: 'dashboard',
  //   canActivateChild: [privateGuard],
  //   loadComponent: () => import('../app/components/layout/dashboard-layout.component'),
  //   loadChildren: () => import('../app/pages/private.routes'),
  // },
  
  // // Ruta de error 404
  // {
  //   path: '404',
  //   loadComponent: () => import('../app/pages/not-found/not-found.component'),
  // },
  
  // Redirección por defecto
  {
    path: '**',
    redirectTo: '/productos'
  }
];