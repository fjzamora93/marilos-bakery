import { Component, Input, Output, EventEmitter, Inject, OnInit, OnDestroy, ViewChild, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  imports: [CommonModule, LoginComponent, MatIconModule]
})
export class TopBarComponent implements OnInit, OnDestroy, AfterViewInit {

  isAuthenticated = false;
  private authSubscription?: Subscription;
  currentUser: User | null = null;
  isOffcanvasOpen = false;
  private isBrowser: boolean;

  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
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
      console.log('Current user:', this.currentUser);
    });

    // Agregar listener para cerrar offcanvas con ESC
    if (this.isBrowser) {
      this.document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
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
    
    // Remover event listener
    if (this.isBrowser) {
      this.document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOffcanvasOpen) {
      this.closeOffcanvas();
    }
  }

  // Método para abrir el modal de login
  openLoginModal() {
    if (this.loginComponent && this.isBrowser) {
      this.loginComponent.openModal();
    }
  }

  // Método para abrir/cerrar offcanvas
  toggleOffcanvas() {
    if (!this.isBrowser) return;
    
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
    
    // Prevenir scroll del body cuando offcanvas está abierto
    if (this.isOffcanvasOpen) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = 'auto';
    }
  }

  // Método para cerrar offcanvas
  closeOffcanvas() {
    if (!this.isBrowser) return;
    
    this.isOffcanvasOpen = false;
    this.document.body.style.overflow = 'auto';
  }

  // Método para navegar y cerrar offcanvas
  navigateAndClose(route: string) {
    if (!this.isBrowser) return;
    
    this.closeOffcanvas();
    
    // Navegar después de un pequeño delay para que la animación se complete
    setTimeout(() => {
      this.router.navigate([route]);
    }, 200);
  }

  // Método para hacer logout
  onLogout() {
    this.authService.logout();
    this.closeOffcanvas(); // Cerrar offcanvas al hacer logout
  }
}