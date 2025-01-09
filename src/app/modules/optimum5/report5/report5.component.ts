import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-report5',
  imports: [
    NgForOf
  ],
  templateUrl: './report5.component.html',
  standalone: true,
  styleUrl: './report5.component.css'
})
export class Report5Component {
  @Input() reportData: any | null = null;

}
