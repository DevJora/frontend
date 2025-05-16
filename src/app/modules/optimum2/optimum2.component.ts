import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report1Component} from '../optimum1/report1/report1.component';
import {Report2Component} from './report2/report2.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentComponent } from '../../components/dialog-content/dialog-content.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-optimum2',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    Report2Component
  ],
  templateUrl: './optimum2.component.html',
  standalone: true,
  styleUrl: './optimum2.component.css'
})
export class Optimum2Component {
  optimaForm: FormGroup;
  reportData: any | null = null;
  algo= "Optima 2";
  productName = '';
  currency = '';

  constructor(
    private fb: FormBuilder,
    private optimaService: OptimaService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    public dialog: MatDialog,
  ) {
    this.optimaForm = this.fb.group({
      product: [this.productName, [Validators.required]],
      currency: ['EUR', [Validators.required]],
      storageCost: [600, [Validators.required]],
      orderCost: [40000, [Validators.required]],
      shortageCost: [20000, [Validators.required]],
      demandData: this.fb.array([this.createDemandControl()])
    });
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


  get demandControls() {
    return this.optimaForm.get('demandData') as FormArray;
  }

  addDemand() {
    this.demandControls.push(this.createDemandControl());
  }

  removeDemand(index: number) {
    if (this.demandControls.length > 1) {
      this.demandControls.removeAt(index);
    }
  }

  castToFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }


  createDemandControl() {
    return this.fb.group({
      demand: [10, [Validators.required]]  // Définir un formGroup pour chaque demande
    });
  }

  onSubmit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    this.productName = this.optimaForm.get('product')?.value;
    this.currency = this.optimaForm.get('currency')?.value;
    if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo.toUpperCase()) && user.subscription == "PREMIUM" )
      this.openDialog("Votre abonnement actuel ne vous permet d'utiliser chaque algorithme qu'une seule fois. Passez à un abonnement pour bénéficier des services Optima sans limite. ");
    else {
      if (this.optimaForm.valid) {
        const payload = {
          storageCost: this.optimaForm.value.storageCost,
          orderCost: this.optimaForm.value.orderCost,
          shortageCost: this.optimaForm.value.shortageCost,
          demandData: this.demandControls.value.map((control: any) => control.demand)
        };

        this.optimaService.calculateOptimum2(payload).subscribe({
          next: (response) => {
            this.notificationService.showSuccess("Résultat optima 2 généré.");
            this.reportData = {
              introduction: 'L\'objectif de ce rapport est de présenter une analyse des résultats obtenus par l\'algorithme Optima 2, qui calcule la fréquence optimale de commande et le niveau de stock nécessaire pour répondre à une demande incertaine tout en minimisant les coûts de stockage, de commande et de rupture de stock.',
              data: {
                storageCost: payload.storageCost,
                orderCost: payload.orderCost,
                shortageCost: payload.shortageCost
              },
              results: {
                optimalStockLevel: response.optimalStockLevel,
                optimalCycleFrequency: response.optimalCycleFrequency,
                totalCost: response.minimalCost
              },
              analysis: `L\'algorithme indique qu\'il est optimal de maintenir un stock de ${response.optimalStockLevel >= 2 ? response.optimalStockLevel + ' unités' : response.optimalStockLevel + ' unité'}  pour minimiser les coûts tout en assurant une couverture suffisante des demandes variables. Les résultats montrent qu\'une commande doit être passée environ chaque ${response.optimalCycleFrequency >= 2 ? response.optimalCycleFrequency + ' semaines' : response.optimalCycleFrequency + ' semaine'}  pour éviter des ruptures de stock. Le coût total obtenu après l\'optimisation s\'élève à ${response.minimalCost} (selon la monnaie utilisée dans le problème), ce qui inclut les coûts de stockage, de commande et de rupture de stock potentielle.`,
              conclusion: `L'algorithme Optima 2 fournit des résultats adaptés pour gérer des demandes incertaines tout en optimisant les coûts associés aux stocks et aux commandes. Il s'ajuste automatiquement aux variations de la demande et aux contraintes économiques.
            Ce rapport démontre la flexibilité et l'efficacité d'Optima 2 pour anticiper et minimiser les risques liés à la gestion des stocks dans des environnements de demande fluctuante.`
            };
          },
          error: (err) => {
            console.error('Erreur lors du calcul :', err);
          }
        });
      }
      else {
        this.notificationService.showError("Veuillez remplir tous les champs.");
      }
    }
  }


  protected readonly FormGroup = FormGroup;
}
