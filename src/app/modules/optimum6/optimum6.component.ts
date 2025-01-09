import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../optima-request.service';
import {Report6Component} from './report6/report6.component';

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
export class Optimum6Component {
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder, private optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      production: this.fb.array([]),
      demand: this.fb.array([]),
      transportCost: this.fb.array([])
    });

    this.addProduction();
    this.addDemand();
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
