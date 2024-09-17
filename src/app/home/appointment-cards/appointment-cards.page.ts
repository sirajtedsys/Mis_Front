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

  



}


