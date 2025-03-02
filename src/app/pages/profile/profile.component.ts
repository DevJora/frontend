import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {UserDTO} from '../../DTOs/userDTO';
import {DatePipe, LowerCasePipe} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    LowerCasePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private readonly userService: UserService, private readonly  notificaitonService: NotificationService) {
  }
  user!: UserDTO;
  calculs = 0;
  logins = 0;

  ngOnInit() {

    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (!user) {
      console.warn('Aucun utilisateur trouvé, redirection vers login...');
      //this.router.navigate(['/login']);
    }


    this.getProfile(user.id);



  }

  getProfile(id: number){
    this.userService.getUserInfo(id).subscribe(
      (data) => {
        this.user = data;

        for(let i = 0; i < this.user.logs.length; i++){
          if(this.user.logs[i].log == "LOGIN") this.logins++;
          else this.calculs++;
        }
      },
      (error)=>{this.notificaitonService.showError('Erreur du serveur: problème de récupération du profil.')}
    )
  }

  /*updateProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Profil mis à jour avec succès !');
  }*/
  updateProfile() {

  }
}
