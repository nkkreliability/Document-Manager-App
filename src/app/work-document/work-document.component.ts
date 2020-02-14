import { Component, OnInit, Inject } from '@angular/core';
import { PrestartValues, CloseoutTaskValues, CompareValueReturn, TypeOfInput, ValidTriggerValue, AlarmTriggerValue, AlertTriggerValue } from '../_GlobalValues/global-values';
import { WorkDocument, TasksInformation, TaskInformationToSend, WorkTasksInformation, CommentInformationToSend, FutherWorkTasksInformation, CompletionCode, CommentPopUpData } from '../_GlobalValues/httpObjectInterfaces';
import { HTTPSRequestService } from '../Server-HTTPS/IHTTPS-Request';
import { ErrorMessageService } from '../error-messages/error-messageService';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';



/**
 * Work Document missing features:
 * Needs to allow for different types of input for work tasks. This will require modification of the html as well
 * Fixing up The bottom submission section
 */
@Component({
  selector: 'app-work-document',
  templateUrl: './work-document.component.html',
  styleUrls: ['./work-document.component.css']
})
export class WorkDocumentComponent implements OnInit {
  //Binding enums from global to class members for HTML access
  reviewstate: boolean = false;;
  prestartValues = PrestartValues;
  closeoutValues = CloseoutTaskValues
  makeSaveValueButtonsAvaliable: boolean;
  currentWorkDocumentData: WorkDocument;
  loadedDocument = false;
  furtherWorkTaskTracker: Map<string, boolean>;
  inputDisabled: boolean;
  iconValues: Map<string, CompletionCode> = new Map<string, CompletionCode>();
  displayFurtherWork = false;
  displayCloseoutTasks = false;
  overallDocumentComments: Array<string>;
  constructor(private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.furtherWorkTaskTracker = new Map();
    this.overallDocumentComments = new Array<string>();
    if (history.state.data.new) {
      this.HTTPSService.GetNewDocumentRequest(history.state.data.UUID).pipe(first())
        .subscribe((data: WorkDocument) => {
          this.makeSaveValueButtonsAvaliable = true;
          this.currentWorkDocumentData = data;
          this.loadedDocument = true;
          this.inputDisabled = this.currentWorkDocumentData.Submitted;
          for (let closeOutTask of this.currentWorkDocumentData.ListOfAvaliableCloseoutTasksUUIDs) {
            this.furtherWorkTaskTracker.set(closeOutTask, false);
          }
          for (let completionCode of this.currentWorkDocumentData.CompletionCodes) {
            this.iconValues.set(completionCode.Name, completionCode);
          }
          this.currentWorkDocumentData.GeneralComments = new Array();
          if (this.currentWorkDocumentData.CloseoutTasksInformation.length) {
            this.displayCloseoutTasks = true;
          }
        },
          error => {
            this.errorService.error(error)
          });
    } else {//will need to load in any entered information as well
      if (history.state.data.from === 'Incomplete') {
        this.HTTPSService.GetIncompleteDocumentRequest(history.state.data.name).pipe(first())
          .subscribe((data: WorkDocument) => {
            this.currentWorkDocumentData = data;
            this.loadedDocument = true;
            this.inputDisabled = this.currentWorkDocumentData.Submitted;
            this.makeSaveValueButtonsAvaliable = true;
            //Loop through tasks to setup
            for (let closeOutTask of this.currentWorkDocumentData.ListOfAvaliableCloseoutTasksUUIDs) {
              this.furtherWorkTaskTracker.set(closeOutTask, false);
            }
            let triggerinformation: CompareValueReturn;
            //Is abit slow but needed
            for (let completionCode of this.currentWorkDocumentData.CompletionCodes) {
              this.iconValues.set(completionCode.Name, completionCode);
            }
            //Also put in each worktasks comments in
            for (let workTask of this.currentWorkDocumentData.WorkTasksInformation) {
              console.log(workTask.CompletionCode);
              triggerinformation = this.compareValue(workTask, Number(workTask.SubmittedValue));
              this.updateTriggers(workTask, triggerinformation.trigger);
            }
            if (this.currentWorkDocumentData.CloseoutTasksInformation.length) {
              this.displayCloseoutTasks = true;
            }
            this.addComments();
          },
            error => { this.errorService.error(error) });
      }
      else if (history.state.data.from === 'Review') {
        //httpcall to review document and lock all but new comments and final part and have a new accept/decline button
        this.HTTPSService.GetReviewDocumentRequest(history.state.data.name).pipe(first())
          .subscribe((data: WorkDocument) => {
            this.currentWorkDocumentData = data;
            this.loadedDocument = true;
            this.inputDisabled = this.currentWorkDocumentData.Submitted;
            this.makeSaveValueButtonsAvaliable = false;
            this.reviewstate = true;
            for (let closeOutTask of this.currentWorkDocumentData.ListOfAvaliableCloseoutTasksUUIDs) {
              this.furtherWorkTaskTracker.set(closeOutTask, false);
            }
            let triggerinformation: CompareValueReturn;
            //Is abit slow but needed
            for (let completionCode of this.currentWorkDocumentData.CompletionCodes) {
              this.iconValues.set(completionCode.Name, completionCode);
            }
            for (let workTask of this.currentWorkDocumentData.WorkTasksInformation) {
              triggerinformation = this.compareValue(workTask, Number(workTask.SubmittedValue));
              this.updateTriggers(workTask, triggerinformation.trigger);

            }
            this.addComments();
          },
            error => { this.errorService.error(error) });
      }
      //Bind icons and address for use

    }
  }

  addComments() {
    //Prestart Tasks
    for (let prestartTask of this.currentWorkDocumentData.PrestartTasksInformation) {
      for (let workTaskComment of prestartTask.Comments) {
        if (workTaskComment !== "")
          this.overallDocumentComments.push(workTaskComment);
      }
    }
    //WorkTasks
    for (let workTask of this.currentWorkDocumentData.WorkTasksInformation) {
      for (let workTaskComment of workTask.Comments) {
        if (workTaskComment !== "")
          this.overallDocumentComments.push(workTaskComment);
      }
    }
    //CloseoutTasks
    for (let closeoutTask of this.currentWorkDocumentData.CloseoutTasksInformation) {
      for (let workTaskComment of closeoutTask.Comments) {
        if (workTaskComment !== "")
          this.overallDocumentComments.push(workTaskComment);
      }
    }
    //generalComments
    for (let DocumentComment of this.currentWorkDocumentData.GeneralComments) {
      if (DocumentComment !== "")
        this.overallDocumentComments.push(DocumentComment);
    }
  }

  submitPrestartTask(taskUUID: string, skipped: boolean) {
    let prestartTask: TasksInformation = this.currentWorkDocumentData.PrestartTasksInformation.filter(task => {
      return task.UUID === taskUUID;
    })[0];
    let data: TaskInformationToSend;
    if (skipped) {
      let dialogBoxObs: Observable<any>;
      dialogBoxObs = this.generateSkippingTaskComment(prestartTask.Name);
      dialogBoxObs.subscribe((returnComment: string) => {
        if (!returnComment) {//no comment so stop the skip
          console.log("no comment");
          return;
        } else {
          this.submitComment(prestartTask.Name + ": " + returnComment, taskUUID);
          data = {
            DocumentUUID: this.currentWorkDocumentData.UUID,
            TaskUUID: taskUUID,
            SubmittedValues: {
              CompletionKey: this.iconValues.get('NotCompleted').CompletionKey,
              Submitted: true,
            }
          }
          prestartTask.CompletionCode = this.iconValues.get('NotCompleted').IconHyperLink;
          prestartTask.Submitted = true;
          this.UpdateValue(data);
          if (prestartTask.Error) {
            prestartTask.Error = false;
          }
        }
      });

    } else {
      data = {
        DocumentUUID: this.currentWorkDocumentData.UUID,
        TaskUUID: taskUUID,
        SubmittedValues: {
          CompletionKey: this.iconValues.get('Completed').CompletionKey,
          Submitted: true,
        }
      }
      prestartTask.CompletionCode = this.iconValues.get('Completed').IconHyperLink;
      prestartTask.Submitted = true;
      this.UpdateValue(data);
      if (prestartTask.Error) {
        prestartTask.Error = false;
      }
    }
  }

