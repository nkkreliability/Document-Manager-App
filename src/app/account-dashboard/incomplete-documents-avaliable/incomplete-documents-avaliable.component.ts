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
        this.avaliableDocuments.forEach(document => {
          document.DateCreated = this.DateServerToFrontEnd(document.DateCreated.toString());
          document.DateLastModified = this.DateServerToFrontEnd(document.DateLastModified.toString());
        });
      },
        error => { this.errorService.error(error) });
  }

  getDocument(ident: any) {
    this.router.navigate(['/dashboard/WorkDocument'], { state: { data: { name: ident, new: false, from: 'Incomplete' } } });
  }

  DateServerToFrontEnd(date: string): string {
    let options = {
      month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit',
      second: '2-digit'
    };
    let newDate = new Date()
    let array: Array<string> = date.split(' ');
    let stringDate: Array<string> = array[0].split('-');
    let stringTime: Array<string> = array[1].split(':');
    newDate.setDate(parseInt(stringDate[2]));
    newDate.setMonth(parseInt(stringDate[1]) - 1);
    newDate.setFullYear(parseInt(stringDate[0]));
    newDate.setHours(parseInt(stringTime[0]));
    newDate.setMinutes(parseInt(stringTime[1]));
    newDate.setSeconds(parseInt(stringTime[2]));
    return newDate.toLocaleString("en-US", options);
  }
}
