import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookInterviewerComponent } from './book-interviewer/book-interviewer.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';

const routes: Routes = [
  {path: 'user-calendar', component : UserCalendarComponent},
  {path: 'book-interviewer', component : BookInterviewerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
