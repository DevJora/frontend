import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {OptimaService} from '../../optima-request.service';
import {RouterLink, RouterOutlet, Router} from '@angular/router';
@Component({
  selector: 'app-presentation',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DecimalPipe,
    RouterOutlet,
    RouterLink,
    ],
  templateUrl: './presentation.component.html',
  standalone: true,
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {
  optimaForm: FormGroup;
  result: string | null = null;

  constructor(private fb: FormBuilder) {
    this.optimaForm = this.fb.group({
      farms: [3, Validators.required],
      crops: [3, Validators.required],
      water: [5000, Validators.required],
      factories: [3, Validators.required],
      products: [5, Validators.required]
    });
  }

  calculate() {
    const { farms, crops, water, factories, products } = this.optimaForm.value;
    
    // Simulation d'optimisation agricole
    const maxProfit = (crops * farms * 300).toFixed(2); // Supposons 300€ de profit moyen par culture
    const agriculturalOptimization = `Profit agricole estimé : ${maxProfit} € pour ${farms} fermes et ${crops} cultures.`;
    
    // Simulation d'optimisation du transport
    const minCost = (factories * products * 50).toFixed(2); // Supposons un coût moyen de 50€ par produit
    const transportOptimization = `Coût minimal estimé pour le transport : ${minCost} € avec ${factories} usines et ${products} produits.`;
    
    this.result = `${agriculturalOptimization} \n ${transportOptimization}`;
  }
}

