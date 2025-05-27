import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresenceOptionsPage } from './presence-options.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresenceOptionsPageRoutingModule {}
