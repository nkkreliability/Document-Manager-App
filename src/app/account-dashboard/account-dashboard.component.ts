import { Component, OnInit } from '@angular/core';
import { UserInformation } from '../Authenticators/UserInformation';
import { Router } from '@angular/router';
import { TitleMessageService } from '../Services/TitleMessageService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {
  currentUser: UserInformation
  showNavigationBar: boolean;
  subscription: Subscription;
  constructor(
    private messageService: TitleMessageService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.subscription = this.messageService.getDisplayNavigation().subscribe(data => {
      if (this.showNavigationBar) {
        this.showNavigationBar = false;
        (<HTMLInputElement> document.getElementById('navbar')).style.display = 'none';
        (<HTMLInputElement> document.getElementById('dash')).style.gridTemplateColumns = '1fr';
      } else {
        this.showNavigationBar = true;
        (<HTMLInputElement> document.getElementById('navbar')).style.display = 'grid';
        (<HTMLInputElement> document.getElementById('dash')).style.gridTemplateColumns = '1fr 4fr';
      }
    });
  }


  ngOnInit() {
    this.router.navigate(['/dashboard/Welcome']);
    this.showNavigationBar = true;
  }

  WelcomeButtonClick() {
    this.router.navigate(['/dashboard/Welcome']);
  }

  AvaliableDocumentsButtonClick() {
    this.router.navigate(['/dashboard/Avaliable']);
  }

  IncompleteDocumentsAvaliableClick() {
    this.router.navigate(['/dashboard/IncompleteDocuments']);
  }

  DocumentsReviewClick() {
    this.router.navigate(['/dashboard/Review']);
  }

  GraphicsClick() {
    this.router.navigate(['/dashboard/Graphics']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
