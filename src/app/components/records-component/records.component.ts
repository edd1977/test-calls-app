import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';


@Component({
    selector: "app-records",
    templateUrl: "./records.component.html",
    styleUrls: [ "./records.component.css" ]
})
export class RecordsComponent {

    constructor(private appSvc: AppService) {
        //
    }

    ngOnInit() {
        this.appSvc.getRecords();
    }

}