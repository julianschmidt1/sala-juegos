import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
}
