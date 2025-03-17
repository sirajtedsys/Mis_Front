import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewRepSumPage } from './overview-rep-sum.page';

const routes: Routes = [
  {
    path: '',
    component: OverviewRepSumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRepSumPageRoutingModule {}
