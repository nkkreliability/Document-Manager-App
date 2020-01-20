import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ForgotPasswordScreenComponent } from './forgot-password-screen/forgot-password-screen.component';
import { RegisterAccountScreenComponent } from './register-account-screen/register-account-screen.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestManagerComponent } from './request-manager/request-manager.component';
import { DashboardRoutingModule } from './account-dashboard/account-dashboard-routing.module';
const routes: Routes = [
  { path: 'dashboard', component: AccountDashboardComponent},
  { path: 'login', component: LoginScreenComponent },
  { path: 'forgotPassword', component: ForgotPasswordScreenComponent },
  { path: 'registerAccount', component: RegisterAccountScreenComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'manageRequests', component: RequestManagerComponent },
  //Otherwise redirect all others to home
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// https://blog.angularindepth.com/angular-routing-series-pillar-1-router-states-and-url-matching-12520e62d0fc for more on routing example