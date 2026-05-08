import { Component, inject, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  constructor() {
    this.navigationOptions = [
      { title: 'Inicio', navigateTo: '/home' },
      { title: 'Acerca de', navigateTo: '/about' },
    ]
  }

  handleLogout(): void {
    this._router.navigate([''], { replaceUrl: true });
  }

  get username(): string {
    return 'Usuario logeado';
  }
}

interface SidebarNavigationItem {
  title: string,
  navigateTo: string
}