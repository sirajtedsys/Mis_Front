import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  subscription: any;

  constructor(private platform: Platform) {
    // Subscribe to the back button event
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to exit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Exit!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Exit the app
          navigator['app'].exitApp();
        }
      });
    });
  }

  // Cleanup subscription to avoid memory leaks
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

// Declare the navigator object to avoid TypeScript errors
declare var navigator: any;
