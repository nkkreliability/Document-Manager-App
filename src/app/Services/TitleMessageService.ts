import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleMessageService {
    private subject = new Subject<any>();

    logginIn(message: string) {
        this.subject.next({ text: message });
    }

    loggingOut() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}