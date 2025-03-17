import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConfig } from 'src/class/AppConfig';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  appconfig =new AppConfig()
  decryptiondata:any

  

  constructor(private http:HttpClient,private authser:AuthService,private loadingCtrl:LoadingController,
    private datePipe:DatePipe,private router:Router) { }

    CheckForUnAuthorised(error:any){
      if(error.status==401)
      {
        // window.location.reload()
        localStorage.clear()
        this.router.navigate(['login'])
      }
  
    }

    GetDecryptedData(){
      this.decryptiondata= this.authser.DecryptToken()
      }


      GetDoctorSummary(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Reports/GetDoctorSummary?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetOnlineCollectionReport:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
// GetOpVisitSummaryReport(string fromd, string tod)
GetOpVisitSummaryReport(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Reports/GetOpVisitSummaryReport?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetOpVisitSummaryReport:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
// GetOnlineAppointmentStats(string fromd, string tod)
GetOnlineAppointmentStats(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Reports/GetOnlineAppointmentStats?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetOnlineAppointmentStats:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
// GetDoctorSummary(string fromd, string tod)
GetOnlineCollectionReport(fromd:string,tod:string,brid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Reports/GetOnlineCollectionReport?fromd='+fromd+'&tod='+tod+'&branchID='+brid, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetOnlineCollectionReport:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
}


