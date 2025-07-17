import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private authInitialized = false;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    try {
      // Escuchar cambios en el estado de autenticación
      onAuthStateChanged(this.auth, (user) => {
        console.log('Auth state changed:', user);
        this.currentUserSubject.next(user);
        if (!this.authInitialized) {
          this.authInitialized = true;
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  // Getter para obtener el usuario actual sincrónicamente
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  // Verificar si la autenticación está inicializada
  get isAuthInitialized(): boolean {
    return this.authInitialized;
  }

  // Método de login
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User authenticated:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // Método de logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User logged out successfully');
      // El usuario se limpiará automáticamente a través de onAuthStateChanged
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('Usuario logueado:', result.user);
    } catch (err) {
      console.error('Error en login con Google:', err);
    }
  }

  // Método para obtener el token JWT de Firebase
  async getIdToken(): Promise<string | null> {
    try {
      if (!this.currentUser) {
        return null;
      }
      return await this.currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }

  // Método para obtener el token JWT forzando refresh
  async getIdTokenForced(): Promise<string | null> {
    try {
      if (!this.currentUser) {
        return null;
      }
      return await this.currentUser.getIdToken(true); // force refresh
    } catch (error) {
      console.error('Error getting fresh ID token:', error);
      return null;
    }
  }

  // Esperar a que la autenticación se inicialice
  async waitForAuthInitialization(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.authInitialized) {
        resolve();
      } else {
        // Escuchar el primer cambio de estado
        const subscription = this.currentUser$.subscribe(() => {
          if (this.authInitialized) {
            subscription.unsubscribe();
            resolve();
          }
        });
      }
    });
  }
}