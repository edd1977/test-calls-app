import { Pipe } from "@angular/core";

@Pipe({
    name: "duration"
})
export class DurationPipe {

    /**
     * Перевод секунд или милисекунд в дни, часы, минуты и секунды.
     * @param value 
     * @param _from 
     * @param _upTo 
     */
    transform(value: number, _from: string) {
        if(!isNaN(value)) {
            let sec = value;
            switch(_from) {
                case "ms":
                    sec = value / 1000;
                    break;
                // default = in seconds.
            }
            //
            const days = Math.floor(sec / 86400);
            const hours = Math.floor((sec - days * 86400) / 3600);
            const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
            const seconds = sec - days * 86400 - hours * 3600 - minutes * 60;
            //
            return `${days? `${days} days `: ""}${hours? `${hours}h`: ""}${minutes? `${minutes}m`: ""}${seconds? `${seconds}s`: ""}`;
        }
        return value;
    }

}