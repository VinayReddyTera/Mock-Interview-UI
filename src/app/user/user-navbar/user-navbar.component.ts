import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {

  constructor(private route: Router){}

  ngOnInit(){}

  logout(){
    localStorage.clear()
    this.route.navigateByUrl('/login')
  }

}
