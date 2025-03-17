import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalCollectionPage } from './hospital-collection.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalCollectionPageRoutingModule {}
