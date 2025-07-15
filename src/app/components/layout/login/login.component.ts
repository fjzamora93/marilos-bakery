import { Component, Inject } from '@angular/core';
import { getApp } from '@angular/fire/app';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';

declare var bootstrap: any;



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  providers: [AuthService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private modalInstance: any;

  constructor(@Inject(AuthService) private authService: AuthService) {
    console.log('LoginComponent instantiated');
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('loginModal');
    this.modalInstance = new bootstrap.Modal(modalElement);
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

  async onLogin() {
    if (this.email && this.password) {
      // Aquí va tu lógica de login
      console.log('Login attempt:', this.email, this.password);
      const app = getApp(); 
      
      console.log('Firebase App initialized:', app.name);
      const user = await this.authService.login(this.email, this.password);
      console.log('Login successful:', user);
      
      // Cerrar modal después del login exitoso
      this.closeModal();
      
      // Limpiar formulario
      this.email = '';
      this.password = '';
    }
  }
}