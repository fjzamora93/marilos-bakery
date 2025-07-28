import { Component, Input, Output, EventEmitter, Inject, OnInit, OnDestroy, ViewChild, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT, Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'core/translation/language.service';
import { LogoComponent } from "@app/shared/components/logo/logo.component";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  imports: [CommonModule, RouterModule, LoginComponent, SidebarComponent, TranslateModule, LogoComponent]

})
export class TopBarComponent implements OnInit, OnDestroy, AfterViewInit {

  isAuthenticated = false;
  private authSubscription?: Subscription;
  currentUser: User | null = null;
  isSidebarOpen = false;
  private isBrowser: boolean;
  private languageSubscription?: Subscription;
  currentLanguage = 'es';
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(
    private authService: AuthService,
    private location: Location,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Suscribirse a cambios en el estado de autenticación
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
    });

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (language) => {
        this.currentLanguage = language;
      }
    );
  }

  ngAfterViewInit() {
    // Componente inicializado
    console.log('TopBarComponent initialized');
  }

  ngOnDestroy() {
    // Limpiar suscripción para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Método para abrir el modal de login
  openLoginModal() {
    if (this.loginComponent && this.isBrowser) {
      this.loginComponent.openModal();
    }
  }

  // Método para abrir sidebar
  openSidebar() {
    if (!this.isBrowser) return;
    
    this.isSidebarOpen = true;
    
    // Prevenir scroll del body cuando sidebar está abierto
    this.document.body.style.overflow = 'hidden';
  }

  // Método para cerrar sidebar
  closeSidebar() {
    if (!this.isBrowser) return;
    
    this.isSidebarOpen = false;
    
    // Restaurar scroll del body
    this.document.body.style.overflow = 'auto';
  }

  // Método para hacer logout
  onLogout() {
    this.authService.logout();
    this.closeSidebar(); // Cerrar sidebar al hacer logout
  }

  //! DEPRECTED: USAR EL NUEVO SISTEMA DE TRADUCCIÓN Y QUITAR TODO LO RELACIONADO CON EL ANTERIOR
  changeLanguage(languageCode: string) {
    this.languageService.changeLanguage(languageCode);
  }


  localizedPath(lang: string): string {
    this.currentLanguage = lang;
    // Obtiene la ruta actual sin el prefijo de idioma
    const path = this.location.path().replace(/^\/(es|en)/, '');
    return `/${lang}${path || '/'}`;
  }
}