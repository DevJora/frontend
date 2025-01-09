import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';


@Component({
  selector: 'app-report2',
  imports: [
    DecimalPipe,
    NgIf
  ],
  templateUrl: './report2.component.html',
  standalone: true,
  styleUrl: './report2.component.css'
})
export class Report2Component {
  @Input() reportData: any | null = null;
}
