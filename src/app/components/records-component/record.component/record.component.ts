import { Component, ElementRef, ApplicationRef } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Records, Wrapups, Record } from 'src/app/model/record.model';
import { Users } from 'src/app/model/user.model';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import { Agents, Agent as WrapupAgent } from 'src/app/model/agents.model';
import { getForm, getFormModel } from './record.form.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { from } from 'rxjs';

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
    faList = faList;
    faEdit = faEdit;
    faUndo = faUndo;

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
        this.setData();
    }

    setData() {
        if(this.recordId) {
            this.record = this.records.find(r => r.id === this.recordId);
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
    }

    getKeys(): string[] {
        return Object.keys(this.record).filter(k => ['sessionId', 'wrapups', 'userId'].indexOf(k) < 0);
    }

    getFullName(agent: WrapupAgent) {
        return agent.firstName + " " + agent.lastName;
    }
    
    resetForm() {
        this.form = getForm(this.formModel); // get form once again.
    }

    saveData() {
        Object.keys(this.form.controls).forEach(k => {
            const id = Number.parseInt(k.replace('id', '')); // Example: 'id23' => 23
            this.record.wrapups.find(wp => wp.wrapupId === id).wrapupComment = this.form.controls[k].value;
        });
        //
        this.appSvc.updateRecord(this.record).then(response => {
            console.log("Record was updated");
            console.info(response);
            const updatedRec = response as Record;
            // change old Record-object on new updated one: 
            const ind = this.records.findIndex(r => r.id === updatedRec.id);
            this.records.splice(ind, 1, updatedRec);
        }).catch(err => {
            console.error("An error occurred while updating:");
            console.info(err);
        }).finally(() => {
            this.setData();
        });
    }

    ///////////////////////////////////////////////////
    // Editing Comment field:
    public editableId: number = null;
    private oldValue: string;
    //
    editElement(id: number, inputElement: any = null) {

        if(typeof(this.editableId) != 'number' && inputElement) {
            this.editableId = id;
            this.oldValue = this.form.controls["id" + id].value;
            setTimeout(() => { inputElement.focus() }, 0);
        }
    }
    //
    cancelEdit() {
        if(typeof(this.editableId) == "number") {
            this.form.controls['id' + this.editableId].setValue(this.oldValue); // cancel changes.
            this.editableId = null;
        }
    }
    //
    onEnterEvent(e) {
        e.cancelBubble = true;
        this.editableId = null; // all changes saved.
    }
    //
    ///////////////////////////////////////////////////

    formIsReady() {
        return this.form;
    }
}