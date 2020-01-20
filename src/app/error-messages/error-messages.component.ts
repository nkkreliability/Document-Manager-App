import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorMessageService } from './error-messageService';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit , OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
      this.subscription = this.errorMessageService.getMessage().subscribe(message => { 
          this.message = message; 
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}