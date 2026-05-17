import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private _auth = inject(AuthService);

  get username(): string {
    return this._auth.username;
  }
}
