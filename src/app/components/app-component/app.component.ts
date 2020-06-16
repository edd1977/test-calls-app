import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public appSvc: AppService, private router: Router) {
    //
  }

  logOut() {
    if(confirm('Are you really want to leave the program?')) {
      this.appSvc.LogOut();
    }
  }

}
