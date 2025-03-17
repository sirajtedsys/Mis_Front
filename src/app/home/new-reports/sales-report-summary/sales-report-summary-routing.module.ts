import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesReportSummaryPage } from './sales-report-summary.page';

const routes: Routes = [
  {
    path: '',
    component: SalesReportSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesReportSummaryPageRoutingModule {}
