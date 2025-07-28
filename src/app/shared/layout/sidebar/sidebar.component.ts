import { Component, Input, Output, EventEmitter, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { User } from '@angular/fire/auth';
import { LogoComponent } from "@app/shared/components/logo/logo.component";
import { MenuOption } from '@app/shared/helper/menu-option';
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from 'rxjs';
import { AuthService } from 'core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LogoComponent, MatIconModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() currentUser: User | null = null;
  @Output() closeSidebar = new EventEmitter<void>();
  
  isAdmin: boolean = false;
  private authSubscription?: Subscription;
  private isBrowser: boolean;


  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;

      this.authService.isAdmin().then(isAdmin => {
        this.isAdmin = isAdmin;
      });
    });

    if (this.isBrowser) {
      this.document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }


  ngOnDestroy() {
    // Remover event listener
    if (this.isBrowser) {
      this.document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  // Método para cerrar sidebar
  close() {
    this.closeSidebar.emit();
  }

  // Método para navegar y cerrar sidebar
  navigateAndClose(route: string) {
    if (!this.isBrowser) return;
    console.log(`Navigating to ${route}`);
    this.close();
    setTimeout(() => {
      this.router.navigateByUrl(route);
    }, 200);
  }

  // Método para cerrar al hacer clic en backdrop
  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

    menuOptions: MenuOption[] = [
    // Opciones públicas
    {
      text: 'Inicio',
      label: 'public',
      icon: 'home',
      route: '/',
      requiresAuth: false,
    },
    {
      text: 'Carta completa',
      label: 'public',
      icon: 'cake',
      route: '/reposteria',
      requiresAuth: false,
    },
    {
      text: 'Nuestros dulces',
      label: 'public',
      icon: 'cake',
      route: '/reposteria?category=tartas',
      requiresAuth: false,
    },
    {
      text: 'Repostería saludable',
      label: 'public',
      icon: 'favorite',
      route: '/reposteria?category=healthy',
      requiresAuth: false,
    },
    {
      text: 'Tartas',
      label: 'public',
      icon: 'bakery_dining',
      route: '/reposteria?category=tartas',
      requiresAuth: false,
    },
    {
      text: 'Experimentación',
      label: 'public',
      icon: 'science',
      route: '/reposteria?category=experimental',
      requiresAuth: false,
    },

    // Opción de administración (requiere autenticación)
    {
      text: 'Panel de administración',
      label: 'admin',
      icon: 'admin_panel_settings',
      route: '/admin',
      requiresAuth: false,
    },

    // Opción informativa
    {
      text: 'Política de privacidad',
      label: 'info',
      icon: 'policy',
      route: '/privacy-policy',
      requiresAuth: false,
    }
  ];

}