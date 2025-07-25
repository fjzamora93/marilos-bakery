import { Routes } from '@angular/router';

export default [
  // Ruta home directa
  {
    path: '',
    loadComponent: () => import('../shared/pages/home/home.component'),
    title: 'Home - Marilo\'s Bakery'
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
  
//   // Página de contacto
//   {
//     path: 'contacto',
//     loadComponent: () => import('./contact/contact.component'),
//     title: 'Contacto - Tu Tienda Online'
//   },
  
//   // Página "Acerca de"
//   {
//     path: 'acerca-de',
//     loadComponent: () => import('./about/about.component'),
//     title: 'Acerca de - Tu Tienda Online'
//   },
  
//   // Carrito de compras
//   {
//     path: 'carrito',
//     loadComponent: () => import('./cart/cart.component'),
//     title: 'Carrito - Tu Tienda Online'
//   }
] as Routes;