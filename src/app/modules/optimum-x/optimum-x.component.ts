import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../services/optima-request.service';
import {ReportXComponent} from './report-x/report-x.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-optimum-x',
  imports: [
    ReactiveFormsModule,
    ReportXComponent,
    NgIf
  ],
  templateUrl: './optimum-x.component.html',
  standalone: true,
  styleUrl: './optimum-x.component.css'
})
export class OptimumXComponent {
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder, private optimaService: OptimaService) {
    this.optimaForm = this.fb.group({
      currentStock: [0, Validators.required],
      storageCost: [0, Validators.required],
      shortageCost: [0, Validators.required],
      discountFactor: [0.9, [Validators.required, Validators.min(0), Validators.max(1)]],
      demandMean: [10, Validators.required],
      maxOrder: [100, Validators.required]
    });
  }

  onSubmit(): void {
    const payload = this.optimaForm.value;

    this.optimaService.calculateOptimumX(payload).subscribe({
      next: (response) => {
        console.log(response)
        this.reportData = response;
      },
      error: (err) => {
        console.error('Erreur lors du calcul :', err);
      }
    });
  }

}
