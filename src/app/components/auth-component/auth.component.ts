import { Component } from "@angular/core";
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.css' ]
})
export class AuthComponent {

    buttonTitle: string = "Log In";

    email: string;
    password: string;

    constructor(private appSvc: AppService, private router: Router) {
        //    
    }

    doAction(e: any) {
        switch(this.buttonTitle) {
            case "Log In":
                this.appSvc.logIn(this.email, this.password)
                .then(resp => {
                    this.router.navigateByUrl("/records");
                })
                .catch(err => {
                    console.error(err);
                    alert(err);
                });
                
                break;
            case "Register":
                alert("TODO: in progress...");
                break;
        }
    }

    testAction(actionStr: string) {
        switch(actionStr) {
            case "CREDENTIALS":
                this.email = "smile@me.now";
                this.password = "nutedau";
                break;
        }
    }

}