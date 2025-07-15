import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { getApp } from '@angular/fire/app';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

declare var bootstrap: any;



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [AuthService]
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  private modalInstance: any;
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
    // Solo ejecutar en el navegador
    if (this.isBrowser) {
      const modalElement = this.document.getElementById('loginModal');
      if (modalElement && typeof bootstrap !== 'undefined') {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
    }
  }

  openModal() {
    if (this.isBrowser && this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.isBrowser && this.modalInstance) {
      this.modalInstance.hide();
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
        this.email = '';
        this.password = '';
      } catch (error) {
        console.error('Error en login:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    }
  }
}