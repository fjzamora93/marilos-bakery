import { Routes } from '@angular/router';

export default [


  // Home
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
    title: 'Home'
  },

   {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component'),
    title: 'Política de Privacidad - Mi Tienda'
  },
  
  
] as Routes;