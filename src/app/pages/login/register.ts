import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    RouterLink,
  ],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './login.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  loading = signal(false);

  registerForm = this.fb.group({
    first_name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    last_name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    age: [null, [
      Validators.required,
      Validators.min(18),
      Validators.max(99),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  async handleRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      this.loading.set(true);
      const formValue = this.registerForm.getRawValue();

      await this.authService.register({
        email: formValue.email!,
        password: formValue.password!,
        first_name: formValue.first_name!,
        last_name: formValue.last_name!,
        age: formValue.age!
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cuenta creada con exito'
      });

      await this.router.navigate(['/home']);

    } catch (error: any) {

      let message = error.message;

      if (
        message.includes('User already registered')
      ) {
        message = 'El correo ingresado no esta disponible';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message
      });

    } finally {
      this.loading.set(false);
    }
  }
}