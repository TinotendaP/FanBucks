import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { ValidationCss } from '../../validation.model';
import { EmailValidator, PasswordValidator, EmailAddressValid, PasswordConfirmationValidator, FonValidator, TermsValidator } from '../user.validator';
import { UserService, ConfirmService, RegistrationService } from '../registration.service';
import { RegistrationModel, Account, ReturnData } from '../../validation.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css',   
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css',
'../bootstrap-5.0.2/dist/css/bootstrap.min.css']
})
export class RegistrationFormComponent implements OnInit {
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
  token: string = '';


  constructor(private fb: FormBuilder,
     private userService: UserService, 
     private confirmService:ConfirmService,
     private registrationService: RegistrationService,) {

    this.myForm = fb.group({ 
      first_name:['Tino', Validators.required],
      last_name:['Para', Validators.required],
      email:['', Validators.required,  EmailAddressValid.isEmail(userService), EmailValidator.createValidator(userService),],
      phone:['', Validators.required, FonValidator.checkFon(confirmService)],
      password:['',Validators.required,PasswordValidator.passwordValidation(confirmService)],
      password1:['',Validators.required, PasswordConfirmationValidator.checkPassword(confirmService)],
      terms_and_conditions:['',Validators.required]
    });
   }

  ngOnInit(): void {
    this.userService.getEmails()
    this.trial()
  } 

  trial(){
    console.log(this.myForm.get('first_name')?.valid)
    console.log(this.myForm.get('last_name')?.valid)
    console.log(this.myForm.get('email')?.valid)
    console.log(this.myForm.get('phone')?.valid)
    console.log(this.myForm.get('password')?.valid)
    console.log(this.myForm.get('password1')?.valid)
    console.log(this.myForm.get('terms_and_conditions')?.valid)
    console.log(this.myForm.get('terms_and_conditions')?.value)
  }

  onSubmit(value: any) {
    this.regData.first_name = value.first_name;
    this.regData.last_name = value.last_name;
    this.regData.username = value.email;
    this.regData.email = value.email;
    this.regData.password = value.password;
    this.accountData.phone = value.phone;
    this.accountData.terms_and_conditions = value.terms_and_conditions
    this.regData.account = this.accountData;
    console.log(this.regData)
    this.registrationService.sendReg(this.regData)
    .subscribe(data=>{console.log(data)
                      this.info=data})
  }

  genToken(){
    if(this.info){
      this.token = this.info.token
    }
    console.log(this.token)
    return this.token
  }
  getError(){

  }
}

