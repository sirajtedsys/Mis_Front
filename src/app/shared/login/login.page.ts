import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Username:string=''
  Password:string=''
  Branch:number=0 
  BranchList:any[]=[]
  ShowBranch:boolean=false

  constructor(
    private loader:LoadingController,
    private comser:CommonService,
    private authser:AuthService,
    private router:Router
  ) {
    this.AutoLogin()
   }

  ngOnInit() {

  }

  async GetAllUserBranches(menugpid: any) {  
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();
  
    // this.comser.GetAllTRabsByMEnuygroupid(menugpid).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     loading.dismiss();
  
    
    //   },
    //   (error: any) => {
    //     console.error('Error fetching user rights:', error);
    //     loading.dismiss();
    //     Swal.fire('Error fetching user rights', '', 'error');
    //   }
    // );
  }
 async Submit(){

    const loading = await this.loader.create({
      cssClass: 'custom-loading',
      message: 'Loading...', 
      spinner: 'dots', 
      
    });
    await loading.present();
    this.comser.LoginCheck(this.Username,this.Password).subscribe(async (data:any)=>{
      loading.dismiss()
      if(data)
      {
        //if username and password is correct then it will return 200 as status and token as Message
        if(data.Status==200 && data.Message!=null)
        {
          //lets give teh token for encryption and save on localstorage
          this.authser.EncryptToken(data.Message)

          await loading.present()

          this.comser.GetAllBranches().subscribe((data1:any)=>{
            
           loading.dismiss()
            if(data1 && data1!=null)
            {
              this.BranchList=data1
              console.log(this.BranchList,'branchlist');
              
              if(this.BranchList.length==1 )
              {
                
     let encryptcode =  this.authser.Encrypt(this.BranchList[0])
     localStorage.setItem('Branch',JSON.stringify(encryptcode))
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Signed in successfully"
                });
                this.router.navigate(['home/appointment-cards'])
              }
              else if(this.BranchList.length>1)
              {
                Swal.fire('Select a Branch to continue','','info')
              }
              else
              {
                Swal.fire(data.Message,'','warning')
              }

              
            }
            else
            {
              this.BranchList=[]
            }
          })
          // this.comser.
          


        }
        else
        {
          Swal.fire(data.message,'','warning')
        }
        console.log(data);
        
      }
    },(error:any)=>{
      loading.dismiss()
    })
    
  }

  continue()
  {
    if(this.Branch!=0 && this.Branch!=null)
    {
      let bran = this.BranchList.filter((x:any)=>x.BRANCH_ID==this.Branch)
      
     let encryptcode =  this.authser.Encrypt(bran[0])
     localStorage.setItem('Branch',JSON.stringify(encryptcode))
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      this.router.navigate(['home/appointment-cards'])

    }
    else
    {
      Swal.fire('Please select a Branch')
    }
 
  }

  async AutoLogin(){   
    const loading = await this.loader.create({
   cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
   message: 'Loading...', // Optional: Custom message
   spinner: 'dots', // Optional: Choose a spinner
   // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
 });
 await loading.present();
   this.comser.GetAllBranches().subscribe((data:any)=>{
     // this.comser.dismissLoading()
     loading.dismiss()
     if(data && data!=null)
     {
      console.log(data);
      
      this.BranchList=data

      if(this.BranchList.length==1)
      {
        
     let encryptcode =  this.authser.Encrypt(this.BranchList[0])
     localStorage.setItem('Branch',JSON.stringify(encryptcode))
        this.router.navigate(['home'])
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });

      }
      else if (this.BranchList.length>0)
      {
        Swal.fire('Please select a Branch to continue','','warning')
      }
      else
      {
        Swal.fire(data.Message,'','warning')
      }
  
     }
     else
     {
       Swal.fire('Login Again','','error')
     }
   },
 (error:any)=>{
   // console.log(error);
   // this.comser.dismissLoading()
   loading.dismiss()
   
 })
 }

}
