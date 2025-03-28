import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { DiscountUpdate } from 'src/class/DiscountUpdate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount-requests',
  templateUrl: './discount-requests.page.html',
  styleUrls: ['./discount-requests.page.scss'],
})
export class DiscountRequestsPage implements OnInit {

    Today:any
  fromdate:any
  todate:any
  requestType:string='op'
  //op
  //procedure
  ReportData:any[]=[]
  opdatalist:any[]=[]
  procdatalist:any[]=[]
  du = new DiscountUpdate()
  RStatusOP:string=""
  RStatusPROC:string=""
  opdatalistDup: any;
  procdatalistDup: any;

  constructor(
    private datepipe:DatePipe,private comser:CommonService,private loader:LoadingController) { 

    this.Today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromdate=this.Today
    this.todate=this.Today
    this.getreport()
  }

  ngOnInit() {
  }

  StatusCahnge(event:any){
   let val = event.target.value
    if(this.requestType=='op')
    {
      this.RstatuschangeOP(val)
    }
    else
    {
      this.RstatuschangePROC(val)
    }
  }

  RstatuschangeOP(event:any){
    let val  = event
    if(val=='all')
    {
      this.opdatalist = this.opdatalistDup
    }
    else
    {
      this.opdatalist = this.opdatalistDup.filter((x:any)=>x.RequestStatus == val)
    }

  }

  RstatuschangePROC(event:any){
    let val  = event
    if(val=='all')
    {
      this.procdatalist = this.procdatalistDup
    }
    else
    {
      this.procdatalist = this.procdatalistDup.filter((x:any)=>x.RequestStatus == val)
    }

  }

  requestypeChange(type:string){
    if(type=='procedure')
    {
      this.requestType='procedure'
      this.LabReport()

    }
    else
    {
      this.requestType='op'
      this.OpReport()
    }

  }

  async getreport()
  {
    if(this.requestType=='op')
    {
      this.OpReport()
    }
    else
    {
      this.LabReport()
    }  
 
  }

  TableNullCheck(){
    if(this.procdatalist.length==0 && this.opdatalist.length==0)
    {
      return true
    }
    else 
    {
      return false
    }
  }

