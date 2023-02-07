import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword : boolean = false;
  showPasswordconfirm : boolean = false;

  constructor(private fb:FormBuilder, private route : Router, private registerService : ServiceService){}

  registerForm : any;
  successMessage : any;
  errorMessage : any;

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
    console.log(this.registerForm.value);
    this.registerService.login(this.registerForm.value).subscribe(
      (response : any) => {
        this.errorMessage = null;
        this.successMessage = "logged In SuccessFully";
      },
      (error : any) => {
        console.log(error);
        this.successMessage = null;
        this.errorMessage = error.error.message;
      }
    ).add(()=>{
      setTimeout(()=>{
        this.successMessage = null;
        this.errorMessage = null;
        this.route.navigateByUrl('login')
      },3000)
    })
  }
  
}
