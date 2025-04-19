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
