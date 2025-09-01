import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, signOut, User, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private auth: Auth = inject(Auth);

  async signInWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
