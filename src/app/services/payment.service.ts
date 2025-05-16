import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripeService: any;

  constructor(private http: HttpClient) { }

  STRIPE_PUBLIC_KEY = 'pk_test_51ROJ6IB6EgU63ps6xO3OP8zGsMekmwQflne4C3VNspmTmzAsgfgnONBe07rlsE0muYX7PGD7o7zAZ7JAmVY8wcZS00pUxz2J1j'; // clé publique
  private apiUrl = 'http://localhost:8081/payment/';

  async initiateStripePayment(planName: string,
                              price: number,
                              username: string,
                              email: string,
                              password: string,
                              algos: string[]) {
    const stripe = await loadStripe(this.STRIPE_PUBLIC_KEY);

    console.log(password)
    this.http.post<any>(`${this.apiUrl}create-checkout-session`, {
      planName: planName,
      amountInCents: price * 100, // converti en centimes
      username: username,
      email: email,
      password: password,
      algos: algos
    }).pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    )
      .subscribe({
        next: (result) => {
          if (result && typeof result === 'object' && 'error' in result) {
            const error = result.error as { message?: string };
            alert(error.message ?? 'Une erreur est survenue lors du paiement.');
          } else {
            alert('Une erreur inconnue est survenue lors du paiement.');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la redirection vers Stripe Checkout:', err);
          alert('Une erreur est survenue lors de la redirection vers le paiement.');
        }
      });
  }
}
