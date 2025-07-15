import { Component, Input, Output, EventEmitter, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() currentUser: User | null = null;
  @Output() closeSidebar = new EventEmitter<void>();
  
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Agregar listener para cerrar con ESC
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
    
    this.close();
    
    // Navegar después de un pequeño delay para que la animación se complete
    setTimeout(() => {
      this.router.navigate([route]);
    }, 200);
  }

  // Método para cerrar al hacer clic en backdrop
  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}