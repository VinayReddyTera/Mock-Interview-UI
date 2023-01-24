import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword : boolean = false;
  showPasswordconfirm : boolean = false;

  constructor(private fb:FormBuilder){}

  registerForm : any;

  ngOnInit(){
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,this.validateEmail]],
      phoneNo:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    },{validator:this.validatePassword})
  }

  validateEmail(c:FormControl){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(c.value)? null : {
      emailError : {
        message : 'Invalid email format!'
      }
    }
  }

  validatePassword(c:FormGroup){
    if(c.controls['password'].value == c.controls['confirmPassword'].value){
      return null
    }
    else{
      return {
        passwordError : {
          message : "Passwords Didn't Match!"
        }
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

  togglePasswordconfirm(){
    this.showPasswordconfirm = !this.showPasswordconfirm;
    if(this.showPasswordconfirm){
      document.getElementById('confirmPassword')?.setAttribute('type','text');
    }
    else{
      document.getElementById('confirmPassword')?.setAttribute('type','password');
    }
  }

  register(){
    console.log(this.registerForm.value)
  }
}
