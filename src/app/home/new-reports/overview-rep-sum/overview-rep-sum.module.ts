import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverviewRepSumPageRoutingModule } from './overview-rep-sum-routing.module';

import { OverviewRepSumPage } from './overview-rep-sum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverviewRepSumPageRoutingModule
  ],
  declarations: [OverviewRepSumPage]
})
export class OverviewRepSumPageModule {}
