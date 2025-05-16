import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from './services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Liste des endpoints à exclure
  const excludedUrls = [
    '/payment/create-checkout-session',
    '/login',
    '/register'
    // Ajoutez d'autres endpoints publics ici si nécessaire
  ];

  // Vérifie si l'URL de la requête correspond à un endpoint exclu
  const shouldExclude = excludedUrls.some(url => req.url.includes(url));

  // Si l'URL est exclue ou si aucun token n'est présent, ne pas ajouter l'en-tête Authorization
  if (!token || shouldExclude) {
    return next(req);
  }

  // Sinon, ajouter l'en-tête Authorization
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
