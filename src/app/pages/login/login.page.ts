import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false, // Indique que ce n'est pas un composant autonome
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@example.com' && this.password === '123456') {
      // Si rememberMe est coché, vous pourriez sauvegarder les informations dans localStorage
      if (this.rememberMe) {
        localStorage.setItem('rememberedUser', this.email);
      }
      
      // Rediriger vers la page d'accueil après connexion
      this.router.navigate(['/home']);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
}




// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
