import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountRequestsPageRoutingModule } from './discount-requests-routing.module';

import { DiscountRequestsPage } from './discount-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountRequestsPageRoutingModule
  ],
  declarations: [DiscountRequestsPage]
})
export class DiscountRequestsPageModule {}
