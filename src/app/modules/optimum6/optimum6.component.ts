import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../services/optima-request.service';
import {Report6Component} from './report6/report6.component';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-optimum6',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    Report6Component
  ],
  templateUrl: './optimum6.component.html',
  standalone: true,
  styleUrl: './optimum6.component.css'
})
export class Optimum6Component implements OnInit {
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              public dialog: MatDialog,
              private readonly router: Router
  ) {
    this.optimaForm = this.fb.group({
      production: this.fb.array([]),
      demand: this.fb.array([]),
      transportCost: this.fb.array([])
    });

    this.addProduction();
    this.addDemand();
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



  get productionControls(): FormArray {
    return this.optimaForm.get('production') as FormArray;
  }

  get demandControls(): FormArray {
    return this.optimaForm.get('demand') as FormArray;
  }

  get transportCost(): FormArray {
    return this.optimaForm.get('transportCost') as FormArray;
  }

  addProduction(): void {
    this.productionControls.push(this.fb.control(0, Validators.required));
    this.updateCostMatrix();
  }

  addDemand(): void {
    this.demandControls.push(this.fb.control(0, Validators.required));
    this.updateCostMatrix();
  }

  updateCostMatrix(): void {
    const numUsines = this.productionControls.length;
    const numEntrepots = this.demandControls.length;

    this.transportCost.clear();

    for (let i = 0; i < numUsines; i++) {
      const row = this.fb.group({});
      for (let j = 0; j < numEntrepots; j++) {
        row.addControl(`${j}`, this.fb.control(0, Validators.required));
      }
      this.transportCost.push(row);
    }
  }

  getControlKeys(row: AbstractControl): string[] {
    return Object.keys((row as FormGroup).controls);
  }

  onSubmit(): void {
    const payload = {
      production: this.productionControls.value,
      demand: this.demandControls.value,
      transportCost: this.transportCost.value
    };

    this.optimaService.calculateOptimum6(payload).subscribe({
      next: (response) => {
        this.reportData = response;
      },
      error: (err) => {
        console.error('Erreur lors du calcul :', err);
      }
    });
  }
}
