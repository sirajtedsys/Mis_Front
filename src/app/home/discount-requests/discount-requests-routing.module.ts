import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountRequestsPage } from './discount-requests.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRequestsPageRoutingModule {}
