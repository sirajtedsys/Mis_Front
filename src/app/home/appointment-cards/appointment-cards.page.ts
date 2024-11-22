import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-appointment-cards',
  templateUrl: './appointment-cards.page.html',
  styleUrls: ['./appointment-cards.page.scss'],
})


export class AppointmentCardsPage implements OnInit {
  Today:any
  fromdate:any
  todate:any
// AppointmentsList:Appointment[]=[]
TokenTotal: number=0;  //9
NewBooked: number=0; //9
NewVisited: number=0;//9
RevisitBooked: number=0;//9//9
RevisitVisited: number=0;//9
ReportBooked: number=0;//9
ReportVisited: number=0;//9

  DsIpRevProcedureAsyncdata:any[]=[]  //1
  DsPurchaseProcedureAsyncdata:any[]=[] //2
  DsDoctRevProcedureAsyncevProcedureAsyncdata: any[]=[];  //3
  DsProcCategoryProcedureAsyncDATA:any[]=[]//4
  DsProcGroupProcedureAsyncdata:any[]=[]//5
  DsProcedureProcedureAsyncDATA:any[]=[]  //6
  CallCollectionSctProcedureAsyncdata: any[]=[] //7;
  CallCollectionProcedureAsyncdata:any[]= [{
    Cash: null,  // Assuming you want to allow any type for 'Cash'
    Credit: null,
    CreditCard: null,
    OT: null,
    Insurance: null,
    Cheque: null,
    BWallet: null,
    Total: null
  }];//8;
  CallPurchaseOrderProcedureAsyncdata: any[]=[]  ////10;
  CallPackageProcedureAsyncdata: any[]=[]  //11;
  spInsRevProcedureAsyncdata: any[]=[] //12;
  CallDeptRevProcedureAsyncdata: any[]=[]//13;
  sp_ds_op_stsdata:any[]=[] //14
  stsdataTotal: any;
  stsdataPayType: any;
  stsdataRevisitNo: any;
  stsdataFreeNo: any;
  stsdataNew: any;
  stsdataPrcNo: any;
  CallReferalReportProcedureAsyncdata: any[]=[]//15;


  PriorityData:any[]=[]


  constructor(

    private comser:CommonService,
    private loader:LoadingController,
    private datepipe:DatePipe,
    private authser:AuthService
  ) 
  { 
    this.Today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromdate=this.Today
    this.todate=this.Today
    this.GetUserPreference()
    this.GetReport()

    // this.CallCollectionProcedureAsyncdata = [{
    //   Cash: null,  // Assuming you want to allow any type for 'Cash'
    //   Credit: null,
    //   CreditCard: null,
    //   OT: null,
    //   Insurance: null,
    //   Cheque: null,
    //   BWallet: null,
    //   Total: null
    // }];
    
  }   

  ngOnInit() {
  }




  InnerHtmlTables(){

    let AppointmnetStatics = `
  <div class="col-lg-4 my-1">
    <div class="card app-cards">
      <h5>Appointments</h5>
      <div class="app-det">
        <span>TOKEN</span>
        <span>{{TokenTotal}}</span>
      </div>
      <div class="app-det">
        <span>NEW BOOKING</span>
        <span>{{NewBooked}}</span>
      </div>
      <div class="app-det">
        <span>REVISIT BOOKED</span>
        <span>{{RevisitBooked}}</span>
      </div>
      <div class="app-det">
        <span>REVISIT VISITED</span>
        <span>{{RevisitVisited}}</span>
      </div>
      <div class="app-det">
        <span>NEW VISIT</span>
        <span>{{NewVisited}}</span>
      </div>
    </div>
  </div>
`;



// Now you can use htmlContent as innerHTML in JavaScript or TypeScript
    // document.getElementById("tableview").innerHTML = htmlContent;


  }
  
  

  GetReport(){

    if(this.fromdate<=this.Today)
      {
        if(this.todate<=this.Today)
        {
          if(this.todate>=this.fromdate)
          {
            this.AppointmentReport()
            this.sp_ds_op_sts()
            this.CallDeptRevProcedureAsync()
            this.DsDoctRevProcedureAsync()
            this.spInsRevProcedureAsync()
            this.DsIpRevProcedureAsync()
            this.DsProcCategoryProcedureAsync()
            this.DsProcGroupProcedureAsync()
            this.DsProcedureProcedureAsync()
            this.DsPurchaseProcedureAsync()
            this.CallCollectionProcedureAsync()
            this.CallCollectionSctProcedureAsync()
            this.CallPackageProcedureAsync()
            this.CallPurchaseOrderProcedureAsync()
            this.CallReferalReportProcedureAsync()
            // this.CallDeptRevProcedureAsync()
  
          }
          else
          {
            Swal.fire('Fromdate should not exceed to date')
          }
  
        }
        else
        {
          Swal.fire('Todate should not exceed Todays date','','warning')
        }
  
      }
      else
      {
        Swal.fire('From date should not exceed todays date','','warning')
      }

  }

