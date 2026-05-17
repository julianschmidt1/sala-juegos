import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  // Publicas
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register')
        .then(m => m.RegisterComponent)
  },
  // Privadas
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/layout/layout')
        .then(m => m.Layout),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home')
            .then(m => m.HomeComponent)
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about')
            .then(m => m.AboutComponent)
      },
      {
        path: 'games',
        children: [
          {
            path: 'ahorcado',
            loadComponent: () =>
              import('./pages/games/ahorcado/ahorcado')
                .then(m => m.Ahorcado)
          },
        ]
      },
    ]
  },
  // Default
  {
    path: '**',
    redirectTo: '/login'
  }
];