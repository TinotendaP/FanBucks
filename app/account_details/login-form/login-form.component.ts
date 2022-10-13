import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { LoginModel, Token } from '../../validation.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',   
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  loginData: LoginModel = { username: '', password:''}
  token: any;
  isLoggedIn: boolean=false;

  constructor(private fb: FormBuilder, public loginService: LoginService,
    private router: Router, private authUser: AuthService) { 
    this.loginForm = fb.group({
      username:['', Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(){
    if (this.token){
      console.log(this.token)
      return this.isLoggedIn=true
    } else {
      console.log('uripazhe')
      return this.isLoggedIn=false
    }
  }

  onSubmit(value: any){
    this.loginData.username = value.username
    this.loginData.password = value.password
    this.loginService.getToken(this.loginData)
    setTimeout(() => {console.log(this.loginService.token);
      if(this.loginService.token){
        this.isLoggedIn=true
        this.router.navigateByUrl('/intermediate-page')
      } else {
        this.isLoggedIn=false
      };}, 5000)
  }

} 
