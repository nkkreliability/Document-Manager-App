import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TitleMessageService } from '../Services/TitleMessageService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Authenticators/AuthenticatorService';

@Component({
  selector: 'app-logo-and-title',
  templateUrl: './logo-and-title.component.html',
  styleUrls: ['./logo-and-title.component.css']
})
export class LogoAndTitleComponent implements OnInit, OnDestroy {
  trackingNavigationState: boolean;
  subscription: Subscription;
  loggedIn: boolean;
  username: string;
  userInformation: Map<string, string>;
  //Will need to have this linked to the LOGO
  LogoImage = 'https://nks-maintenance.online/Server/public/images/Logo/logo.png'; //TODO logo
  title = 'Document Manager Application';
  environment: string;
  constructor(
    private messageService: TitleMessageService,
    private router: Router,
    private authenticatorService: AuthenticatorService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.username = message;
        this.loggedIn = true;

      } else {
        // clear messages when empty message received
        this.username = '';
        this.loggedIn = false;
      }
    });
  }
  //TODO will need a service with login information etc for displaying
  ngOnInit() {
    this.environment = environment.environemnt;
    this.loggedIn = false;
    this.trackingNavigationState = true;
  }

  NavigationClick() {
    this.messageService.navigationButtonClicked();
    if (this.trackingNavigationState) {
      this.trackingNavigationState = false;
    } else {
      this.trackingNavigationState = true;
    }
  }


  logout() {
    this.loggedIn = false;
    this.authenticatorService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}