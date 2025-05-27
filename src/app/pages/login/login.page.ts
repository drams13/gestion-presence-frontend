// src/app/pages/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular'; // IonicModule et AlertController puis taostController et LoadingController
import { Router, RouterModule } from '@angular/router'; // RouterModule pour routerLink si utilisé
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // << --- AJOUTÉ
  imports: [         // << --- AJOUTÉ
    CommonModule,
    ReactiveFormsModule, // << --- CHANGÉ de FormsModule à ReactiveFormsModule
    IonicModule,
    RouterModule       // << --- AJOUTÉ (utile si login.page.html utilise routerLink)
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    // private taostController: toastController, // << --- AJOUTÉ
    // private loadingController: LoadingController // << --- pour une indicateur de changement globale
    // Les injections de CommonModule, IonicModule, FormsModule ont été retirées
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false] // C'est un FormControl
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/presence-options']);
      // this.router.navigate(['/qrcode']); // Assurez-vous que '/qrcode' est une route valide
    }

    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      try {
        const user = JSON.parse(rememberedUser);
        if (user && user.email) {
          this.loginForm.patchValue({
            email: user.email,
            rememberMe: true
          });
        } else {
          localStorage.removeItem('rememberedUser'); // Données invalides
        }
      } catch (e) {
        console.error("Erreur lors du parsing de rememberedUser:", e);
        localStorage.removeItem('rememberedUser'); // Données corrompues
      }
    }
  }

  // Assurez-vous que votre template appelle onSubmit()
  // Par exemple, <form (ngSubmit)="onSubmit()"> ou <ion-button (click)="onSubmit()">
  onSubmit() {
    if (this.loginForm.invalid) {
      // Marquer les champs comme touchés pour afficher les erreurs de validation si nécessaire
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
      // const loading = await this.loadingCtrl.create({ message: 'Connexion en cours...' });
      // await loading.present();
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      response => {
        this.isLoading = false;
                // await loading.dismiss();
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email }));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        this.router.navigate(['/presence-options']);
        // this.router.navigate(['/qrcode']); // Assurez-vous que '/qrcode' est une route valide
      },
      error => {
        this.isLoading = false;
            //  await loading.dismiss();
        let errorMessage = 'Email ou mot de passe incorrect.';
        // Vous pourriez vouloir inspecter error pour un message plus spécifique
        if (error.error && error.error.message) { errorMessage = error.error.message; }
        console.error("Erreur de connexion:", error);
        this.showErrorAlert('Échec de connexion', errorMessage);
        // this.presentToast(errorMessage, 'danger'); // Alternative avec Toast
      }
    );
  }

  async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Helper getters pour un accès facile aux contrôles dans le template (optionnel mais pratique)
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }
}