import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-report-summary',
  templateUrl: './sales-report-summary.page.html',
  styleUrls: ['./sales-report-summary.page.scss'],
})
export class SalesReportSummaryPage implements OnInit {
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
    this.GetDoctorSummary()
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


  async GetDoctorSummary(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.repser.GetDoctorSummary(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data.length>0)
      {
        console.log(data,'opdatalist');
        this.ReportData=data
        console.log(this.ReportData);
        
      //   {
      //     "DOCTOR": "LABORATORY",
      //     "CONS_AMT": 0,
      //     "PROCEDURES": 15150,
      //     "NURSING_PROCEDURES": 0,
      //     "PHARMACY": 0,
      //     "TOTAL": 15150,
      //     "LABORATORY": 0,
      //     "RADIOLOGY": 0
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

