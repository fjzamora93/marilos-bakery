import { RenderMode, ServerRoute } from '@angular/ssr';

// Rutas del lado del SERVIDOR. Se llama desde "app.config.server.ts"
export const serverRoutes: ServerRoute[] = [
  
  // Ruta para productos individuales (debe coincidir con la ruta del cliente)
  {
    path: 'reposteria/:slug',
    renderMode: RenderMode.Prerender
  },
  
  // Ruta para lista de productos
  {
    path: 'reposteria',
    renderMode: RenderMode.Prerender
  },

  // Ruta home
  {
    path: '',
    renderMode: RenderMode.Prerender
  },

  // Ruta about
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },

  // Rutas de admin - Client Side Rendering
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },

  // Rutas de user - Client Side Rendering  
  {
    path: 'user/**',
    renderMode: RenderMode.Client
  },

  // Ruta 404
  {
    path: '404',
    renderMode: RenderMode.Prerender
  },
  
  // Todas las demás rutas se prerenderizarán (esto ya no incluirá admin ni user)
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];