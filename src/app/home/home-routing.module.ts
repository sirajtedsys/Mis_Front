import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'appointment-cards',
        loadChildren: () => import('./appointment-cards/appointment-cards.module').then( m => m.AppointmentCardsPageModule)
      },
      {
        path: 'leave-request-form',
        loadChildren: () => import('./leave-request-form/leave-request-form.module').then( m => m.LeaveRequestFormPageModule)
      },
      {
        path: 'patient-details',
        loadChildren: () => import('./patient-details/patient-details.module').then( m => m.PatientDetailsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },

    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
