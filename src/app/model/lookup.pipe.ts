import { Pipe } from '@angular/core';

@Pipe({
    name: "lookup"
})
export class LookupPipe {

    transform(value: any, ref: any[], key: string, displ: string | ((a: any) => any)) {
        const item = ref.find(i => i[key] === value);
        if(item) {
            if(typeof displ === "string") {
                return item[displ];
            }
            return displ(item);
        }
        return value;
    }

}