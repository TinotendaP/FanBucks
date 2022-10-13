import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { RegistrationModel } from '../validation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
    emails: boolean = true;
    httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 
    'Authorization': "Token 68951e4aa10de3ffa81b0991a02d899bfd17c11c"})
    baseUrl: string = 'http://127.0.0.1:8000/';
    existingEmails: string[]=[];
    brass: any;

    constructor(private http: HttpClient){

    }

    Emails():Observable<any>{
        return this.http.get<any>(this.baseUrl+`usernames/`, {headers: this.httpHeaders})
    }
    getEmails(){
        this.Emails()
        .subscribe(data=>{this.existingEmails=data;console.log(data)})
    }

    checkEmailExists(value: string): Observable<boolean>{ 
        console.log(`${this.existingEmails}`)
        return of(this.existingEmails.some(a=>a==value));
    }
 
    checkEmail(value:string): Observable<boolean>{
        const email = /^\w+([\.-]?\w+)*@\w+(\.\w{2,3})+$/.test(value)
        this.checkEmailExists(value).subscribe(data=>this.brass=data)
        
        if(email && !this.brass == true){ 
            this.emails = false
        } else {
            this.emails = true
        }
        console.log(`this again ${this.emails}`)
        return of(this.emails);
    }
}

export class ConfirmService {

    password: boolean = true;
    passConfirm: boolean = true;
    passwordForConfirm: string = '';
    fon: boolean=true;
    tncs: boolean = true;

    passwordCheck(value: string): Observable<boolean>{

        this.passwordForConfirm = value
        const upperCase = /[A-Z]/.test(value);
        const lowerCase = /[a-z]/.test(value);
        const numeric = /[0-9]/.test(value);
        const long = value.length>8;
        if(upperCase&&lowerCase&&numeric&&long == true){
            this.password=false
        } else {
            this.password=true
        }

        return of(this.password);
    }
    passwordConfirm(value: string): Observable<boolean>{

        if(value===this.passwordForConfirm){
            this.passConfirm = false
    }   else {
        this.passConfirm = true
    }

        return of(this.passConfirm) 
    }

    fonConfirm(value: string): Observable<boolean>{

    if(/\d{10}/.test(value)||/\d{9}/.test(value)){
        this.fon = false
    } else {
        this.fon = true
    }

        return of(this.fon)
    }

    checkTrue(value: string): Observable<boolean>{
        if(value=="true"){
            this.tncs == false
        } else {
            this.tncs == true
        }
        return of(this.tncs)
    }

}

const baseUrl: string = 'http://127.0.0.1:8000/';
@Injectable()
export class RegistrationService {
    

    httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    info: any;

    constructor(private http: HttpClient){}

    sendReg(value: RegistrationModel): Observable<RegistrationModel>{
        let body=JSON.stringify(value)
        console.log('yasvika')
        return this.http.post<RegistrationModel>(baseUrl+'registration/', body, {headers: this.httpHeaders})
    }
    getRegData(value: RegistrationModel){
        return this.sendReg(value)
                .subscribe(data=>{console.log(data)
                        this.info=data})
    }
}