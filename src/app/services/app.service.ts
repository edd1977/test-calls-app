import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';


@Injectable()
export class AppService {

    constructor(private http: HttpService) {
        //
    }

    logIn(email: string, pass: string) {
        this.http.Authorize(email, pass)
        .then(resp => alert("LogIn is OK!"))
        .catch(err => alert("LogIn failed."));
    }

}