import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginModel,  Authorization } from './validation.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
import { LocalStorageService } from './local_storage.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { ValidationCss } from './validation.model';
import { EmailValidator, PasswordValidator, EmailAddressValid, PasswordConfirmationValidator, FonValidator, TermsValidator } from './account_details/user.validator';
import { UserService, ConfirmService, RegistrationService } from './account_details/registration.service';
import { RegistrationModel, Account, ReturnData } from './validation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', 
  './squad_selection/bootstrap-4.3.1-dist/css/bootstrap.min.css',
  './squad_selection/fontawesome-free-6.1.2-web/css/all.css']
})
export class AppComponent implements OnInit{
  myForm:FormGroup;
  validationCss: ValidationCss = {valid: true, invalid: false};
  
  accountData: Account = {phone: 0,
  terms_and_conditions: false,
  balance: 0}
  regData: RegistrationModel = {first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    account: this.accountData}
  info: any;
  tokenReg: string = '';


  loginForm: FormGroup;
  loginData: LoginModel = { username: '', password:''}
  token:  Authorization = {Authorization: '' }
  isLoggedIn: boolean=false;
  public isMenuCollapsed = true;
  title = 'fantasy_prototype_2';
  auth: string = 'key';
  reg: boolean = false
  infoData: any;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router, 
    private authUser: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService, 
    private confirmService:ConfirmService,
    private registrationService: RegistrationService,) { 
    this.loginForm = fb.group({
      username:['', Validators.required, EmailValidator.createValidator(userService)],
      password:['',Validators.required]
    })

    this.myForm = fb.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      email:['', Validators.required,  EmailAddressValid.isEmail(userService), EmailValidator.createValidator(userService),],
      phone:['', Validators.required, FonValidator.checkFon(confirmService)],
      password:['',Validators.required,PasswordValidator.passwordValidation(confirmService)],
      password1:['',Validators.required, PasswordConfirmationValidator.checkPassword(confirmService)],
      terms_and_conditions:['',Validators.required]
    });
  }

  ngOnInit(){
    this.userService.getEmails()
    this.infoData = this.localStorageService.get(this.auth)
    console.log(this.infoData)
    if(this.infoData){
      this.isLoggedIn=true
    } else {
      this.isLoggedIn=false
    }
    this.authUser.login(this.isLoggedIn)
  }
  

  retrieveBalance(value: number){
    return value
  }
  register(){
    this.reg=true
  }

  onSubmitreg(value: any) {
    this.regData.first_name = value.first_name;
    this.regData.last_name = value.last_name;
    this.regData.username = value.email;
    this.regData.email = value.email;
    this.regData.password = value.password;
    this.accountData.phone = value.phone;
    this.accountData.terms_and_conditions = value.terms_and_conditions
    this.regData.account = this.accountData;
    console.log(this.regData)
    this.registrationService.getRegData(this.regData)
    setTimeout(() => {console.log(this.registrationService.info.token);
      if(this.registrationService.info.token){
        this.isLoggedIn=true
        this.router.navigateByUrl('/home')
        this.authUser.login(this.isLoggedIn)
        this.token.Authorization = `Token ${this.registrationService.info.token}`
        let data = JSON.stringify(this.token)
        this.localStorageService.set(this.auth, data)
        this.reg=false
      } else {
        this.isLoggedIn=false
      };}, 4000)
  }

  genToken(){
    if(this.info){
      this.tokenReg = this.info.token
    }
    console.log(this.token)
    return this.token
  }

  onSubmit(value: any){
    this.loginData.username = value.username
    this.loginData.password = value.password
    this.loginService.getToken(this.loginData)
    setTimeout(() => {console.log(this.loginService.token);
      if(this.loginService.token){
        this.isLoggedIn=true
        this.router.navigateByUrl('/home')
        this.authUser.login(this.isLoggedIn)
        this.token.Authorization = `Token ${this.loginService.token.token}`
        let data = JSON.stringify(this.token)
        this.localStorageService.set(this.auth, data)
      } else {
        this.isLoggedIn=false
      };}, 4000)
  }
} 