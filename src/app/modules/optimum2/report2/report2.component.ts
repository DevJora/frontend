import {Component, Input} from '@angular/core';
import {CurrencyPipe, DecimalPipe, NgIf} from '@angular/common';
import {PdfGeneratorComponent} from '../../../components/pdf-generator/pdf-generator.component';


@Component({
  selector: 'app-report2',
  imports: [
    DecimalPipe,
    NgIf,
    CurrencyPipe,
    PdfGeneratorComponent
  ],
  templateUrl: './report2.component.html',
  standalone: true,
  styleUrl: './report2.component.css'
})
export class Report2Component {
  @Input() reportData: any | null = null;
  @Input() product!: string;
  @Input() currencySelected!: string;
  protected readonly document = document;
  @Input() algo!: string;
}
