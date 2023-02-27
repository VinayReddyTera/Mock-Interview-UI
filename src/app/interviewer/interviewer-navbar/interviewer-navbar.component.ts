import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviewer-navbar',
  templateUrl: './interviewer-navbar.component.html',
  styleUrls: ['./interviewer-navbar.component.css']
})
export class InterviewerNavbarComponent {

  constructor(private route: Router){}

  ngOnInit(){}

  logout(){
    localStorage.clear()
    this.route.navigateByUrl('/login')
  }

}
