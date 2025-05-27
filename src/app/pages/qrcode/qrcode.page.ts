import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QrcodeService } from '../../services/qrcode.service';
import { AuthService } from '../../services/auth.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  standalone: false,
})
export class QrcodePage implements OnInit, OnDestroy {
  qrCodeData: string = '';
  userEmail: string = '';
  userName: string = '';
  refreshInterval: number = 120; // Par défaut 2 minutes
  private qrSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private qrcodeService: QrcodeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.generateQRCode();
  }

  ngOnDestroy() {
    if (this.qrSubscription) {
      this.qrSubscription.unsubscribe();
    }
  }

  loadUserData() {
    const userData = this.authService.currentUserValue;
    if (userData) {
      this.userEmail = userData.email;
      this.userName = userData.name;
    } else {
      this.router.navigate(['/login']);
    }
  }

  generateQRCode() {
    // Générer le QR code initial
    this.qrcodeService.generateQRCode().subscribe(
      response => {
        this.qrCodeData = response.qr_data;
        this.refreshInterval = response.refresh_interval || 120;
        
        // Configurer le rafraîchissement automatique
        this.setupAutoRefresh();
      },
      error => {
        console.error('Erreur lors de la génération du QR code', error);
      }
    );
  }

  setupAutoRefresh() {
    // Annuler l'abonnement existant s'il y en a un
    if (this.qrSubscription) {
      this.qrSubscription.unsubscribe();
    }
    
    // Créer un nouvel abonnement pour rafraîchir le QR code
    this.qrSubscription = interval(this.refreshInterval * 1000).pipe(
      switchMap(() => this.qrcodeService.generateQRCode())
    ).subscribe(
      response => {
        this.qrCodeData = response.qr_data;
        this.refreshInterval = response.refresh_interval || 120;
      },
      error => {
        console.error('Erreur lors du rafraîchissement du QR code', error);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        // La redirection est gérée dans le service
      },
      error => {
        console.error('Erreur lors de la déconnexion', error);
        // En cas d'erreur, on déconnecte quand même localement
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      }
    );
  }
}
