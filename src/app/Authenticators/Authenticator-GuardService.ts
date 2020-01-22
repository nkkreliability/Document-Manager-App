import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TitleMessageService } from '../Services/TitleMessageService';

@Injectable({ providedIn: 'root' })
export class AuthenticatorGuardService implements CanActivate {
    constructor(private router: Router, private messageService: TitleMessageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this.messageService.logginIn(JSON.parse(localStorage.getItem('currentUser')).name);
            // logged in so return true
            return true;
        }
        this.messageService.loggingOut();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['../login']);
        return false;
    }
}

// https://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial !!!! keep using this