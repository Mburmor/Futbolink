import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<any>(null);
  public currentUser = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async loginWithGoogle() {
    try {
      const result = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      const user = result.user;

      if (user) {
        const newUser = {
          email: user.email,
          nombre: user.displayName?.split(' ')[0] || '',
          apellidos: user.displayName?.split(' ').slice(1).join(' ') || '',
          edad: '',
          uid: user.uid
        };

        await this.firestore.collection('users').doc(user.uid).set(newUser, { merge: true });
        this.userSubject.next(newUser); // Actualiza el BehaviorSubject con el usuario actual
        this.router.navigate(['/menu']);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión con Google', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const userDoc = await this.firestore.collection('users').doc(result.user?.uid).ref.get();
      const userData = userDoc.data();
      this.userSubject.next(userData); // Actualiza el BehaviorSubject con el usuario actual
      this.router.navigate(['/menu']);
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.userSubject.next(null); // Resetea el BehaviorSubject
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error en el cierre de sesión', error);
    }
  }

  getCurrentUserId(): string {
    return this.userSubject.value?.uid || 'default-user-id';
  }

  getCurrentUserName(): string {
    const user = this.userSubject.value;
    return user ? `${user.nombre} ${user.apellidos}` : 'Usuario';
  }
}
