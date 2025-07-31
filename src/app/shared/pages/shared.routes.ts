import { Routes } from '@angular/router';

export default [
  // Home
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.default),
    title: 'Momentos dulces de Mariló - Repostería en Almuñécar'

  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.default),
    title: 'Política de Privacidad'
  },
] as Routes;