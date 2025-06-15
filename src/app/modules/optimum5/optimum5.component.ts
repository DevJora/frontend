import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import GLPK from 'glpk.js';
import {NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report5Component} from './report5/report5.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

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
  algo= "Optima 5";
  currencySelected!: string;
  productName= '';

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              private readonly router: Router,
              private readonly notificationService: NotificationService,
              public dialog: MatDialog,) {
    this.optimaForm = this.fb.group({
      initialStock: [1000, [Validators.required, Validators.min(0)]],
      currency: ['EUR', Validators.required],
      product: ['', Validators.required],
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
      this.router.navigate(['/login']);
      console.warn('Aucun utilisateur trouvé, redirection vers login...');

    }

    if(user.subscription == "FREEMIUM"){
      if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo) && user.subscription == "PREMIUM")
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
    this.productName = this.optimaForm.get('product')?.value;
    this.currencySelected = this.optimaForm.get("currency")?.value;
    if (this.optimaForm.valid) {
      // Dictionnaire mois => index
      const monthMap: { [key: string]: number } = {
        "Janvier": 1,
        "Février": 2,
        "Mars": 3,
        "Avril": 4,
        "Mai": 5,
        "Juin": 6,
        "Juillet": 7,
        "Août": 8,
        "Septembre": 9,
        "Octobre": 10,
        "Novembre": 11,
        "Décembre": 12
      };

      const forecastMap: { [key: number]: number } = {};
      this.demandControls.value.forEach((item: any) => {
        const monthNumber = monthMap[item.month];
        if (monthNumber && item.demand >= 0) {
          forecastMap[monthNumber] = item.demand;
        }
      });

      const payload = {
        forecast: forecastMap,
        initialStock: this.optimaForm.value.initialStock,
        initialProduction: this.optimaForm.value.productionCapacity,
        maxStock: this.optimaForm.value.maxStorage
      };

      this.optimaService.calculateOptimum5(payload).subscribe({
        next: (response) => {
          this.notificationService.showSuccess("Optima 5 généré.");
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
            warnings: response.warnings,
            analysis: "L'ajustement de production a permis de minimiser les coûts tout en maintenant un stock suffisant.",
            conclusion: "Ce rapport met en lumière l'importance de lisser la production pour éviter des coûts excessifs."
          };
        },
        error: (err) => {
          console.error('Erreur lors du calcul :', err);
        }
      });
    } else {
      this.notificationService.showError("Veuillez remplir tous les champs.");
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
