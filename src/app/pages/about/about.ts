import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'about-screen',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  private _httpClient = inject(HttpClient);
  user = signal<GithubUser | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this._httpClient
      .get<GithubUser>('https://api.github.com/users/julianschmidt1')
      .subscribe({
        next: (data) => {
          this.user.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
          this.isLoading.set(false);
        }
      });
  }

  get currentUser() {
    return this.user();
  }
}

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
}