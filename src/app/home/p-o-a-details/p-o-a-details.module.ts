import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { POADetailsPageRoutingModule } from './p-o-a-details-routing.module';

import { POADetailsPage } from './p-o-a-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    POADetailsPageRoutingModule
  ],
  declarations: [POADetailsPage]
})
export class POADetailsPageModule {}
