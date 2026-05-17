import { Component, inject, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    DrawerModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  isVisible = signal(false);
  navigationOptions: SidebarNavigationItem[];
  private _router = inject(Router);
  private _auth = inject(AuthService);

  constructor() {
    this.navigationOptions = [
      { title: 'Inicio', navigateTo: '/home' },
      { title: 'Acerca de', navigateTo: '/about' },
    ]
  }

  handleLogout(): void {
    this._auth.logout();
    this._router.navigate(['login'], { replaceUrl: true });
  }

  get username(): string {
    return this._auth.username;
  }
}

interface SidebarNavigationItem {
  title: string,
  navigateTo: string
}