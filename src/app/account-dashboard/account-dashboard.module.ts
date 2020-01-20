
//this is modelled from your app.module.ts and the components and 
//services are just arbitrary examples, your module might be different
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './account-dashboard-routing.module';
import { AvaliableDocumentsComponent } from './avaliable-documents/avaliable-documents.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { IncompleteDocumentsAvaliableComponent } from './incomplete-documents-avaliable/incomplete-documents-avaliable.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ChartsModule } from 'ng2-charts';
import { ReviewComponent } from './review/review.component';



@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule, //<-- import
        ChartsModule,
    ],
    declarations: [
        AvaliableDocumentsComponent,
        WelcomeScreenComponent,
        IncompleteDocumentsAvaliableComponent,
        GraphicsComponent,
        ReviewComponent,
    ],
    providers: []
})
export class DashboardModule { }