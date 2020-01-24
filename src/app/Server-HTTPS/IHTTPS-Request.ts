import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newDocumentInformation, genericReturn, WorkDocument, NotificationToSubmit, documentSubmit, TaskInformationToSend, CommentInformationToSend, avaliableReviewDocuments, ServerData, GraphTasksAvaliable, RequestGraphData, avaliableIncompleteDocuments } from "../_GlobalValues/httpObjectInterfaces";
import { UserInformation } from '../Authenticators/UserInformation';

export interface IHTTPSRequest {
    //will need to contain properties to hold the required information for the requests
}


@Injectable()
export abstract class HTTPSRequestService {


    //Account Management
    abstract ForgotPasswordRequest(username: string): Observable<genericReturn>;
    abstract RegisterAccountRequest(accountInformation: UserInformation): Observable<genericReturn>;
    abstract ResetPasswordRequest(username: string, password: string): Observable<genericReturn>;
    abstract AccountChangeRequest(data: any): Observable<genericReturn>;

    //Document Management
    abstract GetAvaliableNewWorkDocumentsRequest(): Observable<Array<newDocumentInformation>>;
    abstract GetNewDocumentRequest(UUID: string): Observable<WorkDocument>;
    abstract GetAvaliableIncompleteDocumentRequest(): Observable<Array<avaliableIncompleteDocuments>>;
    abstract GetIncompleteDocumentRequest(UUID: string): Observable<WorkDocument>;
    abstract UpdateValue(data: TaskInformationToSend): Observable<any>;
    abstract SubmitComment(data: CommentInformationToSend): Observable<any>;
    abstract SubmitFurtherWorkRequired(data: NotificationToSubmit): Observable<any>;
    abstract SubmitWorkDocument(data: string): Observable<any>;

    abstract GetAvaliableReviewDocuments(): Observable<Array<avaliableReviewDocuments>>;
    abstract GetReviewDocumentRequest(UUID: string): Observable<WorkDocument>;

    abstract SubmitReview(UUID: string, accepted: boolean): Observable<any>;

    abstract GetDocumentsForGraph(): Observable<GraphTasksAvaliable>;
    abstract GetTaskDataForGraph(requestData: RequestGraphData): Observable<ServerData>;//TODO will need to add in object containing the information required. at a later time
    /**  
    Will have a list of different requests to send off
    e.g post/login, post/requestpasswordreset, post/accountrequest, post/updaterequest, post/resetPassword
    
    future stuff will be:
    e.g get/document, post/formdata,
    ->for allowed users, Factory providers https://angular.io/guide/dependency-injection-providers, for authentication etc 
    + do it also on server side incase of malicous behaivour
    put/newdocument -> to create a new type, put/updatedocument
    */
}
    //https://medium.com/hackernoon/creating-interfaces-for-angular-services-1bb41fbbe47c example

