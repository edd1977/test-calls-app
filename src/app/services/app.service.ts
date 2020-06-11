import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Records } from '../model/record.model';


@Injectable()
export class AppService {

    records: Records = [];

    constructor(private http: HttpService) {
        //
    }

    logIn(email: string, pass: string): Promise<any> {
        return this.http.Authorize(email, pass);
    }

    async getRecords() {
        const resp = await this.http.getRecords();
        console.log(resp);
    }

}