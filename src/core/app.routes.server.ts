import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Ruta para productos individuales (debe coincidir con la ruta del cliente)
  {
    path: 'producto/:slug',
    renderMode: RenderMode.Server
  },
  
  // Ruta para lista de productos
  {
    path: 'productos',
    renderMode: RenderMode.Server
  },
  
  // Ruta home
  {
    path: '',
    renderMode: RenderMode.Server
  },
  
  // Todas las demás rutas se prerenderizarán
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];