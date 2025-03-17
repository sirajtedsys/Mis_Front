import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpVisitSummaryPageRoutingModule } from './op-visit-summary-routing.module';

import { OpVisitSummaryPage } from './op-visit-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpVisitSummaryPageRoutingModule
  ],
  declarations: [OpVisitSummaryPage]
})
export class OpVisitSummaryPageModule {}
