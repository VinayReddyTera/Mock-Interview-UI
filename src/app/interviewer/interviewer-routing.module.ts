import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { InterviewerLandingComponent } from './interviewer-landing/interviewer-landing.component';

const routes: Routes = [
  {path:'landing',component:InterviewerLandingComponent},
  {path:'calendar',component:CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewerRoutingModule { }
