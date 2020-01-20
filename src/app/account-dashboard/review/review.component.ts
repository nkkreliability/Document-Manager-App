import { Component, OnInit } from '@angular/core';
import { avaliableReviewDocuments } from 'src/app/_GlobalValues/httpObjectInterfaces';
import { HTTPSRequestService } from 'src/app/Server-HTTPS/IHTTPS-Request';
import { ErrorMessageService } from 'src/app/error-messages/error-messageService';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private avaliableDocuments: avaliableReviewDocuments[];
  constructor(private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router, ) { }


  ngOnInit() {
    this.HTTPSService.GetAvaliableReviewDocuments().pipe(first())
      .subscribe((data: avaliableReviewDocuments[]) => {
        this.avaliableDocuments = data;
      },
        error => { this.errorService.error(error) });
  }

  getDocument(ident: any) {
    this.router.navigate(['/dashboard/WorkDocument'], { state: { data: { name: ident, new: false, from: 'Review' } } });
  }

}