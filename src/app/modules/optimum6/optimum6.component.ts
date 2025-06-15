import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../services/optima-request.service';
import {Report6Component} from './report6/report6.component';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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
export class Optimum6Component implements OnInit {
  optimaForm: FormGroup;
  reportData: any | null = null;
  algo = "Optima 6";

  constructor(
    private fb: FormBuilder,
    private optimaService: OptimaService,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
    this.optimaForm = this.fb.group({
      origins: this.fb.array([]),
      destinations: this.fb.array([]),
      costMatrix: this.fb.array([])
    });

    this.addOrigin();
    this.addDestination();
  }

  ngOnInit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.subscription === "FREEMIUM") {
      if (this.optimaService.verifyOptimaPermissionForFreemium(user.logs, this.algo)) {
        this.openDialog("Votre abonnement ne permet d'utiliser cet algorithme qu'une seule fois. Passez à PREMIUM/ENTREPRISE pour un accès illimité.");
      }
    } else if (user.subscription === "PREMIUM" && !this.optimaService.verifyOptimaPermission(this.algo, user.algos)) {
      this.openDialog("Votre abonnement ne vous permet pas d'accéder à cet algorithme.");
    }
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: { name: '', value: message, type: 'unauthorized-redirection' }
    });
    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/dashboard/home']));
  }

  get originsControls(): FormArray {
    return this.optimaForm.get('origins') as FormArray;
  }

  get destinationsControls(): FormArray {
    return this.optimaForm.get('destinations') as FormArray;
  }

  get costMatrix(): FormArray {
    return this.optimaForm.get('costMatrix') as FormArray;
  }

  addOrigin(): void {
    this.originsControls.push(this.fb.control('', Validators.required));
    this.updateMatrix();
  }

  addDestination(): void {
    this.destinationsControls.push(this.fb.control('', Validators.required));
    this.updateMatrix();
  }

  updateMatrix(): void {
    const numOrigins = this.originsControls.length;
    const numDestinations = this.destinationsControls.length;
    this.costMatrix.clear();

    for (let i = 0; i < numOrigins; i++) {
      const row = this.fb.group({});
      for (let j = 0; j < numDestinations; j++) {
        row.addControl(`${j}`, this.fb.control(0, Validators.required));
      }
      this.costMatrix.push(row);
    }
  }

  getControlKeys(row: AbstractControl): string[] {
    return Object.keys((row as FormGroup).controls);
  }

  onSubmit(): void {
    const payload = {
      origins: this.originsControls.value,
      destinations: this.destinationsControls.value,
      supply: this.originsControls.value.map((_: any, i: number) => Number(this.originsControls.at(i).value)),
      demand: this.destinationsControls.value.map((_: any, j: number) => Number(this.destinationsControls.at(j).value)),
      costMatrix: this.costMatrix.value.map((row: any) => Object.values(row).map(Number))
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