  async GetUserPreference() {
    const loading = await this.loader.create({
      cssClass: 'custom-loading',
      message: 'Loading...',
      spinner: 'dots',
    });
    await loading.present();
  
    this.comser.GetAppMenuAsync().subscribe(
      (data: any) => {
        loading.dismiss();
        console.log(JSON.parse(JSON.stringify(data)),'untouched priorit');
        // data.splice(8, 1);
  
        if (data && Array.isArray(data)) {
          // Assign priorities
          // if (data.length > 9 && data[9]) {
          //   data[9].Priority = 1;
          // }
          // if (data.length > 14 && data[14]) {
          //   data[14].Priority = 2;
          // }
          // if (data.length > 10 && data[10]) {
          //   data[10].Priority = 3;
          // }
  
          // Filter and sort data
          let data1 = data.filter((item: any) => item && typeof item.Priority == 'undefined' || item.Priority == null);
          data = data.filter((item: any) => item && typeof item.Priority !== 'undefined' && item.Priority != null);
  
          // Sort the data based on Priority
          data = data.sort((a: any, b: any) => a.Priority - b.Priority);
          data.push(...data1); // Append unprioritized items at the end
  
          this.PriorityData = data;
          console.log(this.PriorityData,"priority data");
          
        }
        else
        {
          Swal.fire("Zero reports Assigned,Contact Administrator",'','warning')
        }
      },
      (error: any) => {
        loading.dismiss();
      }
    );
  }
  

  VIewPerPriorityORder(LinkName:any){
    if(this.PriorityData.length>0)
    {
      let Priority = this.PriorityData.find((x:any)=>x.Link == LinkName)
      return Priority
    }

  }

  // CheckTheReportRight(link:any){
  //   if(this.PriorityData.length>0)
  //   {
  //     return this.PriorityData.some((x:any)=>x.Link == link)
  //   }
  //   else
  //   {
  //     return false
  //   }

  // }
  
// {
//   [
//     {
//         "TabName": "Package wise Revenue",
//         "Link": "PACKAGEWISE_REVENUE",
//         "Priority": 1
//     },
//     {
//         "TabName": "Visit Statistics",
//         "Link": "VISIT_STATISTICS",
//         "Priority": 2
//     },
//     {
//         "TabName": "Procedure wise Revenue",
//         "Link": "PROCEDUREWISE_REVENUE",
//         "Priority": 3
//     },
//     {
//         "TabName": "Appointment Statistics",
//         "Link": "APPOINTMENT_STATISTICS",
//         "Priority": null
//     },
//     {
//         "TabName": "Category wise Revenue",
//         "Link": "CATEGORYWISE_REVENUE",
//         "Priority": null
//     },
//     {
//         "TabName": "Collection",
//         "Link": "COLLECTION",
//         "Priority": null
//     },
//     {
//         "TabName": "Department Revenue",
//         "Link": "DEPARTMENT_REVENUE",
//         "Priority": null
//     },
//     {
//         "TabName": "Doctor References",
//         "Link": "DOCTOR_REFERENCES",
//         "Priority": null
//     },
//     {
//         "TabName": "Doctor wise Revenue",
//         "Link": "DOCTORWISE_REVENUE",
//         "Priority": null
//     },
//     {
//         "TabName": "Group wise Revenue",
//         "Link": "GROUPWISE_REVENUE",
//         "Priority": null
//     },
//     {
//         "TabName": "IP Income",
//         "Link": "IP_INCOME",
//         "Priority": null
//     },
//     {
//         "TabName": "Insurance Receivables",
//         "Link": "INSURANCE_RECEIVABLES",
//         "Priority": null
//     },
//     {
//         "TabName": "Purchase Details",
//         "Link": "PURCHASE_DETAILS",
//         "Priority": null
//     },
//     {
//         "TabName": "Purchase Order Details",
//         "Link": "PURCHASE_ORDER_DETAILS",
//         "Priority": null
//     },
//     {
//         "TabName": "Section wise Collections",
//         "Link": "SECTIONWISE_COLLECTIONS",
//         "Priority": null
//     }
// ]
// }
  async AppointmentReport()
  {
  
          const loading = await this.loader.create({
            cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
            message: 'Loading...', // Optional: Custom message
            spinner: 'dots', // Optional: Choose a spinner
            // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
          });
          await loading.present();
      
          this.comser.SP_DS_APPNMNT_STS(this.fromdate,this.todate).subscribe((data:any)=>{
            loading.dismiss()
            if(data)
            {
              console.log(data);
              if(data.length>0)
              {
                // this.AppointmentsList=data[0]
                this.NewBooked=data[0].NewBooked==null?0:data[0].NewBooked;
                this.NewVisited=data[0].NewVisited ==null?0:data[0].NewVisited;
                this.ReportBooked=data[0].ReportBooked == null?0:data[0].ReportBooked
                this.ReportVisited=data[0].ReportVisited==null?0:data[0].ReportVisited
                this.TokenTotal=data[0].TokenTotal == null?0:data[0].TokenTotal
                this.RevisitBooked=data[0].RevisitBooked==null?0:data[0].RevisitBooked
                this.RevisitVisited=data[0].RevisitVisited==null?0:data[0].RevisitVisited
              }
              else
              {
                this.TokenTotal=0;
                this.NewBooked=0;
                this.NewVisited=0;
                this.RevisitBooked=0;
                this.RevisitVisited=0;
                this.ReportBooked=0;
                this.ReportVisited=0;

              }
              
            }
          },
        (error:any)=>{
          loading.dismiss()
        })

      
 
  }


