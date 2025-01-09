import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  mouseHove(){
    this.isMenuOpen = true;
  }

  /**
   * quand la souris quitte l'élément
   */
  mouseLeave(){
    this.isMenuOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {

  }

  goToSettings() {

  }

  goToProfile() {

  }
}
