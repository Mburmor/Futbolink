import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthenticationService) { }

  async onLogin() {
    this.errorMessage = '';
    try {
      const result = await this.authService.login(this.user.email, this.user.password);
      if (result) {
        console.log('Inicio de sesión exitoso', result);
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          this.errorMessage = 'La contraseña es incorrecta.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'No se encontró un usuario con este correo electrónico.';
          break;
        default:
          this.errorMessage = 'Error en el inicio de sesión. Intente nuevamente.';
          console.error('Error en el inicio de sesión', error);
      }
    }
  }
}  
