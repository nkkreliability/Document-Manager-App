import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoAndTitleComponent } from './logo-and-title/logo-and-title.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ForgotPasswordScreenComponent } from './forgot-password-screen/forgot-password-screen.component';
import { RegisterAccountScreenComponent } from './register-account-screen/register-account-screen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestManagerComponent } from './request-manager/request-manager.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { ErrorInterceptor } from './Server-HTTPS/HttpIntertceptorService';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { AuthenticatorGuardService } from './Authenticators/Authenticator-GuardService';
import { ErrorMessageService } from './error-messages/error-messageService';
import { DreamHostHTTPSRequest } from './Server-HTTPS/DreamHostHTTPS-Request';
import { AuthenticatorService } from './Authenticators/AuthenticatorService';
import { AuthenticatorTokenInterceptor } from './Authenticators/AuthenticatorTokenInterceptor';
import { HTTPSRequestService } from './Server-HTTPS/IHTTPS-Request';
import { DevToolsComponent } from './dev-tools/dev-tools.component';
import { NoopInterceptor } from './Server-HTTPS/noop-interceptor';
import { DashboardModule } from './account-dashboard/account-dashboard.module';
import { WorkDocumentComponent, CommentDialog } from './work-document/work-document.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { TitleMessageService } from './Services/TitleMessageService';

@NgModule({
  declarations: [
    AppComponent,
    LogoAndTitleComponent,
    SplashScreenComponent,
    LoginScreenComponent,
    ForgotPasswordScreenComponent,
    RegisterAccountScreenComponent,
    ResetPasswordComponent,
    RequestManagerComponent,
    AccountDashboardComponent,
    ErrorMessagesComponent,
    DevToolsComponent,
    WorkDocumentComponent,
    CommentDialog,
  ],
  entryComponents: [
    CommentDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    TitleMessageService,
    AuthenticatorGuardService,
    ErrorMessageService,
    AuthenticatorService,
    DreamHostHTTPSRequest,
    { provide: HTTPSRequestService, useClass: DreamHostHTTPSRequest },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticatorTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
