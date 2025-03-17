import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesReportSummaryPageRoutingModule } from './sales-report-summary-routing.module';

import { SalesReportSummaryPage } from './sales-report-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesReportSummaryPageRoutingModule
  ],
  declarations: [SalesReportSummaryPage]
})
export class SalesReportSummaryPageModule {}
