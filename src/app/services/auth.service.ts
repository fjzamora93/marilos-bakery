import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getApp } from '@angular/fire/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private authInitialized = false;
  private initializationPromise: Promise<void>;

  constructor(private auth: Auth) {
    this.initializationPromise = this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      const app = getApp();
      console.log('AuthService initialized with Firebase App:', app.name);
      
      return new Promise<void>((resolve) => {
        // Escuchar cambios en el estado de autenticación
        onAuthStateChanged(this.auth, (user) => {
          console.log('Auth state changed:', user);
          this.currentUserSubject.next(user);
          if (!this.authInitialized) {
            this.authInitialized = true;
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Firebase not initialized in AuthService:', error);
      this.authInitialized = true;
      throw error;
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

  // Verificar si la autenticación ya se inicializó
  get isAuthInitialized(): boolean {
    return this.authInitialized;
  }

  // Esperar a que la autenticación se inicialice
  async waitForAuthInitialization(): Promise<void> {
    return this.initializationPromise;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const app = getApp(); // Ensure Firebase is initialized
      console.log('Using Firebase App:', app.name);
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User authenticated:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }


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


}