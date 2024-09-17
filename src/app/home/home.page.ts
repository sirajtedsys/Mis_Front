import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}


  NavigateTo(url:any)
  {
    this.router.navigate([url])

  }

  LogOut(){
    localStorage.removeItem('type')
    localStorage.removeItem('Branch')
    this.router.navigate(['login'])

  }

}
