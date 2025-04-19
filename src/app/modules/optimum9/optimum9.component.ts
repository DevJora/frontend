import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../services/optima-request.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';

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
export class Optimum9Component implements OnInit{
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              public dialog: MatDialog,
              private readonly router: Router
  ) {
    this.optimaForm = this.fb.group({
      marketData: this.fb.array([this.createSegment()])
    });
  }

  ngOnInit() {
    const user = JSON.parse(<string>localStorage.getItem("user"));
    if (!user) {
      console.warn('Aucun utilisateur trouvé, redirection vers login...');

    }

    if(user.subscription == "FREEMIUM"){
      this.openDialog();
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: {name: '', value : `Votre abonnement actuel ne vous permet pas d'accéder à cet algorithme.`, type: 'unauthorized-redirection'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/dashboard/home']);
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
