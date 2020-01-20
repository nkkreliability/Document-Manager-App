import { Component, OnInit } from '@angular/core';
import { HTTPSRequestService } from 'src/app/Server-HTTPS/IHTTPS-Request';
import { ErrorMessageService } from 'src/app/error-messages/error-messageService';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WorkDocument, avaliableDocuments, newDocumentInformation } from "src/app/_GlobalValues/httpObjectInterfaces";



@Component({
  selector: 'app-avaliable-documents',
  templateUrl: './avaliable-documents.component.html',
  styleUrls: ['./avaliable-documents.component.css']
})

export class AvaliableDocumentsComponent implements OnInit {
  private avaliableDocuments: newDocumentInformation[];

  constructor(
    private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.HTTPSService.GetAvaliableNewWorkDocumentsRequest().pipe(first())
      .subscribe((data: newDocumentInformation[]) => {
        this.avaliableDocuments = data;
      },
        error => { this.errorService.error(error) });
  }
  getDocument(UUID: string) {
    this.router.navigate(['/dashboard/WorkDocument'], { state: { data: { UUID: UUID, new: true } } });
  }

}

