import { Component, ViewChild, ElementRef } from "@angular/core";
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

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
                const u = new User();
                u.email = this.email;
                u.password = this.password;
                this.appSvc.addUser(u)
                //Promise.resolve<User>(new User())
                .then(u => {
                    this.buttonTitle = "Log In";
                    alert("Register is done!")
                }).catch(err => {
                    let mess = "";
                    if(typeof(err) === "object") {
                        mess = `(${err.status}) ${err.error}`;
                    } else {
                        mess = err;
                    }
                    console.error(err);
                    alert(mess);
                });
                break;
        }
    }

    // quick set of the default user data
    testAction(actionStr: string) {
        switch(actionStr) {
            case "CREDENTIALS":
                this.email = "smile@me.now";
                this.password = "nutedau";
                break;
        }
    }

}