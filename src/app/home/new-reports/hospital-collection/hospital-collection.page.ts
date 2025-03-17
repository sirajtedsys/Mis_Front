import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-hospital-collection',
  templateUrl: './hospital-collection.page.html',
  styleUrls: ['./hospital-collection.page.scss'],
})
export class HospitalCollectionPage implements OnInit {
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
    this.GetOnlineCollectionReport()
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


  async GetOnlineCollectionReport(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.repser.GetOnlineCollectionReport(this.fromdate,this.todate,this.branch.BRANCH_ID).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'opdatalist');
        this.ReportData=data
     
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
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }
}
