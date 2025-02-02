import { Component } from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,
    RouterLink],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})


export class HomeComponent {
  constructor(private router: Router) {}
goToDetail(){
  this.router.navigate(['/optima']);
}
}
