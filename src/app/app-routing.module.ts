


// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// const routes: Routes = [
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
//   },
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//   },
//   {
//     path: 'qrcode',
//     loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
//   },
//   {
//     path: 'presence-options',
//     loadChildren: () => import('./pages/presence-options/presence-options.module').then( m => m.PresenceOptionsPageModule)
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Assurez-vous que le chemin est correct

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule),
    canActivate: [AuthGuard]
  },
  { // NOUVELLE ROUTE CI-DESSOUS CHARGEANT UN COMPOSANT STANDALONE
    path: 'presence-options',
    loadComponent: () => import('./pages/presence-options/presence-options.page').then( m => m.PresenceOptionsPage),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }