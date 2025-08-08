import { Routes } from '@angular/router';

export default [
  // Home
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.default),
    title: 'Momentos dulces de Mariló - Repostería en Almuñécar'

  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.default),
    title: 'Política de Privacidad'
  },
  
    // Lista de productos
  {
    path: 'reposteria',
    loadComponent: () => import('./pages/products/products.component'),
    title: 'Productos - Repostería Casera'
  },
  
  
  // Detalle de producto - DEBE COINCIDIR CON SERVER ROUTES
  {
    path: 'reposteria/:slug',
    loadComponent: () => import('./pages/product/product.component'),
    title: 'Pasteries - Tus dulces favoritos'
  },
] as Routes;