import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Import du composant QRCodeComponent au lieu du module
// import { QRCodeComponent } from 'angularx-qrcode';

import { QrcodePageRoutingModule } from './qrcode-routing.module';
import { QrcodePage } from './qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(), // Ajout de forRoot() pour s'assurer que tous les composants Ionic sont disponibles
    QrcodePageRoutingModule,
  ],
  declarations: [
    QrcodePage,
    // QRCodeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Added NO_ERRORS_SCHEMA
})
export class QrcodePageModule {}