  //TODO lots
  submitWorkTask(taskUUID: string, typeOfInput: string, skipped: boolean) {
    let userInput: any;
    let valueToCheck: number;
    let data: TaskInformationToSend;
    let triggerinformation: CompareValueReturn;
    //Get workTask information
    let workTask: WorkTasksInformation = this.currentWorkDocumentData.WorkTasksInformation.filter(task => {
      return task.UUID === taskUUID;
    })[0];
    if (skipped) {
      let dialogBoxObs: Observable<any>;
      dialogBoxObs = this.generateSkippingTaskComment(workTask.Name)
      dialogBoxObs.subscribe((returnComment: string) => {
        if (!returnComment) {//no comment so stop the skip
          return;
        } else {
          this.submitComment(workTask.Name + ": " + returnComment, taskUUID);
          data = {
            DocumentUUID: this.currentWorkDocumentData.UUID,
            TaskUUID: taskUUID,
            SubmittedValues: {
              CompletionKey: this.iconValues.get('NotCompleted').CompletionKey,
              Submitted: true,
              SubmittedValue: '',
            }
          }
          if (workTask.Error) {
            workTask.Error = false;
          }
          workTask.CompletionCode = this.iconValues.get('NotCompleted').IconHyperLink;
          workTask.Submitted = true;
          this.UpdateValue(data);
        }
      });
    } else {
      //TODO Update submitted value based on input type
      switch (typeOfInput) {
        case '0':
          userInput = (<HTMLInputElement> document.getElementById(workTask.InputID)).value;
          valueToCheck = Number(userInput);
          break;
        case '1'://TODO will need to work out how we are going to "compare" dropdowns ->probably by index 0->n
          valueToCheck = (<HTMLSelectElement> document.getElementById(workTask.InputID)).selectedIndex;
          userInput = (<HTMLSelectElement> document.getElementById(workTask.InputID)).value;
          break;
      }
      if (workTask.Error) {
        workTask.Error = false;
      }

      //If value exists
      if (valueToCheck) {
        triggerinformation = this.compareValue(workTask, valueToCheck);
        console.log(triggerinformation.trigger);
        console.log(triggerinformation.newIcon);
        this.updateTriggers(workTask, triggerinformation.trigger);
        data = {
          DocumentUUID: this.currentWorkDocumentData.UUID,
          TaskUUID: taskUUID,
          SubmittedValues: {
            CompletionKey: this.iconValues.get(triggerinformation.newIcon).CompletionKey,
            Submitted: true,
            SubmittedValue: String(valueToCheck),
          }
        }
        workTask.CompletionCode = this.iconValues.get(triggerinformation.newIcon).IconHyperLink;
        workTask.Submitted = true;
      }
      this.UpdateValue(data);
    }
  }

  compareValue(workTask: WorkTasksInformation, valueToCheck: Number): CompareValueReturn {
    let returnValues: CompareValueReturn;
    if (workTask.Values.VeryHigh && workTask.Values.High && workTask.Values.Low && workTask.Values.VeryLow) {
      if (valueToCheck >= Number(workTask.Values.Low) && valueToCheck <= Number(workTask.Values.High)) {
        returnValues = {
          newIcon: this.iconValues.get('Completed').Name,
          trigger: ValidTriggerValue,
        }

      } else if (valueToCheck > Number(workTask.Values.VeryHigh) || valueToCheck < Number(workTask.Values.VeryLow)) {
        returnValues = {
          newIcon: this.iconValues.get('Alarm').Name,
          trigger: AlarmTriggerValue,
        }
      } else {
        returnValues = {
          newIcon: this.iconValues.get('Alert').Name,
          trigger: AlertTriggerValue,
        }
      }
    } else if (workTask.Values.VeryHigh && workTask.Values.High && !workTask.Values.Low && !workTask.Values.VeryLow) {
      if (valueToCheck <= Number(workTask.Values.High)) {
        returnValues = {
          newIcon: this.iconValues.get('Completed').Name,
          trigger: ValidTriggerValue,
        }
      } else if (valueToCheck > Number(workTask.Values.High) && valueToCheck <= Number(workTask.Values.VeryHigh)) {
        returnValues = {
          newIcon: this.iconValues.get('Alert').Name,
          trigger: AlertTriggerValue,
        }
      } else {
        returnValues = {
          newIcon: this.iconValues.get('Alarm').Name,
          trigger: AlarmTriggerValue,
        }
      }
    } else {//Only Low alerts
      if (valueToCheck >= Number(workTask.Values.Low)) {
        returnValues = {
          newIcon: this.iconValues.get('Completed').Name,
          trigger: ValidTriggerValue,
        }
      } else if (valueToCheck < Number(workTask.Values.Low) && valueToCheck >= Number(workTask.Values.VeryLow)) {
        returnValues = {
          newIcon: this.iconValues.get('Alert').Name,
          trigger: AlertTriggerValue,
        }
      } else {
        returnValues = {
          newIcon: this.iconValues.get('Alarm').Name,
          trigger: AlarmTriggerValue,
        }
      }
    }
    return returnValues;
  }


