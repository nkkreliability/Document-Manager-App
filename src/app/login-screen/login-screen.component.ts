import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValuesService } from '../_GlobalValues/global-values.service';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Authenticators/AuthenticatorService';
import { first } from 'rxjs/operators';
import { ErrorMessageService } from '../error-messages/error-messageService';
import { UserDataService } from '../user-data/user-data.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  //TODO when attach to server will need properties to display to the user if something isn't correct

  //https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example for keeping auth
  form: FormGroup;
  submitted = false;
  minimumPasswordLength: number;
  authToken: string; //Todo this will need to be put somewhere better
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    globalValues: GlobalValuesService,
    private authenticatorService: AuthenticatorService,
    private router: Router,
    private errorService: ErrorMessageService,
    private userdata: UserDataService
  ) {
    this.minimumPasswordLength = globalValues.GetMinimumPasswordLength();

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minimumPasswordLength)]]
    });
    // reset login status
    this.authenticatorService.logout();
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password') }
  doLogin() {
    this.loginButtonClick();
  }

  //TODO need to check the response!
  loginButtonClick() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.authenticatorService.login(this.form.controls.username.value, this.form.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.userdata.userDataAvaliable(true);
          //Use this to instead set the banner/toolbar at the top to the name
          this.router.navigate(['/']);
        },
        error => this.errorService.error(error));
  }
}
