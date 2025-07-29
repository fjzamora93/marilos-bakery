import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Home
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  // About
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  // About > privacy-policy (client-side)
  {
    path: 'about/privacy-policy',
    renderMode: RenderMode.Client,
  },
  // Lista de productos
  {
    path: 'reposteria',
    renderMode: RenderMode.Prerender,
  },
  // Detalle de producto (slugs) - client-side
  {
    path: 'reposteria/:slug',
    renderMode: RenderMode.Client,
  },
  // Admin - client-side
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  // User - client-side
  {
    path: 'user',
    renderMode: RenderMode.Client,
  },
  // 404 - client-side
  {
    path: '404',
    renderMode: RenderMode.Client,
  },
  // Wildcard - client-side
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];