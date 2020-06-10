import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from 'src/app/services/http.service';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.css' ]
})
export class AuthComponent {

    buttonTitle: string = "Log In";

    email: string;
    password: string;

    constructor(private appSvc: AppService) {
        //    
    }

    doAction(e: any) {
        switch(this.buttonTitle) {
            case "Log In":
                this.appSvc.logIn(this.email, this.password);
                // TODO:
                // Go to another component!!!!
                break;
            case "Register":
                alert("TODO: in progress...");
                break;
        }
    }

}