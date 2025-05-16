import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report7Component} from './report7/report7.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';

@Component({
  selector: 'app-optimum7',
  templateUrl: './optimum7.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    Report7Component
  ],
  styleUrls: ['./optimum7.component.css']
})
export class Optimum7Component implements OnInit{
  optimaForm: FormGroup;
  reportData: any | null = null;
  algo = "Optima 7";

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              public dialog: MatDialog,
              private readonly router: Router) {
    this.optimaForm = this.fb.group({
      processTimes: this.fb.array([])
    });

    this.addRow();  // Ajouter une première ligne par défaut
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


  get processTimes(): FormArray {
    return this.optimaForm.get('processTimes') as FormArray;
  }

  addRow(): void {
    const row = this.fb.group({
      machineA: [0, Validators.required],
      machineB: [0, Validators.required]
    });
    this.processTimes.push(row);
  }

  onSubmit(): void {
    const payload = {
      processTimes: this.processTimes.value.map((item: any) => [item.machineA, item.machineB])
    };

    this.optimaService.calculateOptimum7(payload).subscribe({
      next: (response) => {
        this.reportData = response;
      },
      error: (err) => {
        console.error('Erreur lors du calcul :', err);
      }
    });
  }

}
