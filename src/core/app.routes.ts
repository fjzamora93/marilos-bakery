import { Routes } from '@angular/router';
import { adminGuard, privateGuard, publicGuard } from './auth.guard';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () => import('../app/shared/layout/layout.component').then(m => m.default),
    loadChildren: () => import('../app/products/product.routes').then(m => m.default),
  },
  // About
  {
    path: 'about',
    loadComponent: () => import('../app/shared/layout/layout.component').then(m => m.default),
    loadChildren: () => import('../app/shared/pages/shared.routes').then(m => m.default),
  },
  // Admin
  {
    path: 'admin',
    canActivateChild: [adminGuard],
    loadComponent: () => import('../app/shared/layout/layout.component').then(m => m.default),
    loadChildren: () => import('../app/admin/admin.routes').then(m => m.default),
  },
  // User
  {
    path: 'user',
    canActivateChild: [privateGuard],
    loadComponent: () => import('../app/shared/layout/layout.component').then(m => m.default),
    loadChildren: () => import('../app/user/user.routes').then(m => m.default),
  },
  // 404
  {
    path: '404',
    loadComponent: () => import('../app/shared/pages/not-found/not-found.component').then(m => m.default),
    title: 'Error:404 - Página no encontrada'
  },
  // Wildcard
  {
    path: '**',
    redirectTo: '404'
  }
];