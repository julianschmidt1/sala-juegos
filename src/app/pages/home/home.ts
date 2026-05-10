import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../core/supabase/supabase';

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
  async ngOnInit() {
    
    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    console.log(error);
  }
}