  async OpReport(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.GetBillDiscountsAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'opdatalist');
        this.opdatalistDup=data
        this.opdatalist=data.filter((x:any)=>x.RequestStatus==this.RStatusPROC)
        this.procdatalist=[]
        this.procdatalistDup=[]
     
        
      }
      else
      {
        this.opdatalist=[]
        this.opdatalistDup=[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async LabReport(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();
    this.comser.GetLabDiscountApprovalsAsync(this.fromdate,this.todate).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'procdatalist');
        this.procdatalistDup = data
        this.procdatalist=data.filter((x:any)=>x.RequestStatus==this.RStatusPROC)
        this.opdatalist=[]
        this.opdatalistDup=[]

     
        
      }
      else
      {
        this.procdatalistDup =[]
        this.procdatalist=[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
  }


  formatText(input: string, maxLength: number = 16): string {
    if (!input) return '';
    return input
      .match(new RegExp(`.{1,${maxLength}}`, 'g')) // Break into chunks of `maxLength`
      ?.join('\n') || ''; // Join with a newline character
  }

  DoCalculation(rate:number,da:number){
    console.log(rate,da);
    
    return rate - da

  }

  AddDiscountPercentageLabreport(event: any, i: any, amount: any) {
    let percentage = event.target.value;
    this.procdatalist[i].DiscountPercentage = percentage;
  
    if (amount <= 0 || percentage <= 0) {
      this.procdatalist[i].DiscountAmount = 0;
    } else {
      const deduction = (amount * percentage) / 100;
      this.procdatalist[i].DiscountAmount = parseFloat(deduction.toFixed(2)); // Restrict to 2 decimal places
    }
  }
  
  AddDiscountAmountLabReport(event: any, i: any, totalAmount: any) {
    let deduction = event.target.value;
    this.procdatalist[i].DiscountAmount = deduction;
  
    if (totalAmount <= 0 || deduction <= 0 || deduction > totalAmount) {
      this.procdatalist[i].DiscountPercentage = 0;
    } else {
      const percentage = (deduction / totalAmount) * 100;
      this.procdatalist[i].DiscountPercentage = parseFloat(percentage.toFixed(2)); // Restrict to 2 decimal places
    }
  }
  

  AddApprovalRemarksLabReport(event:any,i:any)
  {
    let ApprovalRemarks = event.target.value
    
    this.procdatalist[i].ApprovalRemarks = ApprovalRemarks
  }
  

  AddDiscountPerOP(event:any,i:any)
  {
    let val  = event.target.value
    this.opdatalist[i].DiscountPercentage=val
  }


  AddDiscountAmoutOP(event:any,i:any)
  {
    let val  = event.target.value
    this.opdatalist[i].DiscountAmount=val

  }


  AddAppRemarkOP(event:any,i:any)
  {
    let val  = event.target.value
    this.opdatalist[i].ApprovalRemarks=val

  }

 async OpDiscountApp(items:any)
  {
    console.log(items);
    this.du.requestId = items.RequestId
    this.du.discountAmount = items.DiscountAmount
    this.du.discountPercentage = items.discountPercentage
    this.du.remarks  =items.ApprovalRemarks
    this.du.status = ''

    let arr = []
    arr.push(this.du)
    
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.UpdateOpDiscountAppAsync(arr).subscribe((data:any)=>{
      console.log(data,'approval');
      
      loading.dismiss()
      this.du = new DiscountUpdate()
      if(data)
      {
        if(data.Status==200)

          {
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })
  }

  async OpDiscountApproveAll(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();
    let Status:string
    let arr  =[]

    for(let a = 0;a<this.opdatalist.length;a++)
    {
      
      this.du = new DiscountUpdate()
      this.du.requestId = this.opdatalist[a].RequestId
      this.du.discountAmount = this.opdatalist[a].DiscountAmount
      this.du.discountPercentage = this.opdatalist[a].discountPercentage
      this.du.remarks  =this.opdatalist[a].ApprovalRemarks
      this.du.status=''       
      arr.push(this.du)

    }
    this.du  = new DiscountUpdate()
    this.comser.UpdateOpDiscountAppAsync(arr).subscribe((data:any)=>{
      console.log(data,'accept');
      
      loading.dismiss()
      if(data)
      {
        if(data.Status==200)

          {
            
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

 async OpDiscountRej(items:any)
  {

    this.du.requestId = items.RequestId
    this.du.discountAmount = items.DiscountAmount
    this.du.discountPercentage = items.discountPercentage
    this.du.remarks  =items.ApprovalRemarks

    let arr = []
    arr.push(this.du)
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.du  = new DiscountUpdate()
    this.comser.RejectOPDiscountAsync(arr).subscribe((data:any)=>{
      console.log(data,'rejhect');
      
      loading.dismiss()
      if(data)
      {
        if(data.Status==200)

          {
            
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })


  }

  async OpDiscountRejectAll(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();
    let Status:string
    let arr  =[]

    for(let a = 0;a<this.opdatalist.length;a++)
    {
      
      this.du = new DiscountUpdate()
      this.du.requestId = this.opdatalist[a].RequestId
      this.du.discountAmount = this.opdatalist[a].DiscountAmount
      this.du.discountPercentage = this.opdatalist[a].discountPercentage
      this.du.remarks  =this.opdatalist[a].ApprovalRemarks
      this.du.status=''       
      arr.push(this.du)

    }
    this.du  = new DiscountUpdate()
    this.comser.RejectOPDiscountAsync(arr).subscribe((data:any)=>{
      console.log(data,'rejhect');
      
      loading.dismiss()
      if(data)
      {
        if(data.Status==200)

          {
            
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async BillProcDiscountAppAndRej(items:any,type:number)
  {
    console.log(items);
    let Status:string
    this.du.requestId = items.RequestId
    this.du.discountAmount = items.DiscountAmount
    this.du.discountPercentage = items.discountPercentage
    this.du.remarks  =items.ApprovalRemarks


    if(type==1) //Accept
    {
      this.du.status='A'
    }
    else   //Reject
    {
      this.du.status='R'
    }

    let arr  =[]
    arr.push(this.du)
    
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.comser.UpdateLbmRequestAsync(arr).subscribe((data:any)=>{
      console.log(data,'lab approval');
        this.du = new DiscountUpdate()
      loading.dismiss()
      if(data)
      {
        if(data.Status==200)

          {
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })


  }


  async AcceptAndRejectAllProc(St:string){
    // alert('sdfsdf')
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();
    let Status:string
    let arr  =[]

    for(let a = 0;a<this.procdatalist.length;a++)
    {
      
      this.du = new DiscountUpdate()
      this.du.requestId = this.procdatalist[a].RequestId
      this.du.discountAmount = this.procdatalist[a].DiscountAmount
      this.du.discountPercentage = this.procdatalist[a].discountPercentage
      this.du.remarks  =this.procdatalist[a].ApprovalRemarks
      this.du.status=St        
      arr.push(this.du)

    }


    this.comser.UpdateLbmRequestAsync(arr).subscribe((data:any)=>{
      console.log(data,'lab approval');
        this.du = new DiscountUpdate()
      loading.dismiss()
      if(data)
      {
        if(data.Status==200)

          {
            this.getreport()
            Swal.fire(data.Message,'','success')
          }
          else
          {
            Swal.fire(data.Message,'','error')
          }
     
        
      }
      else
      {
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

    
  }



}
