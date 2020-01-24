import { Injectable } from '@angular/core';
import { HTTPSRequestService } from './IHTTPS-Request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInformation } from '../Authenticators/UserInformation';
import { environment } from 'src/environments/environment';
import { newDocumentInformation, genericReturn, WorkDocument, TaskDataReturn, NotificationToSubmit, documentSubmit, TaskInformationToSend, CommentInformationToSend, avaliableReviewDocuments, ServerData, GraphTasksAvaliable, RequestGraphData, avaliableIncompleteDocuments } from '../_GlobalValues/httpObjectInterfaces';

@Injectable()
export class DreamHostHTTPSRequest implements HTTPSRequestService {


    //TODO JSON stringify it all for booleans!
    constructor(private http: HttpClient) { }

    //Post
    ForgotPasswordRequest(username: string): Observable<any> {
        console.log(username);
        return this.http.post<genericReturn>(environment.forgotPasswordURL, { username: username });
    }

    //Post
    RegisterAccountRequest(accountInformation: UserInformation): Observable<any> {
        return this.http.post<any>(environment.registerAccountURL, accountInformation);
    }

    //Post
    ResetPasswordRequest(username: string, password: string): Observable<genericReturn> {
        return this.http.post<genericReturn>(environment.resetPasswordURL, { username: username, password: password });
    }

    //Post
    AccountChangeRequest(data: any): Observable<genericReturn> {
        return this.http.post<genericReturn>(environment.accountChangeURL, data);
    }

    //TODO will need to modify some of these to add in user information for each get of a new document and switch to post as required
    //TODO will need requests for Review data and Completed Data
    //get
    GetAvaliableNewWorkDocumentsRequest(): Observable<Array<newDocumentInformation>> {
        return this.http.get<Array<newDocumentInformation>>(environment.avaliableDocumentsURL);
    }

    GetNewDocumentRequest(UUID: string): Observable<WorkDocument> {
        return this.http.post<WorkDocument>(environment.getDocumentInformationURL, { DocumentUUID: UUID })
    }


    GetAvaliableIncompleteDocumentRequest(): Observable<Array<avaliableIncompleteDocuments>> {
        return this.http.post<Array<avaliableIncompleteDocuments>>(environment.avaliableIncompleteDocumentsURL, { UserID: JSON.parse(localStorage.getItem('currentUser')).username });
    }

    GetIncompleteDocumentRequest(UUID: string): Observable<WorkDocument> {
        return this.http.post<WorkDocument>(environment.getIncompleteDocumentInformationURL, { DocumentUUID: UUID });
    }

    UpdateValue(data: TaskInformationToSend): Observable<any> {
        console.log(data);
        console.log(data.SubmittedValues);
        return this.http.post<TaskDataReturn>(environment.submitValueURL, data);
    }

    SubmitComment(data: CommentInformationToSend): Observable<any> {
        console.log(JSON.stringify(data));
        return this.http.post<any>(environment.submitCommentURL, data);
    }

    SubmitFurtherWorkRequired(data: NotificationToSubmit): Observable<any> {
        return this.http.post<any>(environment.submitValueURL, data);
    }

    SubmitWorkDocument(data: string): Observable<any> {
        console.log(data);
        return this.http.post<any>(environment.submitDocument, { DocumentUUID: data });
    }

    GetAvaliableReviewDocuments(): Observable<Array<avaliableReviewDocuments>> {

        return this.http.post<Array<avaliableReviewDocuments>>(environment.avaliableReviewDocumentsURL, { UserID: JSON.parse(localStorage.getItem('currentUser')).username });

    }
    GetReviewDocumentRequest(UUID: string): Observable<WorkDocument> {
        return this.http.post<WorkDocument>(environment.getReviewDocumentURL, { DocumentUUID: UUID });
    }

    SubmitReview(UUID: string, accepted: boolean): Observable<any> {
        return this.http.post<WorkDocument>(environment.submitReview, { DocumentUUID: UUID, Accepted: accepted });
    }

    GetDocumentsForGraph(): Observable<GraphTasksAvaliable> {
        return this.http.get<GraphTasksAvaliable>(environment.getGraphInfo);
    }
    GetTaskDataForGraph(requestData: RequestGraphData): Observable<ServerData> {
        console.log(JSON.stringify(requestData));
        return this.http.post<ServerData>(environment.getGraphData, requestData);
    }
}