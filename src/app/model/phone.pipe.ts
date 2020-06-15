import { Pipe } from "@angular/core";

@Pipe({
    name: "phone"
})
export class PhonePipe {

    transform(value: string) {
        var regExp = /\s*([0-9]{11})\s*/;
        if(regExp.test(value)) {
            // 33123456789 => +3-312-345-67-89
            const nums = regExp.exec(value)[1];
            return `+${nums[0]}-${nums.substr(1, 3)}-${nums.substr(4, 3)}-${nums.substr(7, 2)}-${nums.substr(9, 2)}`;
        }
        return value;
    }

}