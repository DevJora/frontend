import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-report7',
  imports: [
    NgIf
  ],
  templateUrl: './report7.component.html',
  standalone: true,
  styleUrl: './report7.component.css'
})
export class Report7Component {
  @Input() reportData: any | null = null;

}
