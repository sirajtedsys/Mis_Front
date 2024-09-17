import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCardsPage } from './appointment-cards.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentCardsPageRoutingModule {}
