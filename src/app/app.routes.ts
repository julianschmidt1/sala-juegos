import { Routes } from '@angular/router';

export const routes: Routes = [
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
      import('./pages/login/register')
        .then(m => m.RegisterComponent)
  },
  // Privadas
  {
    path: '',
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
    ]
  },
  // Default
  {
    path: '**',
    redirectTo: 'login'
  }
];