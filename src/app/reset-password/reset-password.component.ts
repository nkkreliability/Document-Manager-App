import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ErrorMessageService } from '../error-messages/error-messageService';
import { HTTPSRequestService } from '../Server-HTTPS/IHTTPS-Request';
import { MustMatch } from '../_Custom-Validators/MustMatch';
import { GlobalValuesService } from '../_GlobalValues/global-values.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  minimumPasswordLength: number;
  feedbackinfo: string = '';
  constructor(
    private formBuilder: FormBuilder,
    globalValues: GlobalValuesService,
    private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minimumPasswordLength)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword') //Bound to confirm Password field
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  resetPasswordButtonClick() {
    this.submitted = true;
    //Check information is invalid, if so display errors and stop
    if (this.form.invalid) {
      return;
    } else {
      this.HTTPSService.ResetPasswordRequest(this.form.controls.username.value, this.form.controls.password.value)
        .pipe(first())
        .subscribe((data) => {
          this.feedbackinfo = 'Success! \n An email has been sent to: ' + data.data + ' Returning you to login screen in 5 seconds'
          setTimeout(() => { this.router.navigate(['/login']); }, 5000);
        },
          error => this.errorService.error(error));
    }
  }
}