import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveRequestFormPageRoutingModule } from './leave-request-form-routing.module';

import { LeaveRequestFormPage } from './leave-request-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveRequestFormPageRoutingModule
  ],
  declarations: [LeaveRequestFormPage]
})
export class LeaveRequestFormPageModule {}
