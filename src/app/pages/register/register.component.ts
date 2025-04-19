import {Component, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgForOf,
    NgClass,
    NgIf,
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  registerForm: FormGroup;
  userData!: { username: string; email: string; password: string; subscription: string; algos: string[] }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.userData = this.registerForm.value;

    }
  }


  plans: SubscriptionPlan[] = [
    {
      name: 'Essai gratuit',
      price: 0,
      description: 'Testez gratuitement deux algorithmes une seule fois.',
      features: ['Accès à 2 algorithmes', 'Accès unique', 'Durée limitée']
    },
    {
      name: 'Premium',
      price: 9.99,
      description: 'Accès à 3 algorithmes pendant 30 jours.',
      features: ['3 algorithmes', 'Accès 30 jours', 'Support classique']
    },
    {
      name: 'Entreprise',
      price: 19.99,
      description: 'Accès illimité à tous les algorithmes.',
      features: ['Tous les algorithmes', 'Accès illimité', 'Support prioritaire']
    }
  ];

  selectedPlan?: SubscriptionPlan;

  algorithms = ['Optima 1', 'Optima 2', 'Optima 3', 'Optima 4', 'Optima 5', 'Optima 6', 'Optima 7', 'Optima 8', 'Optima 9', 'Optima X'];
  selectedAlgorithms: string[] = [];

  toggleAlgorithmSelection(algo: string) {
    if (this.selectedAlgorithms.includes(algo)) {
      this.selectedAlgorithms = this.selectedAlgorithms.filter(a => a !== algo);
    } else if (this.selectedAlgorithms.length < 3) {
      this.selectedAlgorithms.push(algo);
    }
  }

  isAlgoDisabled(algo: string): boolean {
    return (
      !this.selectedAlgorithms.includes(algo) &&
      this.selectedAlgorithms.length >= 3
    );
  }

  subscribeInfo() {
    if (!this.selectedPlan) {
      alert('Veuillez sélectionner une offre.');
      return;
    }

    if (
      this.selectedPlan.name === 'Standard' &&
      this.selectedAlgorithms.length !== 3
    ) {
      alert('Veuillez choisir exactement 3 algorithmes.');
      return;
    }

    console.log('Offre sélectionnée :', this.selectedPlan.name);
    console.log('Algorithmes choisis :', this.selectedAlgorithms);
    // Appel backend à faire ici
  }

  subscribe() {
    if(this.selectedPlan) this.userData.subscription = this.selectedPlan.name;
    this.userData.algos = this.selectedAlgorithms;
    this.authService.register(this.userData).subscribe(() => {
        this.router.navigate(['/login']);  // Redirige vers la connexion après inscription
      });
  }
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}
