import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Records, Wrapups } from 'src/app/model/record.model';
import { Users } from 'src/app/model/user.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
    selector: "app-records",
    templateUrl: "./records.component.html",
    styleUrls: [ "./records.component.css" ]
})
export class RecordsComponent {

    records: Records = [];

    faEdit = faEdit;

    constructor(private appSvc: AppService) {
        //
    }

    async ngOnInit() {
        this.records = await this.appSvc.getRecords();
        // records.component:
        console.log(this.records);
    }

}