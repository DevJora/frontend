import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDTO} from '../../DTOs/userDTO';
import {NotificationService} from '../../services/notification.service';
import {NgIf} from '@angular/common';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    MatDialogModule,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user!: UserDTO;
  constructor(
    private readonly  userService: UserService,
    private readonly notificationService: NotificationService,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
  }

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
        console.log(this.user)
      },
      (error)=>{this.notificationService.showError('Erreur du serveur: problème de récupération du profil.')}
    )
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: {name: '', value : `Votre abonnement actuel ne vous permet pas d'accéder à cet algorithme.`, type: 'unauthorized'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/dashboard/home']);
    });
  }
}
