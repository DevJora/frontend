import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {PdfGeneratorComponent} from "../../../components/pdf-generator/pdf-generator.component";

@Component({
  selector: 'app-report3',
  imports: [
    NgForOf,
    NgIf,
    PdfGeneratorComponent,
    CurrencyPipe
  ],
  templateUrl: './report3.component.html',
  standalone: true,
  styleUrl: './report3.component.css'
})
export class Report3Component implements OnInit{
  @Input() reportData: any | null = null;

  ngOnInit(): void {
  }


  protected readonly document = document;
  @Input() currencySelected!: string;
  @Input() algo!: string;
}
