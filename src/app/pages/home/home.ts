import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { GameRoute } from '../../../models/home';

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

  private _router = inject(Router);
  public gamesList: Array<GameRoute> = [
    { name: 'Ahorcado', path: 'ahorcado', image: 'ahorcado' },
    { name: 'Mayor y Menor', path: 'mayor-menor', image: 'mayor-menor' },
    { name: 'Preguntados', path: 'preguntados', image: 'preguntados' },
    { name: 'Kitty Clicker', path: 'kitty-clicker', image: 'kitty-clicker' },
  ];

  public handleGameNavigation(path: string) {
    this._router.navigateByUrl(`games/${path}`);
  }

  get username(): string {
    return this._auth.username;
  }
}

