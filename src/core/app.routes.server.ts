import { RenderMode, ServerRoute } from '@angular/ssr';

const langs = ['es', 'en'];

export const serverRoutes: ServerRoute[] = [
{
  path: '',
  renderMode: RenderMode.Prerender
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

  // About > privacy-policy
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

  // Detalle de producto (slugs)
  {
    path: ':lang/reposteria/:slug',
    renderMode: RenderMode.Client,
  },

  // Admin
  {
    path: ':lang/admin',
    renderMode: RenderMode.Client,
  },

  // User
  {
    path: ':lang/user',
    renderMode: RenderMode.Client,
  },

  // 404
  {
    path: ':lang/404',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map(lang => ({ lang }))
  },

  // Wildcard (opcional)
  {
    path: ':lang/**',
    renderMode: RenderMode.Client,
  }
];