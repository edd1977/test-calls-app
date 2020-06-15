import { Component, ElementRef, ApplicationRef } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Records, Wrapups, Record } from 'src/app/model/record.model';
import { Users } from 'src/app/model/user.model';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import { Agents, Agent as WrapupAgent } from 'src/app/model/agents.model';
import { getForm, getFormModel } from './record.form.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';

@Component({
    selector: "app-records",
    templateUrl: "./record.component.html",
    styleUrls: [ "./record.component.css" ]
})
export class RecordComponent {

    recordId: number = null;
    record: Record = null;
    //recordWrapups: Wrapups = null;

    records: Records = [];
    agents: Agents = [];
    wrapups: Wrapups = [];

    nextId: number = null;
    prevId: number = null;

    faRight = faLongArrowAltRight;
    faLeft = faLongArrowAltLeft;

    form: FormGroup = null;
    formModel: any = null;

    constructor(private appSvc: AppService, private route: ActivatedRoute, private app: ApplicationRef) {
        route.params.subscribe(params => {
            if(params["id"]) {
                this.recordId = Number.parseInt(params["id"]);
            } else {
                this.recordId = null;
            }
            this.readData();
        });
    }

    async readData() {
        this.records = await this.appSvc.getRecords();
        this.agents = await this.appSvc.getAgents();
        this.wrapups = await this.appSvc.getWrapups();
        //
        if(this.recordId) {
             this.record = this.records.find(r => r.id === this.recordId);
             //console.log(this.record);
             // Reactive form section:
             this.formModel = getFormModel(this.record.wrapups);
             this.form = getForm(this.formModel);
             console.log(this.formModel);
             console.log(this.form);
             // nextId & prevId:
             const ind = this.records.indexOf(this.record);
             const lastInd = this.records.length - 1;
             if(ind >= 0) {
                 this.nextId = this.records[ind < lastInd? ind + 1: 0].id;
                 this.prevId = this.records[ind === 0? lastInd: ind - 1].id;
             }
        }
        // test:
        //console.log(this.records);
        //console.log(this.agents);
        //console.log(this.wrapups);
    }

    getKeys(): string[] {
        return Object.keys(this.record).filter(k => ['sessionId', 'wrapups', 'userId'].indexOf(k) < 0);
    }

    getFullName(agent: WrapupAgent) {
        return agent.firstName + " " + agent.lastName;
    }
    
    private editValue: string;
    //
    editElement(id: number, inputElement: any = null) {
        this.formModel[id].edit = !this.formModel[id].edit;
        if(inputElement) {
            this.editValue = this.form.controls["id" + id].value;
            setTimeout(() => { inputElement.focus() }, 0);
        }
    }

    blurElement(id: number) {
        if(!confirm("Save edited data?")) {
            this.form.controls["id" + id].setValue(this.editValue);
            setTimeout(() => { this.formModel[id].edit = false; }, 0);
        }
    }

    getElementDisplay(id: number, elType: string) {
        if(elType === "text") {
            return this.formModel[id].edit? 'none': 'flex';    
        }
        return this.formModel[id].edit? 'flex': 'none';
    }

    formIsReady() {
        return this.form;
    }
}