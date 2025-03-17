import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-op-appointment-stats',
  templateUrl: './op-appointment-stats.page.html',
  styleUrls: ['./op-appointment-stats.page.scss'],
})
export class OpAppointmentStatsPage implements OnInit {

  Today:any
  fromdate:any
  todate:any

  ReportData:any[]=[]
  branch: any;

  constructor(
    private comser:CommonService,
    private repser:ReportService,
    private datepipe:DatePipe,
    private loader:LoadingController,
    private authser:AuthService,

  ) 
  {
    this.Today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromdate=this.Today
    this.todate=this.Today
    this.GetBranch()
    this.GetOnlineAppointmentStats()
   }

  ngOnInit() {
  }

  GetBranch(){
    if(localStorage.getItem('Branch'))
      {
        let encrypted = JSON.parse(`${localStorage.getItem('Branch')}`)
        console.log(encrypted);
        this.branch =  this.authser.Decrypt(encrypted)
        console.log(this.branch);
        
        
      }
  }


  async GetOnlineAppointmentStats(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.repser.GetOnlineAppointmentStats(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data.length>0)
      {
        console.log(data,'opdatalist');
        this.ReportData=this.groupByVisitDate(data)
        console.log(this.ReportData);
        
     
      //   {
      //     "OPVISIT_DATE": "2025-02-12T00:00:00",
      //     "GROSS": 40250,
      //     "CASH": 18920,
      //     "CREDIT": 910,
      //     "CREDIT_CARD": 6120,
      //     "DD": 0,
      //     "INSURANCE": 0,
      //     "CHEQUE": 0,
      //     "DISC": 0,
      //     "INS_DISC": 0,
      //     "NETAMT": 40250,
      //     "REFUND_AMT": 0,
      //     "DUE": 0,
      //     "B_WALLET": 14300,
      //     "VAT": 0,
      //     "STAFF_CREDIT": 0,
      //     "PKG_DISC": 0,
      //     "NOT_COL": 0,
      //     "PREV_COL": 0,
      //     "CREDIT_BILL": 0,
      //     "IP_ADVANCE": 0,
      //     "IP_ADVANCE_REFUND": 0,
      //     "ADV_SETTLED": 0,
      //     "ADV_DEDUCT_AMT": 0,
      //     "CUST_CREDIT_AMT": 0
      // }
      }
      else
      {
        this.ReportData=[]
        Swal.fire('No data Found','','warning')
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }


  groupByVisitDate(data: any[]) {
    // Define the type of grouped as a dictionary with string keys and array of any items
    const grouped: { [key: string]: any[] } = {};

    data.forEach((item: any) => {
        const visitDate = item.BK_VISIT_DATE;
        if (!grouped[visitDate]) {
            grouped[visitDate] = [];
        }
        grouped[visitDate].push(item);
    });

    // Convert the grouped object to an array of grouped data
    return Object.keys(grouped).map(date => ({
        BK_VISIT_DATE: date,
        doctors: grouped[date]
    }));
}
}
