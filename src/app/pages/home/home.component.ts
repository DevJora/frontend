import { Component } from '@angular/core';
<<<<<<< Updated upstream
import {RouterLink, RouterOutlet, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,
    RouterLink],
=======
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
>>>>>>> Stashed changes
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
