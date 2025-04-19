import {Component, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-optimum8',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './optimum8.component.html',
  standalone: true,
  styleUrl: './optimum8.component.css'
})
export class Optimum8Component implements OnInit{
  constructor(public dialog: MatDialog,
              private readonly router: Router) {
  }

  ngOnInit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (!user) {
      console.warn('Aucun utilisateur trouvé, redirection vers login...');

    }

    if(user.subscription == "FREEMIUM"){
      this.openDialog();
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: {name: '', value : `Votre abonnement actuel ne vous permet pas d'accéder à cet algorithme.`, type: 'unauthorized-redirection'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/dashboard/home']);
    });
  }
}
