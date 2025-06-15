import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-success-payment',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export class SuccessPaymentComponent {
  customerName: string | null = null;
  amountTotal: number | null = null;
  currency: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
   /* if (sessionId) {
      this.http.get<any>(`/api/checkout-session?sessionId=${sessionId}`).subscribe({
        next: (session) => {
          this.customerName = session.customer_details?.name || 'Client';
          this.amountTotal = session.amount_total / 100;
          this.currency = session.currency.toUpperCase();
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la session:', err);
          this.error = 'Impossible de récupérer les informations de la commande.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Identifiant de session manquant dans l\'URL.';
      this.loading = false;
    }*/
    this.loading = false;
  }
}
