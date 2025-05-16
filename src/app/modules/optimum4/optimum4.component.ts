import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report4Component} from './report4/report4.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-optimum4',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatDialogModule,
    Report4Component,
    CurrencyPipe
  ],
  templateUrl: './optimum4.component.html',
  standalone: true,
  styleUrl: './optimum4.component.css'
})
export class Optimum4Component implements OnInit{
  algo= "Optima 4";
  reportData: any | null = null;
  currencySelected = "EUR";

  /*optimaForm!: FormGroup;
  summary: string = ''; // Stocke le résumé à afficher

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.optimaForm = this.fb.group({
      stockQuantity: [0, [Validators.required, Validators.min(0)]], // Q
      productionCost: [0, [Validators.required, Validators.min(0)]], // c(Q)
      storageCost: [0, [Validators.required, Validators.min(0)]], // h(Q)
      fixedCost: [0, [Validators.required, Validators.min(0)]], // π
      unitCost: [0, [Validators.required, Validators.min(0)]], // cs
      interestRate: [0, [Validators.required, Validators.min(0), Validators.max(1)]], // r₀
      backlogCost: [0, [Validators.required, Validators.min(0)]], // β
      backlogFactor: [0, [Validators.required, Validators.min(0)]], // Ɛ
    });
  }

  onSubmit(): void {
    if (this.optimaForm.valid) {
      const data = this.optimaForm.value;

      // Exemple de calcul simplifié
      const totalCost = data.fixedCost + data.storageCost + data.backlogCost;
      const optimalStock = Math.max(0, data.stockQuantity - 10); // Exemple d'ajustement

      // Mise à jour du résumé
      this.summary = `
        Prix Total: ${totalCost.toFixed(2)}.
        Niveau de stockage optimal: ${optimalStock} units.
        Taux d'intérêt envisagé: ${(data.interestRate * 100).toFixed(2)}%.
      `;
    } else {
      this.summary = 'Les données sont incorrectes. Veuillez vérifier vos données.';
    }
  }*/

  optimaForm: FormGroup;
  totalCost: number | null = null; // Coût global de stockage
  shouldProduce: boolean | null = null; // Décision finale

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private readonly notificationService: NotificationService,
              private readonly optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      currency: ['EUR', [Validators.required]],
      initialStock: [0, [Validators.required, Validators.min(0)]],
      storageCost: [0, [Validators.required, Validators.min(0)]],
      fixedStorageCost: [0, [Validators.required, Validators.min(0)]],
      backlogCost: [0, [Validators.required, Validators.min(0)]],
      delayPenalty: [0, [Validators.required, Validators.min(0)]],
      demand: [0, [Validators.required, Validators.min(0)]]
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


  calculateCost() {
    if (this.optimaForm.valid) {
      const { stockLevel, fixedCost, storageCost, backlogCost, arrearsMultiplier, minimumStock } = this.optimaForm.value;

      // Coût de stockage avec ou sans arriérés
      let hQ = 0;
      if (stockLevel > 0) {
        hQ = storageCost * stockLevel; // Stock positif
      } else {
        hQ = backlogCost + arrearsMultiplier * Math.abs(stockLevel); // Stock négatif (arriérés)
      }

      // Calcul du coût global
      this.totalCost = fixedCost + hQ;

      // Décision de produire
      this.shouldProduce = stockLevel < minimumStock;
    }
    else {

    }
  }

  onSubmit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    this.currencySelected = this.optimaForm.get("currency")?.value;
    if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo.toUpperCase()) && user.subscription == "PREMIUM")
      this.openDialog("Votre abonnement actuel ne vous permet d'utiliser chaque algorithme qu'une seule fois. Passez à un abonnement pour bénéficier des services Optima sans limite. ");
    else {
    if (this.optimaForm.valid) {
      this.optimaService.calculateOptimum4(this.optimaForm.value).subscribe({
        next: (response) => {
          this.notificationService.showSuccess("Optima 4 généré.")
          this.reportData = {
            introduction: "L'objectif de ce rapport est de présenter une analyse des résultats obtenus par l'algorithme Optima 4, qui se concentre sur l'optimisation des coûts de stockage et la gestion des arriérés en cas de rupture de stock. L'algorithme prend en compte les coûts fixes de stockage, les coûts variables ainsi que les pénalités liées aux retards.",
            initialStock: this.optimaForm.value.initialStock,
            storageCost: this.optimaForm.value.storageCost,
            fixedStorageCost: this.optimaForm.value.fixedStorageCost,
            backlogCost: this.optimaForm.value.backlogCost,
            demand: this.optimaForm.value.demand,
            optimalStock: response.optimalStock,
            totalStorageCost: response.totalStorageCost,
            backlogUnits: response.backlogUnits,
            backlogCostResponse: response.backlogCost,
            analysis: "Les arriérés identifiés sont de " + response.backlogUnits + " unités, nécessitant une action corrective.",
            conclusion: "L'algorithme Optima 4 optimise les coûts de stockage tout en prenant en compte les risques de rupture de stock et les coûts d'arriérés. Il permet d'ajuster dynamiquement les niveaux de stock pour minimiser les coûts globaux tout en assurant une disponibilité constante des produits. Ce rapport démontre l'efficacité d'Optima 4 dans la gestion du stockage et des coûts associés, permettant ainsi une meilleure maîtrise des ressources en milieu industriel."
          };
        },
        error: (err) => {
          console.error('Erreur lors du calcul', err);
        }
      });
    }else {
      this.notificationService.showError("Veuillez remplir tous les champs.")
    }
    }
  }



}