  //14
  async sp_ds_op_sts()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.sp_ds_op_sts(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'spdsopsts//14');
        this.sp_ds_op_stsdata=data

        this.stsdataNew = data[0].NewNo
        this.stsdataFreeNo = data[0].FreeNo
        this.stsdataRevisitNo = data[0].RevisitNo
        this.stsdataPrcNo= data[0].PrcNo
        this.stsdataPayType = data[0].PayType
        this.stsdataTotal = data[0].Total
        // this.stsdataNew = data[0].NewNo
     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  //13
  async CallDeptRevProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.CallDeptRevProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'CallDeptRevProcedureAsyncdata//13');
        this.CallDeptRevProcedureAsyncdata=data
     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async DsDoctRevProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsDoctRevProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsDoctRevProcedureAsyncevProcedureAsyncdata////3');
        this.DsDoctRevProcedureAsyncevProcedureAsyncdata=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  //12
  async spInsRevProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.spInsRevProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'spInsRevProcedureAsyncdata//12');
       this. spInsRevProcedureAsyncdata=data
     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async DsIpRevProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsIpRevProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsIpRevProcedureAsync////1');
        this.DsIpRevProcedureAsyncdata=data

     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async DsProcCategoryProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsProcCategoryProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsProcCategoryProcedureAsync///4');
        this.DsProcCategoryProcedureAsyncDATA=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }
  async DsProcGroupProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsProcGroupProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsProcGroupProcedureAsync///5');
        this.DsProcGroupProcedureAsyncdata=data
     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async DsProcedureProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsProcedureProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsProcedureProcedureAsync///6');
        this.DsProcedureProcedureAsyncDATA = data
     
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }
  
  async DsPurchaseProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.DsPurchaseProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'DsPurchaseProcedureAsync////2');
        this.DsPurchaseProcedureAsyncdata=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async CallCollectionSctProcedureAsync()
  {
    let branch

    if(localStorage.getItem('Branch'))
    {
      let encrypted = JSON.parse(`${localStorage.getItem('Branch')}`)
      console.log(encrypted);
      branch =  this.authser.Decrypt(encrypted)
      
    }

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.CallCollectionSctProcedureAsync(this.fromdate,this.todate,branch.BRANCH_ID).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'CallCollectionSctProcedureAsync////7');
        this.CallCollectionSctProcedureAsyncdata=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  async CallCollectionProcedureAsync()
  {

    let branch

    if(localStorage.getItem('Branch'))
    {
      let encrypted = JSON.parse(`${localStorage.getItem('Branch')}`)
      console.log(encrypted);
      branch =  this.authser.Decrypt(encrypted)
      
    }

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.CallCollectionProcedureAsync(this.fromdate,this.todate,branch.BRANCH_ID).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'CallCollectionProcedureAsync////8');
        this.CallCollectionProcedureAsyncdata=data

        
        // "Cash": 154299.82,
        // "Credit": 1455,
        // "CreditCard": 1362.5,
        // "OT": 300,
        // "Insurance": 0,
        // "Cheque": 0,
        // "BWallet": 3280,
        // "Total": 160697.32
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }


  //10
  async CallPurchaseOrderProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.CallPurchaseOrderProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'CallPurchaseOrderProcedureAsync////10');
        this.CallPurchaseOrderProcedureAsyncdata=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

  //11
  async CallPackageProcedureAsync()
  {

    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.CallPackageProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'CallPackageProcedureAsync////11');
        this.CallPackageProcedureAsyncdata=data
        
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
   
 
  }

   //15
   async CallReferalReportProcedureAsync()
   {
 
     const loading = await this.loader.create({
       cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
       message: 'Loading...', // Optional: Custom message
       spinner: 'dots', // Optional: Choose a spinner
       // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
     });
     await loading.present();
 
     this.comser.CallReferalReportProcedureAsync(this.fromdate,this.todate).subscribe((data:any)=>{
       loading.dismiss()
       if(data)
       {
         console.log(data,'CallReferalReportProcedureAsync////15');
         this.CallReferalReportProcedureAsyncdata=data
         
       }
     },
   (error:any)=>{
     loading.dismiss()
   })
    
  
   }

   calculateTotal(items: any, key: string): number {
    return items.reduce((acc:any, item:any) => acc + (item[key] || 0), 0);
}

  



}