  updateTriggers(workTask: WorkTasksInformation, triggerValue: string) {
    if (workTask.TaskLinks) {
      for (let triggerlinks of workTask.TaskLinks) {
        if (triggerlinks.TriggerCondition === triggerValue) {
          console.log('updating trigger');
          this.furtherWorkTaskTracker.set(triggerlinks.UUID, true);
          //And need to display the contianer of the new class.
          if (!this.displayFurtherWork || !this.displayCloseoutTasks) {
            //Find what type of task
            if (this.currentWorkDocumentData.FutherWorkTasksInformation.filter(task => {
              return task.UUID === triggerlinks.UUID;
            }).length) {
              this.displayFurtherWork = true;
            } else {
              this.displayFurtherWork = false;
            }
          }
        }
      }
    }
  }

  submitComment(commentInfo: string, taskUUID: string) {
    let commentSubmit: CommentInformationToSend;
    let currentUserType: string;
    let comment: string;
    if (!this.currentWorkDocumentData.Submitted) {
      currentUserType = '(Technician) ' + this.currentWorkDocumentData.Technician;
    } else {
      currentUserType = '(Reviewer) ' + this.currentWorkDocumentData.Reviewer;
    }
    comment = currentUserType + " - " + commentInfo;
    this.overallDocumentComments.push(comment);
    commentSubmit = {
      DocumentUUID: this.currentWorkDocumentData.UUID,
      Comment: comment,
      TaskUUID: taskUUID,
    }
    console.log(this.currentWorkDocumentData.UUID);
    console.log(comment);
    console.log(taskUUID);
    this.HTTPSService.SubmitComment(commentSubmit).pipe(first())
      .subscribe((error: string) => { this.errorService.error(error) });
  };

  submitCloseoutTask(taskUUID: string, skipped: boolean) {
    let closeoutTask: TasksInformation = this.currentWorkDocumentData.CloseoutTasksInformation.filter(task => {
      return task.UUID === taskUUID;
    })[0];
    let data: TaskInformationToSend;
    if (skipped) {
      let dialogBoxObs: Observable<any>;
      dialogBoxObs = this.generateSkippingTaskComment(closeoutTask.Name)
      dialogBoxObs.subscribe((returnComment: string) => {
        if (!returnComment) {//no comment so stop the skip
          return;
        } else {
          this.submitComment(closeoutTask.Name + ": " + returnComment, taskUUID);
          data = {
            DocumentUUID: this.currentWorkDocumentData.UUID,
            TaskUUID: taskUUID,
            SubmittedValues: {
              CompletionKey: this.iconValues.get('NotCompleted').CompletionKey,
              Submitted: true,
            }
          }
          closeoutTask.CompletionCode = this.iconValues.get('NotCompleted').IconHyperLink;
          closeoutTask.Submitted = true;
          this.UpdateValue(data);
          if (closeoutTask.Error) {
            closeoutTask.Error = false;
          }
        }
      });
    } else {
      data = {
        DocumentUUID: this.currentWorkDocumentData.UUID,
        TaskUUID: taskUUID,
        SubmittedValues: {
          CompletionKey: this.iconValues.get('Completed').CompletionKey,
          Submitted: true,
        }
      }
      closeoutTask.CompletionCode = this.iconValues.get('Completed').IconHyperLink;
      closeoutTask.Submitted = true;
      this.UpdateValue(data);
      if (closeoutTask.Error) {
        closeoutTask.Error = false;
      }
    }
  }

