import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';
// import { AppConfig } from 'src/Class/AppConfig';
import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AppConfig } from 'src/class/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  appconfig =new AppConfig()
  decryptiondata:any

  

  constructor(private http:HttpClient,private authser:AuthService,private loadingCtrl:LoadingController,
    private datePipe:DatePipe,) { }
  isLoading:boolean=false
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    // Uncomment below line to auto-hide the loader after 2 seconds (duration)
    // setTimeout(() => loading.dismiss(), 2000);
  }

  async dismissLoading() {
    this.isLoading = false;
    await this.loadingCtrl.dismiss();
  }

  formatDate(date: string): string {
    const transformedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformedDate ? transformedDate : ''; // Handle null case
  }

  //mob view sibe bar
  private mobsidebarStateSubject = new BehaviorSubject<boolean>(false); // false = collapsed, true = expanded
  mobsidebarState$ = this.mobsidebarStateSubject.asObservable();

  togglemobSidebar() {
    this.mobsidebarStateSubject.next(!this.mobsidebarStateSubject.value);
  }

  setmobSidebarState(state: boolean) {
    this.mobsidebarStateSubject.next(state);
  }

  //desk vieew sidebar
  private sidebarStateSubject = new BehaviorSubject<boolean>(true); // false = collapsed, true = expanded
  sidebarState$ = this.sidebarStateSubject.asObservable();

  toggleSidebar() {
    this.sidebarStateSubject.next(!this.sidebarStateSubject.value);
  }

  setSidebarState(state: boolean) {
    this.sidebarStateSubject.next(state);
  }




  GetDecryptedData(){
    this.decryptiondata= this.authser.DecryptToken()
    }

    calculateAge(dob: string): number {
      const birthDate = new Date(dob);
      // console.log(birthDate);
      
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
  
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      // console.log(age);
      
      return age;
    }

    isValidEmail(email: string): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    

  LoginCheck(Username:string,password:string) 
  {
  let cred={
      UserName:Username,
      Password:password

    }
    let headers = new HttpHeaders();
    headers.set("Accept", 'application/json');
    headers.set('Content-Type', 'application/json');
    // headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url + '/Common/CheckLogin',cred, options)
    .pipe(
      
      catchError((error: any) => {
        // Handle the error here or rethrow it as needed
        console.error('Error in LoginCheck:', error);
        return throwError(error); // Rethrow the error
      })
    );
}
GetAllBranches() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/GetAllUserBranches', options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in GetAllUserBranches:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

CallPurchaseOrderProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallPurchaseOrderProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallPurchaseOrderProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

SP_DS_APPNMNT_STS(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/SP_DS_APPNMNT_STS?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in SP_DS_APPNMNT_STS:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
sp_ds_op_sts(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/sp_ds_op_sts?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in SP_DS_APPNMNT_STS:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallDeptRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallDeptRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallDeptRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

DsDoctRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsDoctRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsDoctRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

spInsRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/spInsRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in spInsRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

DsIpRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsIpRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsIpRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcCategoryProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcCategoryProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcCategoryProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcGroupProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcGroupProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcGroupProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcedureProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcedureProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcedureProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsPurchaseProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsPurchaseProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in DsPurchaseProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

CallCollectionSctProcedureAsync(fromd:string,tod:string,branchid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallCollectionSctProcedureAsync?fromd='+fromd+'&tod='+tod+'&branchid='+branchid, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallCollectionSctProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallCollectionProcedureAsync(fromd:string,tod:string,branchid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallCollectionProcedureAsync?fromd='+fromd+'&tod='+tod+'&branchid='+branchid, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallCollectionProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallPackageProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallPackageProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallPackageProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

// CallReferalReportProcedureAsync
CallReferalReportProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallReferalReportProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // Handle the error here or rethrow it as needed
      console.error('Error in CallReferalReportProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}



}
