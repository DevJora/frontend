import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-pdf-generator',
  imports: [
    NgIf
  ],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css'
})
export class PdfGeneratorComponent {
  @Input() data!: any;
  @Input() name!: string;

  generatePDF() {
    if (!this.data) { return; }
    html2canvas(this.data).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Largeur A4 en mm
      const pageHeight = 297; // Hauteur A4 en mm
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgHeight = (canvasHeight * imgWidth) / canvasWidth;
      let heightLeft = imgHeight;
      let position = 0;

      const imgData = canvas.toDataURL('image/png');

      // Première page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Pages suivantes
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${this.name}.pdf`);
    });

  }

}
