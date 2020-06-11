import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(private http: HttpService, private router: Router) {
        //
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const canDo = this.http.checkAccessToken;

        if(!canDo) {
            this.router.navigateByUrl("/");
        }

        return canDo;

    }

}