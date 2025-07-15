import { Routes } from '@angular/router';

export default [


  // Panel de administración
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: 'Panel de administración'
  },
  
  
  // Detalle del perfil
  {
    path: 'profile/:id',
    loadComponent: () => import('./pages/profile/profile.component'),
    title: 'Perfil de administrador'
  },
  

] as Routes;