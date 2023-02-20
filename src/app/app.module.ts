import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ServiceService } from './service.service';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthModule } from './auth/auth.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabViewModule,
    FullCalendarModule,
    ConfirmDialogModule,
    ToastModule,
    AuthModule,
    InterviewerModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [ServiceService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
