import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresenceOptionsPageRoutingModule } from './presence-options-routing.module';

import { PresenceOptionsPage } from './presence-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresenceOptionsPageRoutingModule
  ],
  declarations: [PresenceOptionsPage]
})
export class PresenceOptionsPageModule {}
