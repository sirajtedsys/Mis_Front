import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrderApprovalPageRoutingModule } from './purchase-order-approval-routing.module';

import { PurchaseOrderApprovalPage } from './purchase-order-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrderApprovalPageRoutingModule
  ],
  declarations: [PurchaseOrderApprovalPage]
})
export class PurchaseOrderApprovalPageModule {}
