import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { promise } from 'protractor';
import { Wrapup, Wrapups } from 'src/app/model/record.model';

export function getFormModel(wrapups: Wrapups) {
    const model = {};
    wrapups.forEach(w => {
        model[w.wrapupId] = { comment: w.wrapupComment, edit: false }
            //{ id: w.wrapupId, comment: w.wrapupComment, edit: false }
        //);
    })
    return model;
}

export function getForm(model: any[]) {

    const controls = {
        //
    };
    //model.forEach(i => {
    Object.keys(model).forEach(k => {
        const item = model[k];
        controls["id" + k] = new FormControl(item.comment);
    });
    return new FormGroup(controls);
}

// export function getRecordForm(): RecordFormGroup {

//     const controls = {
//         id: new SignedControl("Call Id", "id"),
//         ​startedAt: new SignedControl("Call start", "startedAt"),
//         ​finishedAt: new SignedControl("Call ended​", "​finishedAt"),
//         duration: new SignedControl("Call duration", "​duration"),
//         contactPhone: new SignedControl("Contact", "contactPhone"),
//         displayedNumber: new SignedControl("Displayed Numbe​r", "​displayedNumber"),
//         // ? How to do a form for array???
//         //
//         //wrapups: new SignedControl("Wrapups",​ "wrapups")
//         // Wrapup​: (the wrapup name)
//         // Agent​: (the agent name)
//         // Comment*​: (the comment on the wrapup)
//     };
    
//     const validators = [];

//     return new RecordFormGroup(controls, validators);
// }

// export class RecordFormGroup extends FormGroup {

//     constructor(controls: any, validators: any) {
//         super(controls, validators);
//     }

//     getSignedControls(): SignedControl[] {
//         return Object.keys(this.controls).map(k => this.controls[k] as SignedControl);
//     }

// }

// export class SignedControl extends FormControl {
//     label: string
//     propertyName: string;

//     constructor(labe: string, propName: string) {
//         super();
//         //
//         this.label = labe;
//         this.propertyName = propName;
//     }
// }