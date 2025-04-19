import {Component, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnDestroy{
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubscribe() {

  }

  ngOnDestroy() {

  }
}
