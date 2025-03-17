import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalCollectionPageRoutingModule } from './hospital-collection-routing.module';

import { HospitalCollectionPage } from './hospital-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalCollectionPageRoutingModule
  ],
  declarations: [HospitalCollectionPage]
})
export class HospitalCollectionPageModule {}
