import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  getCurrentUser() {
    // Dependiendo del sistema de autenticación que estés utilizando, 
    // esta función devolvería los detalles del usuario actual.
    // Por ejemplo, si estás utilizando Firebase Authentication, sería algo así:
    return firebase.auth().currentUser;
  }

  // Una función para obtener el ID del usuario actual.
  getCurrentUserId(): string {
    const user = this.getCurrentUser();
    return user ? user.uid : 'anonymous'; // O retorna null si prefieres manejar usuarios no autenticados de esa manera
  }

  // O una función para obtener el nombre del usuario actual.
  getCurrentUserName(): string {
    const user = this.getCurrentUser();
    return user ? user.displayName || 'Guest' : 'Guest';
  }
  
  }
