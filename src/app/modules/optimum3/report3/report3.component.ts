import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-report3',
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './report3.component.html',
  standalone: true,
  styleUrl: './report3.component.css'
})
export class Report3Component implements OnInit{
  @Input() reportData: any | null = null;

  ngOnInit(): void {
    console.log(this.reportData)

  }

}
