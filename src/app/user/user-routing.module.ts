import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';

const routes: Routes = [
  {path: 'user-calendar', component : UserCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
