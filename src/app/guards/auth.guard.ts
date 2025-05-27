// src/app/guards/auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajustez le chemin vers votre AuthService

// Nouvelle approche pour les guards fonctionnels (Angular 14.2+)
export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true; // L'utilisateur est authentifié, autoriser l'accès
    } else {
        // L'utilisateur n'est pas authentifié, rediriger vers la page de login
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};

// --- OU ---
// Ancienne approche avec une classe (si vous préférez ou pour des versions Angular antérieures)
// Si vous utilisez cette approche, vous devrez aussi importer CanActivate
/*
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate { // Nommez-le AuthGuardService pour éviter la confusion avec la fonction AuthGuard

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
*/