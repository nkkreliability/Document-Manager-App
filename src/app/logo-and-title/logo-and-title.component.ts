import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo-and-title',
  templateUrl: './logo-and-title.component.html',
  styleUrls: ['./logo-and-title.component.css']
})
export class LogoAndTitleComponent implements OnInit {

  //Will need to have this linked to the LOGO
  LogoImage = ''; //TODO logo
  title = 'Document Manager';
  environment: string;
  constructor() { }

  ngOnInit() {
    this.environment = environment.environemnt;
  }

}
