import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {UserDTO} from '../../DTOs/userDTO';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {LoadingComponent} from '../../components/loading/loading.component';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    RouterLink,
    UpperCasePipe,
    MatDialogModule,
    DatePipe,
    NgIf,
    LoadingComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent implements OnInit{
  constructor(  public dialog: MatDialog, private readonly userService: UserService, private readonly  notificaitonService: NotificationService) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '520px',
      data: {name : `Bonjour ${this.user.username}`, value: `Vous bénéficiez actuellement d'un accès ${this.user.subscription} valable jusqu'au ${this.user.expiration.substring(0, 10)}`, type: 'welcome'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('La boîte de dialogue a été fermée');
    });
  }

  getProfile(id: number){
    this.userService.getUserInfo(id).subscribe(
       (data) => {
        this.user = data;


        for(let i = 0; i < this.user.logs.length; i++){
          if(this.user.logs[i].log == "LOGIN") this.logins++;
          else this.calculs++;
        }

        if(this.logins > 2){
          this.openDialog();
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
