import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: 'productos',
    component: ProductsComponent,
    title: 'Productos - Tu Tienda'
  },
  {
    path: 'producto/:slug',
    component: ProductComponent,
    title: 'Producto - Tu Tienda'
  },
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/productos'
  }
];