import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AuthenticatorService } from '../Authenticators/AuthenticatorService';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticatorService: AuthenticatorService,
    ) { }

    //TODO make this better
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            alert(err.error.errorMsg);
            switch (err.status) {//TODO may need to add more later
                case 401:
                    // auto logout if 401 response returned from api
                    this.authenticatorService.logout();
                    location.reload(true);
                    break;
                default:
                    console.log(err.status);
                    break;
            }
            return throwError(err.errorMsg);
        }))
    }
}