  submitFurtherWorkRequired(taskUUID: string) {
    console.log('submitFurtherWorkRequired');
    let data: TaskInformationToSend;
    let notificationValue: string;
    let furtherWorkRequiredTask: FutherWorkTasksInformation = this.currentWorkDocumentData.FutherWorkTasksInformation.filter(task => {
      return task.UUID === taskUUID;
    })[0];
    notificationValue = (<HTMLInputElement> document.getElementById(taskUUID)).value;
    if (notificationValue) {
      if (furtherWorkRequiredTask.Error) {
        furtherWorkRequiredTask.Error = false;
      }
      furtherWorkRequiredTask.CompletionCode = this.iconValues.get('Completed').IconHyperLink;
      furtherWorkRequiredTask.SubmittedValue = notificationValue
      furtherWorkRequiredTask.Submitted = true;
      data = {
        DocumentUUID: this.currentWorkDocumentData.UUID,
        TaskUUID: taskUUID,
        SubmittedValues: {
          CompletionKey: this.iconValues.get('Completed').CompletionKey,
          Submitted: true,
          SubmittedValue: notificationValue,
        }
      }
      furtherWorkRequiredTask.CompletionCode = this.iconValues.get('Completed').IconHyperLink;
      furtherWorkRequiredTask.Submitted = true;
      this.UpdateValue(data);
      if (furtherWorkRequiredTask.Error) {
        furtherWorkRequiredTask.Error = false;
      }
    } else {
      furtherWorkRequiredTask.CompletionCode = this.iconValues.get('NotCompleted').IconHyperLink;
    }
  }

  UpdateValue(data: TaskInformationToSend) {
    //send off data ->Only return of error, otherwise nothing will be returned
    this.HTTPSService.UpdateValue(data).pipe(first())
      .subscribe((error: string) => { this.errorService.error(error) });
  }

  generateTaskObservationComment(taskUUID: string, taskName: string) {
    console.log('generateTaskObservationComment');
    let dataToSend: CommentPopUpData = {
      Title: "New Comment For Task: " + taskName,
      ShowExcuses: false,
    }
    const dialogRef = this.dialog.open(CommentDialog, {
      data: dataToSend
    });
    dialogRef.afterClosed().subscribe((returnComment: string) => {
      if (!returnComment) {//no comment so stop comment generation
        return;
      } else {

        this.submitComment((taskName + ": " + returnComment), taskUUID);
      }
    });
  }

  generateGeneralObservationComment() {
    console.log('generateGeneralObservationComment');
    let dataToSend: CommentPopUpData = {
      Title: "New General Comment For Work Document " + this.currentWorkDocumentData.Name,
      ShowExcuses: false,
    }
    const dialogRef = this.dialog.open(CommentDialog, {
      data: dataToSend
    });
    dialogRef.afterClosed().subscribe((returnComment: string) => {
      if (!returnComment) {//no comment so stop the skip
        return;
      } else {
        this.submitComment(returnComment, 'None');
      }
    });
  }

  generateSkippingTaskComment(taskName: string): Observable<any> {
    console.log('generateSkippingTaskComment');
    let dataToSend: CommentPopUpData = {
      Title: "Enter Reason for Skipping Task:\n" + taskName,
      ExcuseComments: this.currentWorkDocumentData.ExcuseComments,
      ShowExcuses: true,
    }
    const dialogRef = this.dialog.open(CommentDialog, {
      data: dataToSend
    });
    return dialogRef.afterClosed();
  }

