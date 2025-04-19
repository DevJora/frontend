import { Component } from '@angular/core';

import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
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
