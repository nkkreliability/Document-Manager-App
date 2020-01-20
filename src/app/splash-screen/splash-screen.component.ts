import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  SplashScreenImage = 'assets/images/Small-Nickel West Kalgoorlie_2007_3.jpg'
  constructor() { }

  ngOnInit() {
  }

}
