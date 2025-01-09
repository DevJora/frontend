import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-report-x',
  imports: [
    DecimalPipe
  ],
  templateUrl: './report-x.component.html',
  standalone: true,
  styleUrl: './report-x.component.css'
})
export class ReportXComponent {
  @Input() reportData: any | null = null;

}
