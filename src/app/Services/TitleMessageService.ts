import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { isNull } from 'util';

@Injectable({ providedIn: 'root' })
export class TitleMessageService {
    private userName = new Subject<string>();
    private displayNavigation = new Subject<any>();

    logginIn(message: string) {
        this.userName.next(message);
    }

    loggingOut() {
        this.userName.next();
    }

    getMessage(): Observable<string> {
        return this.userName.asObservable();
    }

    navigationButtonClicked() {
        this.displayNavigation.next();
    }

    getDisplayNavigation(): Observable<any> {
        return this.displayNavigation.asObservable();
    }


}