import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        const newUser = {
          uid: result.user.uid,
          email: result.user.email

        };
        await this.afs.collection('usuarios').doc(result.user.uid).set(newUser);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigateByUrl('/menu');
      return result;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      throw error;
    }
  }

  // Puedes añadir más métodos según lo que necesites, como reset de contraseña, etc.
}
