import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrderApprovalPage } from './purchase-order-approval.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrderApprovalPageRoutingModule {}
