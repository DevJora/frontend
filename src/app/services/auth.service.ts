import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {NotificationService} from './notification.service';
import {LoadingService} from './loading.service';
import {SubscriptionPlan} from '../pages/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'https://backend-opti-ye2p.onrender.com';  // URL de ton backend

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loadingService: LoadingService) {

    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('token');
    } else {
      this.isLoggedIn = false;  // Ou un autre état par défaut en cas d'environnement non-navigateur
    }
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    subscription: string;
    algos: string[]
  }): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => this.notificationService.showSuccess('Inscription réussie, vous pouvez vous connecter.')),
      tap(() => this.router.navigate(['/login'])),
      catchError(error => {
        this.notificationService.showError(error.message);
        return throwError(error);
      }), finalize(() => this.loadingService.hide())
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.isLoggedIn = true;
        localStorage.setItem('token', response.bearer);  // ✅ Stocke le token JWT
        localStorage.setItem('user', JSON.stringify(response.user));  // ✅ Stocke le rôle de l'utilisateur


      }), tap(() => this.notificationService.showSuccess('Connexion réussi')),
      catchError(error => {
        this.notificationService.showError('Erreur de login/mode de passe');
        return throwError(error);
      }), finalize(() => this.loadingService.hide())
    );


  }

  logout(): void {
    this.loadingService.show();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.loadingService.hide();
    this.router.navigate(['/login']);  // Redirige vers la page de connexion

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isLogged(): boolean {
    if(this.isLoggedIn)
      return !this.isTokenExpired();
    else return false;
  }

  decodeToken(token: string | null): any {
    if (!token) return null;
    const payload = token.split('.')[1]; // Récupérer la partie payload
    return JSON.parse(atob(payload)); // Décoder en JSON
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken(this.getToken());
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

}
