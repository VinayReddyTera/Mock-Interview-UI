import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword : boolean = false;
  successMessage : any;
  errorMessage : any;
  user : any;
  loggedIn : any;

  constructor(private fb:FormBuilder,private loginServ : ServiceService,
    private route:Router,private authService: SocialAuthService){}

  loginForm : any;

  ngOnInit(){
    
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null)
      console.log(this.user)
    })

    this.loginForm = this.fb.group({
      email:['',[Validators.required,this.validateEmail]],
      password:['',[Validators.required]]
    })
  }

  signInWithFB(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
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
    // this.loginServ.login(this.loginForm.value).subscribe(
    //   (response : any) => {
    //     let user_data : {iat:any,subject:any} = jwt_decode(response)
    //     localStorage.clear();
    //     localStorage.setItem('email',user_data.subject.email);
    //     localStorage.setItem('name',user_data.subject.name);
    //     localStorage.setItem('phoneNo',user_data.subject.phoneNo);
    //     localStorage.setItem('id',user_data.subject.userId);
    //     this.errorMessage = null;
    //     this.successMessage = "logged In SuccessFully";
    //     this.route.navigateByUrl('landing')
    //   },
    //   (error : any) => {
    //     console.log(error);
    //     this.successMessage = null;
    //     this.errorMessage = error.error.message;
    //   }
    // ).add(()=>{
    //   setTimeout(()=>{
    //     this.successMessage = null;
    //     this.errorMessage = null;
    //   },3000)
    // })
    this.route.navigateByUrl('calendar')
  }

}
