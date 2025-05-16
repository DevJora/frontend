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
  algo = "Optima 9";
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
