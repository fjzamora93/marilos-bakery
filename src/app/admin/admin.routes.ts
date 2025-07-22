import { Routes } from '@angular/router';

export default [


  // Panel de administración
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: 'Panel de administración',
    data: { prerender: false } 
  },
  
  
  // Detalle del perfil
  {
    path: 'profile/:id',
    loadComponent: () => import('./pages/profile/profile.component'),
    title: 'Perfil de administrador',
    data: { prerender: false } 
  },
  

] as Routes;