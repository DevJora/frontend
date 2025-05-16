import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgIf} from '@angular/common';
import {Optima1Request, Optima1Response} from '../../models/Optima1';
import {OptimaService} from '../../services/optima-request.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {response} from 'express';
import {Report1Component} from './report1/report1.component';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-optimum1',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
    Report1Component
  ],
  templateUrl: './optimum1.component.html',
  standalone: true,
  styleUrl: './optimum1.component.css'
})
export class Optimum1Component implements OnInit{
  optimaForm: FormGroup;
  reportData: any | null = null;
  algo= "Optima 1";
  productName= '';

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              private readonly router: Router,
              public dialog: MatDialog,
              private readonly notificationService: NotificationService
  ) {
    this.optimaForm = this.fb.group({
      product: [this.productName, [Validators.required]],
      demand: [10000, [Validators.required]],
      productionCost: [18000, [Validators.required]],
      storageCost: [20, [Validators.required]],
      dailyProductionCapacity: [25000, [Validators.required]],
      timeUnit: ['jour', [Validators.required]]
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

  onSubmit(): void {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    this.productName = this.optimaForm.get('product')?.value;
    if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo.toUpperCase()) && user.subscription == "PREMIUM") {
      this.openDialog("Votre abonnement actuel ne vous permet d'utiliser chaque algorithme qu'une seule fois. Passez à un abonnement pour bénéficier des services Optima sans limite. ");
    }else {
      if (this.optimaForm.valid) {
        this.optimaService.calculateOptimum(this.optimaForm.value).subscribe({
          next: (response) => {
            this.notificationService.showSuccess("Résultat optima 1 généré.");
            this.reportData = this.generateReport(response);
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

  generateReport(response: any): any {
    const { demand, productionCost, storageCost, dailyProductionCapacity } = this.optimaForm.value;
    const { optimalCycleFrequency, optimalCycleInterval } = response;

    let analysis = '';
    if (optimalCycleInterval > 2) {
      analysis = 'La capacité de production est largement supérieure à la demande, permettant d’espacer les cycles de production.';
    } else if (optimalCycleInterval < 2) {
      analysis = 'La capacité de production est proche de la demande, nécessitant des cycles fréquents.';
    } else {
      analysis = 'La capacité de production est insuffisante pour répondre à la demande quotidienne.';
    }

    return {
      introduction: 'L\'objectif de ce rapport est de présenter une analyse des résultats obtenus par l\'algorithme Optima 1, qui calcule la fréquence et l\'intervalle optimal de production pour répondre à une demande tout en minimisant les coûts de production et de stockage.',
      data: {
        demand,
        productionCost,
        storageCost,
        dailyCapacity: dailyProductionCapacity
      },
      results: {
        frequency: optimalCycleFrequency,
        interval: optimalCycleInterval
      },
      analysis,
      conclusion: 'L\'algorithme Optima 1 fournit des résultats précis et robustes pour planifier la production en minimisant les coûts.'
         +
        'Ce rapport reflète la capacité de l\'algorithme à s\'adapter aux contraintes réelles de production et à optimiser la gestion des cycles de fabrication.'
    };
  }
}
