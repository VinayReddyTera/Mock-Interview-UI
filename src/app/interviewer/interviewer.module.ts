import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TabViewModule} from 'primeng/tabview';
import { InterviewerLandingComponent } from './interviewer-landing/interviewer-landing.component';

@NgModule({
  declarations: [
    CalendarComponent,
    InterviewerLandingComponent
  ],
  imports: [
    CommonModule,
    InterviewerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    TabViewModule
  ]
})
export class InterviewerModule { }
