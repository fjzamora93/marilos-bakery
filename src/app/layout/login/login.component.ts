import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [AuthService]
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  email: string = '';
  password: string = '';
  isModalOpen = false;
  private isBrowser: boolean;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    console.log('LoginComponent instantiated');
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Agregar listener para cerrar con ESC
      this.document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeModal();
    }
  }

  private clearForm() {
    this.email = '';
    this.password = '';
  }

  openModal() {
    if (this.isBrowser) {
      this.isModalOpen = true;
      // Prevenir scroll del body
      this.document.body.style.overflow = 'hidden';
      
      // Focus en el primer input después de que el modal se abra
      setTimeout(() => {
        const emailInput = this.document.getElementById('email') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
        }
      }, 100);
    }
  }

  closeModal() {
    if (this.isBrowser) {
      console.log('Closing modal');
      this.isModalOpen = false;
      // Restaurar scroll del body
      this.document.body.style.overflow = 'auto';
      this.clearForm();
    }
  }

  onBackdropClick(event: Event) {
    // Cerrar modal si se hace clic en el backdrop
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  async onLogin() {
    if (!this.isBrowser) {
      console.log('Login no disponible en SSR');
      return;
    }

    if (this.email && this.password) {
      try {
        console.log('Login attempt:', this.email, this.password);
        const user = await this.authService.login(this.email, this.password);
        console.log('Login successful:', user);
        
        // Cerrar modal después del login exitoso
        this.closeModal();
        
        // Limpiar formulario
        this.clearForm();
      } catch (error) {
        console.error('Error en login:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    }
  }
}