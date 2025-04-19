import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import GLPK from 'glpk.js';
import {NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report5Component} from './report5/report5.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-optimum5',
  templateUrl: './optimum5.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    Report5Component,
    MatDialogModule,
    NgIf
  ],
  styleUrls: ['./optimum5.component.css']
})
export class Optimum5Component implements OnInit{optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              private readonly router: Router,
              public dialog: MatDialog,) {
    this.optimaForm = this.fb.group({
      initialStock: [1000, [Validators.required, Validators.min(0)]],
      productionCapacity: [5000, [Validators.required, Validators.min(0)]],
      adjustmentUpCost: [1000, [Validators.required, Validators.min(0)]],
      adjustmentDownCost: [500, [Validators.required, Validators.min(0)]],
      maxStorage: [5000, [Validators.required, Validators.min(0)]],
      demandForecast: this.fb.array([])  // FormArray initialisé
    });

    // Ajouter au moins un mois par défaut
    this.addMonth();
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

// Getter pour récupérer le FormArray
  get demandControls(): FormArray {
    return this.optimaForm.get('demandForecast') as FormArray;
  }

// Ajout d'un mois (FormGroup) dans le FormArray
  addMonth(): void {
    const monthForm = this.fb.group({
      month: ['', Validators.required],
      demand: [0, [Validators.required, Validators.min(0)]]
    });

    this.demandControls.push(monthForm);  // Ajout au FormArray
  }



  onSubmit(): void {
    if (this.optimaForm.valid) {
      const payload = {
        demandForecast: this.demandControls.value.map((item: any) => item.demand),
        initialStock: this.optimaForm.value.initialStock,
        productionCapacity: this.optimaForm.value.productionCapacity,
        adjustmentUpCost: this.optimaForm.value.adjustmentUpCost,
        adjustmentDownCost: this.optimaForm.value.adjustmentDownCost,
        maxStorage: this.optimaForm.value.maxStorage
      };

      this.optimaService.calculateOptimum5(payload).subscribe({
        next: (response) => {
          this.reportData = {
            introduction: "L'algorithme Optima 5 optimise la gestion de production mensuelle.",
            forecast: this.demandControls.value,
            productionPlan: response.productionPlan,
            totalCost: response.totalCost,
            initialStock: this.optimaForm.value.initialStock,
            productionCapacity: this.optimaForm.value.productionCapacity,
            adjustmentUpCost: this.optimaForm.value.adjustmentUpCost,
            adjustmentDownCost: this.optimaForm.value.adjustmentDownCost,
            maxStorage: this.optimaForm.value.maxStorage,
            analysis: "L'ajustement de production a permis de minimiser les coûts tout en maintenant un stock suffisant.",
            conclusion: "Ce rapport met en lumière l'importance de lisser la production pour éviter des coûts excessifs."
          };
        },
        error: (err) => {
          console.error('Erreur lors du calcul :', err);
        }
      });
    }
  }

  castToFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
}

interface DemandEntry {
  month: string;
  demand: number;
}
