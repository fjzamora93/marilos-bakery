import { Routes } from '@angular/router';
import { adminGuard, privateGuard, publicGuard } from './auth.guard';


// Rutas del lado del cliente. Se llama desde "app.config.ts"

export const routes: Routes = [
  // Rutas públicas con Layout
  {
    path: '',
    loadComponent: () => import('../app/layout/layout.component'),
    loadChildren: () => import('../app/products/product.routes'),
  },
  
  // Rutas de administración SIN Layout (opcional)
  {
    path: 'admin',
    canActivateChild: [adminGuard],
    loadComponent: () => import('../app/layout/layout.component'),
    loadChildren: () => import('../app/admin/admin.routes'),
  },
  
  // Rutas privadas con Layout diferente (opcional)
  {
    path: 'user',
    canActivateChild: [privateGuard],
    loadComponent: () => import('../app/layout/layout.component'),
    loadChildren: () => import('../app/user/user.routes'),
  },
  
  // Ruta de error 404
  {
    path: '404',
    loadComponent: () => import('../app/layout/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  
  //Redirección por defecto
  {
    path: '**',
    redirectTo: '/productos'
  }
];