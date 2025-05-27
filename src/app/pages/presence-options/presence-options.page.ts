// src/app/pages/presence-options/presence-options.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'; // Assurez-vous que ce chemin est bon

@Component({
  selector: 'app-presence-options',
  templateUrl: './presence-options.page.html',
  styleUrls: ['./presence-options.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class PresenceOptionsPage implements OnInit {
  userEmail: string | null = null;
  // Renommage pour correspondre au template HTML que vous avez fourni
  statusMessage: string | null = null; // Anciennement clockInMessage
  isSuccess: boolean = false;          // Anciennement isClockInSuccess
  isLoading: boolean = false;          // Anciennement isLoadingClockIn

  private router = inject(Router);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastCtrl = inject(ToastController);
  // private loadingCtrl = inject(LoadingController); // On utilise isLoading avec un spinner simple pour l'instant

  constructor() { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.email) {
      this.userEmail = currentUser.email;
    } else {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const user = JSON.parse(storedUserData);
          this.userEmail = user.email;
        } catch (e) {
          console.error("Erreur lors du parsing de userData depuis localStorage", e);
        }
      }
    }
  }

  // Renommage pour correspondre au template
  goToQrCode() { // Anciennement goToQrCodePage
    this.router.navigate(['/qrcode']);
  }

  // Renommage pour correspondre au template
  async clockInDirect() { // Anciennement performDirectClockIn
    this.isLoading = true;
    this.statusMessage = null;

    this.http.post<any>(`${environment.apiUrl}/attendance/clock-in`, {})
      .subscribe({
        next: (response) => { // async n'est plus nécessaire ici si on n'utilise pas await
          this.isLoading = false;
          this.isSuccess = true;
          this.statusMessage = response.message || 'Présence enregistrée avec succès !';
          if (this.statusMessage) { // Vérification avant d'appeler le toast
            this.presentToast(this.statusMessage, 'success');
          }
        },
        error: (err) => { // async n'est plus nécessaire ici
          this.isLoading = false;
          this.isSuccess = false;
          console.error('Erreur lors du pointage direct:', err);
          this.statusMessage = err.error?.message || 'Erreur lors de l\'enregistrement de la présence.';
          if (this.statusMessage) { // Vérification avant d'appeler le toast
            this.presentToast(this.statusMessage, 'danger');
          }
        }
      });
  }

  // Méthode Logout à ajouter
  async logout() {
    // Optionnel: afficher un indicateur de chargement
    // const loading = await this.loadingCtrl.create({ message: 'Déconnexion...' });
    // await loading.present();
    this.authService.logout().subscribe({
      next: () => {
        // await loading.dismiss();
        // La navigation vers '/login' est déjà gérée dans AuthService.logout()
        console.log('Déconnexion réussie');
      },
      error: async (err) => {
        // await loading.dismiss();
        console.error('Erreur de déconnexion:', err);
        this.presentToast('Erreur lors de la déconnexion.', 'danger');
      }
    });
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}