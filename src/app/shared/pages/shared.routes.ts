import { Routes } from '@angular/router';

export default [
  // Home
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.default),
    title: 'Marilo\'s Bakery - Repostería en Almuñécar'

  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.default),
    title: 'Política de Privacidad - Marilo\'s Bakery'
  },
] as Routes;