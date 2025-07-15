import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'seo-project';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Mi Aplicación Angular con SEO',
      description: 'Aplicación Angular optimizada para SEO con Server-Side Rendering',
      keywords: 'Angular, SEO, SSR, TypeScript, JavaScript',
      author: 'Tu Nombre',
      type: 'website',
      url: 'https://tu-dominio.com'
    });
  }
}
