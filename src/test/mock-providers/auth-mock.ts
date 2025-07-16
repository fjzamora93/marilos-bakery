import { Auth } from "@angular/fire/auth";
import { of } from "rxjs";

const authMock = {
  // Puedes definir métodos que tu servicio realmente use
  currentUser: of(null),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
};

export const provideAuthMock = {
  provide: Auth,
  useValue: authMock,
};