import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  encryptionpass:string='cimrhospitalmanagment'

  encrypted: string='';
  decryptedData:string='';
  dataToEncrypt:string='';
  encryptedData:string='';

  secretkey:string='PatientInfo'
  constructor(private router:Router,private toastc:ToastController,private loadingController:LoadingController) { 
    
  this.secretkey='PatientInfo'
    this.dataToEncrypt=''
    this.encryptedData=''
    this.decryptedData=''
    this.encrypted=''
  }

  Logoutfn(){
    localStorage.clear();
    this.router.navigate(['login'])

  }
 

  EncryptToken(dataToencrypt:string)
  {  
    // console.log(dataToencrypt,'data to encrypt');
    
  this.dataToEncrypt = dataToencrypt
  

  this.encryptedData = CryptoJS.AES.encrypt(this.dataToEncrypt, this.secretkey).toString();
  // console.log(this.encryptedData,"encrypteddata");
  
  
  let type={
    Name:this.encryptedData
  }
      localStorage.setItem('type',JSON.stringify(type))
  }

  DecryptToken() {
    if (localStorage.getItem('type')) {
      this.encrypted = JSON.parse(`${localStorage.getItem('type')}`).Name;
      // console.log(this.encrypted,"encryptedindwecrytoy");
  
      try {
        let dat  = CryptoJS.AES.decrypt(this.encrypted, this.secretkey);
        this.decryptedData = dat.toString(CryptoJS.enc.Utf8);
        // this.decryptedData = CryptoJS.AES.decrypt(this.encrypted, this.secretkey).toString(CryptoJS.enc.Utf8);
        // console.log(this.decryptedData);
  
        if (this.decryptedData) {
          return this.decryptedData;
        } else {
          // Handle the case where decryption failed or resulted in an empty string.
          console.error('Decryption failed or resulted in an empty string.');
          return null;
        }
      } catch (error) {
        // Handle decryption errors
        console.error('Error during decryption:', error);
        return null;
      }
    } else {
      localStorage.clear();
      this.router.navigate(['login']);
      return null;
    }
  }

  async ShowToastAlert(){
    console.log("sdjfgsdgfjh");
    
   
      let title='Token Expired Please Login Again'
      // let body='Added'
      // let loading = await this.loadingController.create({
      //   message: 'Please wait...',
      // });
      // loading.present()
      const toast=await this.toastc.create({
        header:title,
        // message:body,
        position:'top',
        duration:5000,
       
      })
      // loading.dismiss()
      toast.present() 
  
    
  }


  Encrypt(data: any, key: string=this.encryptionpass): string {
    const stringData = JSON.stringify(data); // Convert the data to a string
    return CryptoJS.AES.encrypt(stringData, key).toString();
  }

  // Decryption
  Decrypt(encryptedData: string, key: string=this.encryptionpass): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }


}
