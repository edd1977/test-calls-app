import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';


export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>
}

@Injectable()
export class CanDeactivateGuard { // implements CanDeactivate<ComponentCanDeactivate> - causes an error

    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {

        return component.canDeactivate? component.canDeactivate(): true;

    }

}