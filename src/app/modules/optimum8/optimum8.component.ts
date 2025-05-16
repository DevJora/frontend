import {Component, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OptimaService} from '../../services/optima-request.service';

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
  algo = "Optima 8";

  constructor(public dialog: MatDialog,
              private readonly router: Router,
              private readonly optimaService: OptimaService
  ) {
  }

  ngOnInit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (!user) {
      this.router.navigate(['/login']);
      console.warn('Aucun utilisateur trouvé, redirection vers login...');

    }

    if(user.subscription == "FREEMIUM"){
      if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo))
        this.openDialog("Votre abonnement actuel ne vous permet d'utiliser chaque algorithme qu'une seule fois. Passez à l'abonnement PREMIUM/ENTREPRISE pour bénéficier des service Optima sans limite. ");
    }else if (user.subscription == "PREMIUM" && !this.optimaService.verifyOptimaPermission(this.algo, user.algos)){
      this.openDialog("Votre abonnement actuel ne vous permet pas d'accéder à cet algorithme.");
    }

  }

  openDialog(message : string) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: {name: '', value : message, type: 'unauthorized-redirection'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/dashboard/home']);
    });
  }

}
