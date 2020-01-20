import { Component, OnInit } from '@angular/core';
import { HTTPSRequestService } from 'src/app/Server-HTTPS/IHTTPS-Request';
import { ErrorMessageService } from 'src/app/error-messages/error-messageService';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { avaliableDocuments, avaliableIncompleteDocuments } from 'src/app/_GlobalValues/httpObjectInterfaces';

@Component({
  selector: 'app-incomplete-documents-avaliable',
  templateUrl: './incomplete-documents-avaliable.component.html',
  styleUrls: ['./incomplete-documents-avaliable.component.css']
})
export class IncompleteDocumentsAvaliableComponent implements OnInit {
  private avaliableDocuments: avaliableIncompleteDocuments[];
  constructor(private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router, ) { }


  ngOnInit() {

    this.HTTPSService.GetAvaliableIncompleteDocumentRequest().pipe(first())
      .subscribe((data: avaliableIncompleteDocuments[]) => {
        this.avaliableDocuments = data;
      },
        error => { this.errorService.error(error) });
  }

  getDocument(ident: any) {
    this.router.navigate(['/dashboard/WorkDocument'], { state: { data: { name: ident, new: false, from: 'Incomplete' } } });
  }
}
