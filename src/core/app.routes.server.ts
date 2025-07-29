import { RenderMode, ServerRoute } from '@angular/ssr';

const langs = ['es', 'en'];

export const serverRoutes: ServerRoute[] = [
  // Ruta raíz - redirige al prerender de los idiomas
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  // Home
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map(lang => ({ lang }))
  },

  // About
  {
    path: ':lang/about',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map(lang => ({ lang }))
  },

  // About > privacy-policy (client-side)
  {
    path: ':lang/about/privacy-policy',
    renderMode: RenderMode.Client,
  },

  // Lista de productos
  {
    path: ':lang/reposteria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map(lang => ({ lang }))
  },

  // Detalle de producto (slugs) - client-side
  {
    path: ':lang/reposteria/:slug',
    renderMode: RenderMode.Client,
  },

  // Admin - client-side
  {
    path: ':lang/admin',
    renderMode: RenderMode.Client,
  },

  // User - client-side
  {
    path: ':lang/user',
    renderMode: RenderMode.Client,
  },

  // 404 - client-side
  {
    path: ':lang/404',
    renderMode: RenderMode.Client,
  },

  // Wildcard - client-side
  {
    path: ':lang/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];