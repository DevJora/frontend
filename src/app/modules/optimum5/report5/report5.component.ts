import {Component, Input, OnInit} from '@angular/core';
import { NgForOf, NgIf} from '@angular/common';
import {PdfGeneratorComponent} from '../../../components/pdf-generator/pdf-generator.component';

@Component({
  selector: 'app-report5',
  imports: [
    NgForOf,
    NgIf,
    PdfGeneratorComponent,
  ],
  templateUrl: './report5.component.html',
  standalone: true,
  styleUrl: './report5.component.css'
})
export class Report5Component implements OnInit{
  @Input() reportData: any | null = null;
  @Input() algo!: string;
  @Input() currencySelected!: string;
  @Input() productName!: string;

  ngOnInit(): void {
    console.log(this.currencySelected);
  }

  protected readonly document = document;
}
