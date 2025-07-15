import { Routes } from '@angular/router';

export default [
  // Ruta home (redirige a productos)
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  
  // Lista de productos
  {
    path: 'productos',
    loadComponent: () => import('./pages/products/products.component'),
    title: 'Productos - Tu Tienda Online'
  },
  
  // Detalle de producto - DEBE COINCIDIR CON SERVER ROUTES
  {
    path: 'producto/:slug',
    loadComponent: () => import('./pages/product/product.component'),
    title: 'Producto - Tu Tienda Online'
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