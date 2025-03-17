import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpAppointmentStatsPageRoutingModule } from './op-appointment-stats-routing.module';

import { OpAppointmentStatsPage } from './op-appointment-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpAppointmentStatsPageRoutingModule
  ],
  declarations: [OpAppointmentStatsPage]
})
export class OpAppointmentStatsPageModule {}
