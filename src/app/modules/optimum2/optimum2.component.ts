import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../optima-request.service';
import {Report1Component} from '../optimum1/report1/report1.component';
import {Report2Component} from './report2/report2.component';

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

  constructor(private fb: FormBuilder, private optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      storageCost: [600, [Validators.required]],
      orderCost: [40000, [Validators.required]],
      shortageCost: [20000, [Validators.required]],
      demandData: this.fb.array([this.createDemandControl()])
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
    if (this.optimaForm.valid) {
      const payload = {
        storageCost: this.optimaForm.value.storageCost,
        orderCost: this.optimaForm.value.orderCost,
        shortageCost: this.optimaForm.value.shortageCost,
        demandData: this.demandControls.value.map((control: any) => control.demand)
      };

      this.optimaService.calculateOptimum2(payload).subscribe({
        next: (response) => {
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
            analysis: `L\'algorithme indique qu\'il est optimal de maintenir un stock de ${response.optimalStockLevel >= 2 ? response.optimalStockLevel+' unités' : response.optimalStockLevel + ' unité'}  pour minimiser les coûts tout en assurant une couverture suffisante des demandes variables. Les résultats montrent qu\'une commande doit être passée environ chaque ${response.optimalCycleFrequency >= 2 ? response.optimalCycleFrequency + ' semaines' : response.optimalCycleFrequency + ' semaine'}  pour éviter des ruptures de stock. Le coût total obtenu après l\'optimisation s\'élève à ${response.minimalCost} (selon la monnaie utilisée dans le problème), ce qui inclut les coûts de stockage, de commande et de rupture de stock potentielle.`,
            conclusion: `L'algorithme Optima 2 fournit des résultats adaptés pour gérer des demandes incertaines tout en optimisant les coûts associés aux stocks et aux commandes. Il s'ajuste automatiquement aux variations de la demande et aux contraintes économiques.
            Ce rapport démontre la flexibilité et l'efficacité d'Optima 2 pour anticiper et minimiser les risques liés à la gestion des stocks dans des environnements de demande fluctuante.`
          };
        },
        error: (err) => {
          console.error('Erreur lors du calcul :', err);
        }
      });
    }
  }


  protected readonly FormGroup = FormGroup;
}
