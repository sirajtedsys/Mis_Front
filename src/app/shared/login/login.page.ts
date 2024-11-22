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

    // alert("welocmm")
   }

  ngOnInit() {

  }

  // async GetAllUserBranches(menugpid: any) {  
  //   const loading = await this.loader.create({
  //     cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
  //     message: 'Loading...', // Optional: Custom message
  //     spinner: 'dots', // Optional: Choose a spinner
  //     // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
  //   });
  //   await loading.present();
  
  //   // this.comser.GetAllTRabsByMEnuygroupid(menugpid).subscribe(
  //   //   (data: any) => {
  //   //     console.log(data);
  //   //     loading.dismiss();
  
    
  //   //   },
  //   //   (error: any) => {
  //   //     console.error('Error fetching user rights:', error);
  //   //     loading.dismiss();
  //   //     Swal.fire('Error fetching user rights', '', 'error');
  //   //   }
  //   // );
  // }

  handleSingleBranch() {
    const encryptcode = this.authser.Encrypt(this.BranchList[0]);
    localStorage.setItem('Branch', JSON.stringify(encryptcode));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
    });
    this.router.navigate(['home/appointment-cards']);
  }
  
  async Submit() {
    const loading = await this.loader.create({
      cssClass: 'custom-loading',
      message: 'Loading...',
      spinner: 'dots',
    });
    await loading.present();
  
    this.comser.LoginCheck(this.Username, this.Password).subscribe({
      next: async (data: any) => {
        loading.dismiss();
        if (data?.Status === 200 && data?.Message) {
          this.authser.EncryptToken(data.Message);
          await loading.present();
  
          this.comser.GetAllBranches().subscribe({
            next: (data1: any) => {
              loading.dismiss();
              if (data1 && data1.length) {
                this.BranchList = data1;
                if (this.BranchList.length === 1) {
                  this.handleSingleBranch();
                } else {
                  Swal.fire('Select a Branch to continue', '', 'info');
                }
              } else {
                Swal.fire('No branches found', 'Contact Administrator', 'error');
              }
            },
            error: () => {
              loading.dismiss();
              Swal.fire('Error fetching branches', '', 'error');
            },
          });
        } else {
          Swal.fire(data.Message || 'Invalid login', '', 'warning');
        }
      },
      error: (error: any) => {
        loading.dismiss();
        Swal.fire('Login failed', 'Please check your credentials', 'error');
      },
    });
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
    console.log(data);
    
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
