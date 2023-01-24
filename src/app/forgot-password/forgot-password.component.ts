import { Component } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private fb:FormBuilder){}

  forgotPasswordForm : any;

  ngOnInit(){
    this.forgotPasswordForm = this.fb.group({
      email:['',[Validators.required,this.validateEmail]]
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

  submit(){
    console.log(this.forgotPasswordForm.value)
  }
}
