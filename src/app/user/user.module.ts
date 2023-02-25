import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TabViewModule} from 'primeng/tabview';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { BookInterviewerComponent } from './book-interviewer/book-interviewer.component';

@NgModule({
  declarations: [
    UserCalendarComponent,
    UserLandingComponent,
    BookInterviewerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    TabViewModule
  ]
})
export class UserModule { }
