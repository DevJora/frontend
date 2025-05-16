import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../services/optima-request.service';
import {Report3Component} from './report3/report3.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-optimum3',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    Report3Component,
    CurrencyPipe
  ],
  templateUrl: './optimum3.component.html',
  standalone: true,
  styleUrl: './optimum3.component.css'
})
export class Optimum3Component {
  optimaForm: FormGroup;
  threshold: number = 0;  // Valeur seuil dynamique
  reportData: any | null = null;
  currencySelected!: string;
  algo= "Optima 3";

  constructor(
    private fb: FormBuilder,
    private optimaService: OptimaService,
    private readonly router: Router,
    public dialog: MatDialog,
    private readonly notificationService: NotificationService
  ) {
    this.optimaForm = this.fb.group({
      currency: ['EUR', [Validators.required]],
      preparationCost: [9000, [Validators.required, Validators.min(0)]],
      products: this.fb.array([])
    });
    this.addProduct();  // Ajouter un produit par défaut
    this.updateThreshold();  // Calcul initial
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

  // Getter pour les produits
  get productControls() {
    return this.optimaForm.get('products') as FormArray;
  }

  // Ajouter un produit
  addProduct() {
    const productGroup = this.fb.group({
      productName: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      storageCost: [0, [Validators.required, Validators.min(0)]],
      shortageCost: [0, [Validators.required, Validators.min(0)]]
    });

    productGroup.valueChanges.subscribe(() => this.updateThreshold());
    this.productControls.push(productGroup);
    this.updateThreshold();
  }

  castToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  // Supprimer un produit
  removeProduct(index: number) {
    this.productControls.removeAt(index);
    this.updateThreshold();
  }

  // Calcul de la valeur seuil
  updateThreshold() {
    this.threshold = this.productControls.value.reduce((sum: number, product: any) => {
      const stockCost = product.stock * product.storageCost;
      const shortageCost = product.shortageCost;
      return sum + stockCost + shortageCost;
    }, 0);
  }

  // Soumission du formulaire
  onSubmit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    this.currencySelected = this.optimaForm.get("currency")?.value;
    if(this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo.toUpperCase()) && user.subscription == "PREMIUM")
      this.openDialog("Votre abonnement actuel ne vous permet d'utiliser chaque algorithme qu'une seule fois. Passez à un abonnement pour bénéficier des services Optima sans limite. ");
    else {
      if (this.optimaForm.valid) {
        const payload = {
          preparationCost: this.optimaForm.value.preparationCost,
          products: this.productControls.value
        };

        this.optimaService.calculateOptimum3(payload).subscribe({
          next: (response) => {

            this.reportData = {
              introduction: "L'objectif de ce rapport est de présenter une analyse des résultats obtenus par l'algorithme Optima 3, qui calcule la fréquence optimale de production et le niveau de stock nécessaire pour plusieurs produits. L'algorithme s'adapte à une demande incertaine tout en minimisant les coûts de stockage, de production et de rupture de stock.",
              preparationCost: payload.preparationCost,
              products: payload.products,
              results: {
                //productionRequired: Object.keys(response)
                productionRequired: response.filter((p: any) => p.decision === 'Production nécessaire').map((p: any) => p.productName),
                productionDelayed: response.filter((p: any) => p.decision === 'Production reportée').map((p: any) => p.productName)
              },
              totalCost: response.reduce((sum: number, p: any) => sum + p.cost, 0),
              analysis: "Les produits nécessitant une production immédiate sont ceux avec des stocks bas...",
              conclusion: "L'algorithme Optima 3 fournit des résultats adaptés pour optimiser la production multi-produits en prenant en compte des demandes fluctuantes. Il ajuste dynamiquement la fréquence de production et les niveaux de stock pour minimiser les coûts globaux.\n" +
                "\n" +
                "Ce rapport démontre la flexibilité et l'efficacité d'Optima 3 pour anticiper les besoins de production et optimiser la gestion des stocks dans des environnements complexes."
            };
            this.notificationService.showSuccess("Optima 3 généré.")
          },
          error: (err) => {
            console.error('Erreur lors du calcul :', err);
          }
        });
      }else {
        this.notificationService.showError("Veuillez remplir tous les champs");
      }
    }
  }


  protected readonly FormGroup = FormGroup;

}
