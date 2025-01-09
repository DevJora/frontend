import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-report1',
  imports: [
    DecimalPipe,
    NgIf
  ],
  templateUrl: './report1.component.html',
  standalone: true,
  styleUrl: './report1.component.css'
})
export class Report1Component {
  @Input() reportData: any;
}
