import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpAppointmentStatsPage } from './op-appointment-stats.page';

const routes: Routes = [
  {
    path: '',
    component: OpAppointmentStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpAppointmentStatsPageRoutingModule {}
