import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogContentComponent} from '../../components/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OptimaService} from '../../services/optima-request.service';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-optimum8',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './optimum8.component.html',
  standalone: true,
  styleUrl: './optimum8.component.css'
})
export class Optimum8Component implements OnInit{
  algo = "Optima 8";
  form!: FormGroup;
  result: { optimalValue: number; allocation: number[] } | null = null;

  constructor(public dialog: MatDialog,
              private readonly router: Router,
              private readonly optimaService: OptimaService,
              private readonly fb: FormBuilder,
              private readonly http: HttpClient
  ) {
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

    this.form = this.fb.group({
      steps: [{ value: 4, disabled: true }, [Validators.required]],
      capacity: [6, Validators.required],
      maximization: [true],
      table: this.fb.array([
        this.fb.control('0,4,6,7,7,7,7'),
        this.fb.control('0,2,4,6,8,9,10'),
        this.fb.control('0,6,8,8,8,8,8'),
        this.fb.control('0,2,3,4,4,4,4')
      ])
    });

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



  get table(): FormArray {
    return this.form.get('table') as FormArray;
  }

  addRow(): void {
    this.table.push(this.fb.control(''));
    this.form.get('steps')?.setValue(this.table.length);
  }

  removeRow(i: number): void {
    this.table.removeAt(i);
    this.form.get('steps')?.setValue(this.table.length);

  }

  submit(): void {
    const {  capacity, maximization, table } = this.form.value;
    const steps = table.length;
    const parsedTable = table.map((row: string) =>
      row.split(',').map((v: string) => parseFloat(v))
    );

    const payload = {
      steps,
      capacity,
      maximization,
      table: parsedTable
    };

    this.optimaService.calculateOptimum8(payload).subscribe({
      next: res => this.result = res,
      error: err => console.error(err)
    })
  }

}
