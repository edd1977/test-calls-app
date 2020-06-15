import { Pipe } from "@angular/core";


@Pipe({
    name: 'toDate'
})
export class ToDateDipe {

    transform(value: string) {

        const regEx = /^\s*([0-9]+)\/([0-9]+)\/([0-9]+)\s+([0-9]+):([0-9]+):([0-9]+)\s*$/;
        if(regEx.test(value)) {
            const result = regEx.exec(value);
            const date = new Date(+result[3], +result[2], +result[1], +result[4], +result[5], +result[6], 0); // year, month, date, hours, minutes, seconds, ms
            return date;
        }
        return value;
    }

}