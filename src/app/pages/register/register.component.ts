import {Component, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {usernameExistsValidator} from '../../validators/user.validator';
import {UserService} from '../../services/user.service';
import {PaymentService} from '../../services/payment.service';
import {NgxStripeModule, StripeService} from 'ngx-stripe';

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
  strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {
    this.registerForm = this.fb.group({
      username: ['', {
        validators: [Validators.required],
        asyncValidators: [usernameExistsValidator(this.userService)],
        updateOn: 'blur' // déclenche la vérif. async uniquement quand l'utilisateur sort du champ
      }],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.strongPasswordRegex)]],
      confirmPwd: ['', Validators.required],
    }, { validator: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPwd')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.userData = this.registerForm.value;
    }
  }


  plans: SubscriptionPlan[] = [
    {
      name: 'Fremium',
      price: 0,
      description: 'Testez gratuitement deux algorithmes une seule fois.',
      features: ['Accès à 2 algorithmes', 'Accès unique', 'Durée limitée']
    },
    {
      name: 'Premium',
      price: 49.99,
      description: 'Accès à 3 algorithmes pendant 30 jours.',
      features: ['3 algorithmes', 'Accès 30 jours', 'Support classique']
    },
    {
      name: 'Entreprise',
      price: 129.99,
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

    if (
      this.selectedPlan?.name === 'PREMIUM' &&
      this.selectedAlgorithms.length !== 3
    ) {
      alert('Veuillez choisir exactement 3 algorithmes.');
      return;
    }

    console.log('Offre sélectionnée :', this.selectedPlan?.name);
    console.log('Algorithmes choisis :', this.selectedAlgorithms);


    if (this.registerForm.valid) {
      this.userData = this.registerForm.value;
    }
  }


  subscribe() {
    if (!this.selectedPlan) {
      alert('Veuillez sélectionner une offre.');
      return;
    }

     if(this.selectedPlan.name !== 'Freemium') {
       /*this.paymentService.initiateStripePayment(
         this.selectedPlan.name,
         this.selectedPlan.price,
         this.registerForm.get('username')?.value,
         this.registerForm.get('email')?.value,
         this.registerForm.get('password')?.value,
         this.selectedAlgorithms)*///.then(r => console.log(r));
     }

    this.userData.subscription = this.selectedPlan.name;
    this.authService.register(this.userData).subscribe(() => {
      this.router.navigate(['/login']);  // Redirige vers la connexion après inscription
    });
  }

  addUserData() {
    this.userData = this.registerForm.value;
  }
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}
