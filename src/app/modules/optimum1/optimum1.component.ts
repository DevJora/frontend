import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgIf} from '@angular/common';
import {Optima1Request, Optima1Response} from '../../models/Optima1';
import {OptimaService} from '../../optima-request.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {response} from 'express';
import {Report1Component} from './report1/report1.component';

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
export class Optimum1Component{
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder, private optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      demand: [10000, [Validators.required]],
      productionCost: [18000, [Validators.required]],
      storageCost: [20, [Validators.required]],
      dailyProductionCapacity: [25000, [Validators.required]],
      timeUnit: ['jour', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.optimaForm.valid) {
      this.optimaService.calculateOptimum(this.optimaForm.value).subscribe({
        next: (response) => {
          this.reportData = this.generateReport(response);
        },
        error: (err) => {
          console.error('Erreur lors du calcul :', err);
        }
      });
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
