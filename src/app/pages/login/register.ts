import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './login.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';

  handleRegister() {
    
  }
}
