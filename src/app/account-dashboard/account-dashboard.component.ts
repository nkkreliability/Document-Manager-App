import { Component, OnInit } from '@angular/core';
import { UserInformation } from '../Authenticators/UserInformation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {
  time = new Date();
  currentUser: UserInformation

  constructor(
    private router: Router
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }


  ngOnInit() {
    this.router.navigate(['/dashboard/Welcome']);
    setInterval(() => {
      this.time = new Date();
    }, 1000);
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

  HideShowClick() {
    if ((<HTMLInputElement> document.getElementById('navbar')).style.display === 'none') {
      (<HTMLInputElement> document.getElementById('navbar')).style.display = 'grid';
      (<HTMLInputElement> document.getElementById('dash')).style.gridTemplateColumns = '1fr 4fr';
    } else {
      (<HTMLInputElement> document.getElementById('navbar')).style.display = 'none';
      (<HTMLInputElement> document.getElementById('dash')).style.gridTemplateColumns = '1fr';
    }
  }
}
