
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDashboardComponent } from './account-dashboard.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { AvaliableDocumentsComponent } from './avaliable-documents/avaliable-documents.component';
import { WorkDocumentComponent } from '../work-document/work-document.component';
import { IncompleteDocumentsAvaliableComponent } from './incomplete-documents-avaliable/incomplete-documents-avaliable.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AuthenticatorGuardService } from '../Authenticators/Authenticator-GuardService';
import { ReviewComponent } from './review/review.component';



const dashboardModuleRoutes: Routes = [
    {
        path: 'dashboard',            //<---- parent component declared here
        component: AccountDashboardComponent,
        canActivate: [AuthenticatorGuardService],
        children: [                          //<---- child components declared here
            {
                path: 'Welcome',
                component: WelcomeScreenComponent
            },
            {
                path: 'Avaliable',
                component: AvaliableDocumentsComponent
            },
            {
                path: 'WorkDocument',
                component: WorkDocumentComponent
            },
            {
                path: 'IncompleteDocuments',
                component: IncompleteDocumentsAvaliableComponent
            },
            {
                path: 'Review',
                component: ReviewComponent
            },
            {
                path: "Graphics",
                component: GraphicsComponent
            },
            //Otherwise redirect all others to home
            { path: '**', redirectTo: '../dashboard' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardModuleRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }