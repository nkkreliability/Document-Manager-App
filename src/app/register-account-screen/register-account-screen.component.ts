import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValuesService } from '../_GlobalValues/global-values.service';
import { HTTPSRequestService } from '../Server-HTTPS/IHTTPS-Request';
import { MustMatch } from '../_Custom-Validators/MustMatch';
import { UserInformation } from '../Authenticators/UserInformation';
import { ErrorMessageService } from '../error-messages/error-messageService';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register-account-screen',
  templateUrl: './register-account-screen.component.html',
  styleUrls: ['./register-account-screen.component.css']
})
export class RegisterAccountScreenComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  feedbackinfo: string;

  constructor(private formBuilder: FormBuilder, private globalValues: GlobalValuesService, private HTTPSService: HTTPSRequestService,
    private errorService: ErrorMessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      sapID: ['', Validators.required], //TODO will need information on SAP ID formats may need to create a custom validator
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(this.globalValues.GetMinimumPasswordLength())]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword') //Bound to confirm Password field
    });
  }

  get username() { return this.form.get('username'); }
  get sapID() { return this.form.get('sapID'); }
  get name() { return this.form.get('name'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  registerAccountButtonClick() {
    this.submitted = true;
    //Check information is invalid, if so display errors and stop
    if (this.form.invalid) {
      return;
    } else {
      let info: UserInformation = {
        username: this.form.controls.username.value,
        password: this.form.controls.password.value,
        name: this.form.controls.name.value,
        sapID: this.form.controls.sapID.value
      }
      this.HTTPSService.RegisterAccountRequest(info)
        .pipe(first())
        .subscribe((data) => {
          this.feedbackinfo = 'Success! \n The request is being reviewed. You will recieve an email ('
            + this.form.controls.username.value + ') Returning you to login screen in 5 seconds'
          setTimeout(() => { this.router.navigate(['/login']); }, 5000);
        },
          error => { this.errorService.error(error) });
    }
  }
}

