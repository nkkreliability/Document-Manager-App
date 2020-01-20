import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ErrorMessageService } from '../error-messages/error-messageService';
import { HTTPSRequestService } from '../Server-HTTPS/IHTTPS-Request';
@Component({
  selector: 'app-forgot-password-screen',
  templateUrl: './forgot-password-screen.component.html',
  styleUrls: ['./forgot-password-screen.component.css'],
})
export class ForgotPasswordScreenComponent implements OnInit {
  //TODO when attach to server will need properties to display to the user if something isn't correct
  form: FormGroup;
  submitted: boolean = false;
  feedbackinfo: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  get username() { return this.form.get('username'); }

  resetPasswordButtonClick() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.HTTPSService.ForgotPasswordRequest(this.form.controls.username.value)
      .pipe(first())
      .subscribe((data) => {
        this.feedbackinfo = 'Success! \n An email has been sent to: ' + data.data + ' Returning you to login screen in 5 seconds'
        setTimeout(() => { this.router.navigate(['/login']); }, 5000);
      },
        error => this.errorService.error(error));
  }
}





