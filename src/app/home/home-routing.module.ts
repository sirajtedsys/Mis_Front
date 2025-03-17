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
      {
        path: 'discount-requests',
        loadChildren: () => import('./discount-requests/discount-requests.module').then( m => m.DiscountRequestsPageModule)
      },
      {
        path: 'purchase-order-approval',
        loadChildren: () => import('./purchase-order-approval/purchase-order-approval.module').then( m => m.PurchaseOrderApprovalPageModule)
      },
      {
        path: 'p-o-a-details',
        loadChildren: () => import('./p-o-a-details/p-o-a-details.module').then( m => m.POADetailsPageModule)
      },
      {
        path: 'sales-report-summary',
        loadChildren: () => import('./new-reports/sales-report-summary/sales-report-summary.module').then( m => m.SalesReportSummaryPageModule)
      },
      {
        path: 'hospital-collection',
        loadChildren: () => import('./new-reports/hospital-collection/hospital-collection.module').then( m => m.HospitalCollectionPageModule)
      },
      {
        path: 'op-visit-summary',
        loadChildren: () => import('./new-reports/op-visit-summary/op-visit-summary.module').then( m => m.OpVisitSummaryPageModule)
      },
      {
        path: 'op-appointment-stats',
        loadChildren: () => import('./new-reports/op-appointment-stats/op-appointment-stats.module').then( m => m.OpAppointmentStatsPageModule)
      },
      {
        path: 'overview-rep-sum',
        loadChildren: () => import('./new-reports/overview-rep-sum/overview-rep-sum.module').then( m => m.OverviewRepSumPageModule)
      },

    ]
  },
  

 


 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
