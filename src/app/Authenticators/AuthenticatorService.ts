import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface authenticatorReturn {
    username?: string,
    name: string,
    title: string,
    authdata: string,
    signatureLocation: string,
    errorMsg?: string
}

@Injectable()
export class AuthenticatorService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<authenticatorReturn> {
        return this.http.post<authenticatorReturn>(environment.loginURL, { username: username, password: password })
            .pipe(map(user => {
                // store user details and auth token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}