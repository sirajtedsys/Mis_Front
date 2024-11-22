import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { POADetailsPage } from './p-o-a-details.page';

const routes: Routes = [
  {
    path: '',
    component: POADetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class POADetailsPageRoutingModule {}
