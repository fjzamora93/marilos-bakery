import { Routes } from '@angular/router';

export default [
  // Home
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.default),
    title: 'Home'
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.default),
    title: 'Política de Privacidad - Mi Tienda'
  },
] as Routes;