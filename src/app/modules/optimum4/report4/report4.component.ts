import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgIf} from '@angular/common';
import {PdfGeneratorComponent} from '../../../components/pdf-generator/pdf-generator.component';

@Component({
  selector: 'app-report4',
  imports: [
    NgIf,
    PdfGeneratorComponent,
    CurrencyPipe
  ],
  templateUrl: './report4.component.html',
  standalone: true,
  styleUrl: './report4.component.css'
})
export class Report4Component {
  @Input() reportData: any | null = null;
  @Input() algo!: string;

  protected readonly document = document;
  @Input() currencySelected!: string;
}
