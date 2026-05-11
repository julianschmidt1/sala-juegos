import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../core/supabase/supabase';
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
export class HomeComponent implements OnInit {
  private _auth = inject(AuthService);

  async ngOnInit() {

    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    console.log(error);
  }

  get username(): string {
    return this._auth.username;
  }
}
