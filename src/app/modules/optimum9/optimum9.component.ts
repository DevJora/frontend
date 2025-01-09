import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../optima-request.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-optimum9',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    KeyValuePipe
  ],
  templateUrl: './optimum9.component.html',
  standalone: true,
  styleUrl: './optimum9.component.css'
})
export class Optimum9Component {
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder, private optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      marketData: this.fb.array([this.createSegment()])
    });
  }

  // Getter pour accéder facilement au FormArray
  get marketData(): FormArray {
    return this.optimaForm.get('marketData') as FormArray;
  }

  // Crée un FormGroup pour chaque segment
  createSegment(): FormGroup {
    return this.fb.group({
      age: ['', Validators.required],
      socialClass: ['', Validators.required],
      zone: ['', Validators.required]
    });
  }

  // Ajout dynamique d'un segment
  addSegment(): void {
    this.marketData.push(this.createSegment());
  }

  // Suppression d'un segment spécifique
  removeSegment(index: number): void {
    if (this.marketData.length > 1) {
      this.marketData.removeAt(index);
    }
  }

  // Envoi du formulaire et appel API
  onSubmit(): void {
    const payload = {
      marketData: this.optimaForm.value.marketData.map((segment: any) => [
        segment.age,
        segment.socialClass,
        segment.zone
      ])
    };

    console.log('Payload corrigé :', payload);  // Vérification du bon format

    this.optimaService.calculateOptimum9(payload).subscribe({
      next: (response) => {
        this.reportData = response;
      },
      error: (err) => {
        console.error('Erreur lors de la segmentation :', err);
      }
    });
  }

}
