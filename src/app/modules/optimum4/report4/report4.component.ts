import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-report4',
  imports: [
    DecimalPipe,
    NgIf
  ],
  templateUrl: './report4.component.html',
  standalone: true,
  styleUrl: './report4.component.css'
})
export class Report4Component {
  @Input() reportData: any | null = null;

}