  checkAllInputs(): boolean {
    let allInputsFilled: boolean = true;
    let firstError: boolean = true;
    for (let prestartTask of this.currentWorkDocumentData.PrestartTasksInformation) {
      if (!prestartTask.Submitted) {//No value "submitted" will need to highlight it
        allInputsFilled = false;
        prestartTask.Error = true;
        if (firstError) {
          firstError = false;
          (<HTMLElement> document.getElementById(prestartTask.UUID)).scrollIntoView();
        }
      }
    }
    for (let workTask of this.currentWorkDocumentData.WorkTasksInformation) {
      if (!workTask.Submitted) {//No value "submitted" will need to highlight it
        allInputsFilled = false;
        workTask.Error = true;
        if (firstError) {
          firstError = false;
          (<HTMLElement> document.getElementById(workTask.UUID)).scrollIntoView();
        }
      }
    }
    for (let furtherwork of this.currentWorkDocumentData.FutherWorkTasksInformation) {
      if (!furtherwork.Submitted) {//No value "submitted" will need to highlight it
        allInputsFilled = false;
        furtherwork.Error = true;
        if (firstError) {
          firstError = false;
          (<HTMLElement> document.getElementById(furtherwork.UUID)).scrollIntoView();
        }
      }
    }
    for (let closeOutTask of this.currentWorkDocumentData.CloseoutTasksInformation) {
      if (this.furtherWorkTaskTracker.get(closeOutTask.UUID)) {
        if (!closeOutTask.Submitted) {//No value "submitted" will need to highlight it
          allInputsFilled = false;
          closeOutTask.Error = true;
          if (firstError) {
            firstError = false;
            (<HTMLElement> document.getElementById(closeOutTask.UUID)).scrollIntoView();
          }
        }
      }
    }
    return allInputsFilled;
  }

  submitSheet() {
    let dateTime = new Date();
    //Check All inputs to see if they are filled out
    //Lock Document
    if (this.checkAllInputs()) {
      this.currentWorkDocumentData.Submitted = true;
      this.inputDisabled = true;
      this.makeSaveValueButtonsAvaliable = false;
      this.currentWorkDocumentData.SubmitDate = dateTime.toLocaleTimeString() + " - " + dateTime.toLocaleDateString();
      this.HTTPSService.SubmitWorkDocument(this.currentWorkDocumentData.UUID).pipe(first())
        .subscribe(() => {
          console.log('waiting 10sec');
          setTimeout(() => { this.router.navigate(['/dashboard/Welcome']); }, 10000);
        },
          (error: string) => {
            console.log(error);
            this.errorService.error(error)
          }
        );

    }
  }

  submitReview(accepted: boolean) {
    if (accepted) {
      this.currentWorkDocumentData.DocumentReviewed = true;
    }
    this.HTTPSService.SubmitReview(this.currentWorkDocumentData.UUID, accepted).pipe(first())
      .subscribe(() => {
        console.log('waiting 10sec');
        setTimeout(() => { this.router.navigate(['/dashboard/Welcome']); }, 10000);
      },
        (error: string) => { this.errorService.error(error) }
      );

  }
}

//Comment Popup
@Component({
  selector: 'comment-dialog',
  templateUrl: 'comment-dialog.html',
  styleUrls: ['./work-document.component.css']
})
export class CommentDialog {
  //TODO https://material.angular.io/components/dialog/overview 
  displayCustom: boolean;
  useCustomComment: boolean;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommentPopUpData,
    public dialogRef: MatDialogRef<WorkDocumentComponent>,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      PresetComments: [''],
      CustomComment: ['']
    });
    this.useCustomComment = false;
    if (this.data.ShowExcuses) {
      this.displayCustom = false;
      this.data.ExcuseComments.push("Other");
    } else {
      this.displayCustom = true;
      this.useCustomComment = true;
    }
  }

  checkComment() {
    if (this.form.controls.PresetComments.value === 'Other') {
      this.useCustomComment = true;
      this.displayCustom = true;
    } else {
      if (this.useCustomComment) {
        this.useCustomComment = false;
        this.displayCustom = false;
      }
    }
  }

  saveComment() {
    this.data.ExcuseComments.pop();
    if (this.useCustomComment) {
      this.dialogRef.close(this.form.controls.CustomComment.value);
    } else {
      //need to check if it is the default "Select Reason" if so return empty
      this.form.controls.PresetComments.value === 'Select Reason' ? this.dialogRef.close('') : this.dialogRef.close(this.form.controls.PresetComments.value)
    }
  }

  onNoClick(): void {
    this.data.ExcuseComments.pop();
    this.dialogRef.close(null);
  }

}