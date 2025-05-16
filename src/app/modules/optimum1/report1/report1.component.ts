import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {PdfGeneratorComponent} from '../../../components/pdf-generator/pdf-generator.component';

@Component({
  selector: 'app-report1',
  imports: [
    DecimalPipe,
    NgIf,
    PdfGeneratorComponent
  ],
  templateUrl: './report1.component.html',
  standalone: true,
  styleUrl: './report1.component.css'
})
export class Report1Component implements OnInit{

  data!: any;
  @Input() reportData: any;

  ngOnInit(): void {
    if (this.reportData) this.data = document.getElementById('pdf');
  }

  protected readonly document = document;
  @Input() productName!: string;
  @Input() algo!: string;
}
