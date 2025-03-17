import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpVisitSummaryPage } from './op-visit-summary.page';

const routes: Routes = [
  {
    path: '',
    component: OpVisitSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpVisitSummaryPageRoutingModule {}
