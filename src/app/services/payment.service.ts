import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripeService: any;

  constructor(private http: HttpClient) { }

  STRIPE_PUBLIC_KEY = 'pk_test_51ROJ6IB6EgU63ps6xO3OP8zGsMekmwQflne4C3VNspmTmzAsgfgnONBe07rlsE0muYX7PGD7o7zAZ7JAmVY8wcZS00pUxz2J1j'; // clé publique
  private apiUrl = 'https://backend-opti-ye2p.onrender.com/payment/';

  async initiateStripePayment(planName: string, price: number, username: string, email: string, password: string, algos: string[]) {
    const stripe = await loadStripe(this.STRIPE_PUBLIC_KEY);
    if (!stripe) {
      alert('Échec de l\'initialisation de Stripe.');
      return;
    }

    this.http.post<any>(`${this.apiUrl}create-checkout-session`, {
      planName,
      amountInCents: price * 100,
      username,
      email,
      password,
      algos
    }).pipe(
      switchMap((session: any) => from(stripe.redirectToCheckout({sessionId: session.id})))
    ).subscribe({
      next: (result) => {
        if (result && result.error) {
          alert(result.error.message ?? 'Une erreur est survenue lors du paiement.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la redirection vers Stripe Checkout:', err);
        alert('Une erreur est survenue lors de la redirection vers le paiement.');
      }
    });
  }
}
