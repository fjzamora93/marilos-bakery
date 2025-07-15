import { Component, Input, Output, EventEmitter, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';

declare var bootstrap: any;

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  imports: [CommonModule, LoginComponent, MatIconModule]
})
export class TopBarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private authSubscription?: Subscription;
  currentUser: User | null = null;
  


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


   ngOnInit() {
    // Suscribirse a cambios en el estado de autenticación
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
      console.log('Current user:', this.currentUser);
    });
  }

  ngOnDestroy() {
    // Limpiar suscripción para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Método para hacer logout
  onLogout() {
    this.authService.logout();
  }

  // Getter alternativo (opcional)
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  navigateAndClose(route: string) {
    // Cerrar el offcanvas primero
    const offcanvasElement = document.getElementById('offcanvasMenu');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
    
    // Navegar después de un pequeño delay
    setTimeout(() => {
      this.router.navigate([route]);
    }, 300);
  }


}