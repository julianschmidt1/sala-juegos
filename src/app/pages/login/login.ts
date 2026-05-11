import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    RouterLink,
  ],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  loading = signal(false);

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required
    ]]
  });

  async handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {

      this.loading.set(true);
      const formValue = this.loginForm.getRawValue();
      console.log('logeando');
      
      await this.authService.login(
        formValue.email!,
        formValue.password!
      );
      console.log('logeo');

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Inicio de sesión exitoso'
      });

      console.log('login!!');
      
      await this.router.navigate(['/home']);

    } catch (error: any) {
      let message = error.message;

      if (
        message.includes('Invalid login credentials')
      ) {
        message = 'Correo o contraseña incorrectos';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error de inicio de sesión',
        detail: message
      });

    } finally {
      this.loading.set(false);
    }
  }

  fillQuickAccess(email: string, password: string) {
    this.loginForm.patchValue({
      email,
      password
    });
  }
}