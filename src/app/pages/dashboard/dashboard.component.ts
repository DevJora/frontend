import { Component } from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  modules = [
    { id: 1, name: 'Module 1' },
    { id: 2, name: 'Module 2' },
    { id: 3, name: 'Module 3' },
  ];

}
