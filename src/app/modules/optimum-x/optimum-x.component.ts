import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptimaService} from '../../services/optima-request.service';
import {ReportXComponent} from './report-x/report-x.component';
import {NgIf} from '@angular/common';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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
export class OptimumXComponent implements OnInit {
  optimaForm: FormGroup;
  reportData: any | null = null;

  constructor(private fb: FormBuilder,
              private optimaService: OptimaService,
              public dialog: MatDialog,
              private readonly router: Router
              ) {
    this.optimaForm = this.fb.group({
      currentStock: [0, Validators.required],
      storageCost: [0, Validators.required],
      shortageCost: [0, Validators.required],
      discountFactor: [0.9, [Validators.required, Validators.min(0), Validators.max(1)]],
      demandMean: [10, Validators.required],
      maxOrder: [100, Validators.required]
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
