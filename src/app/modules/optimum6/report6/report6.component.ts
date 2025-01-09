import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-report6',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './report6.component.html',
  standalone: true,
  styleUrl: './report6.component.css'
})
export class Report6Component {
  @Input() reportData: any | null = null;

}
