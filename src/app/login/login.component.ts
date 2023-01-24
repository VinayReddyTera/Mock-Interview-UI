import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword : boolean = false;

  constructor(private fb:FormBuilder){}

  loginForm : any;

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,this.validateEmail]],
      password:['',[Validators.required]]
    })
  }

  validateEmail(c:FormControl){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(c.value)? null : {
      emailError : {
        message : 'Invalid email format!'
      }
    }
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      document.getElementById('password')?.setAttribute('type','text');
    }
    else{
      document.getElementById('password')?.setAttribute('type','password');
    }
  }

  login(){
    console.log(this.loginForm.value)
  }

}
