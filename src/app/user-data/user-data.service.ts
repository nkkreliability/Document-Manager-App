import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private messageSource = new BehaviorSubject(false);
  usernameAvaliable = this.messageSource.asObservable();
  constructor() { }

  userDataAvaliable(avaliable: boolean) {
    this.messageSource.next(avaliable);
  }
}
