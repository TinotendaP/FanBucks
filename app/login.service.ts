import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationModel, LoginModel, Token, Account } from './validation.model';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { LocalStorageService } from './local_storage.service';


@Injectable()
export class LoginService {

    baseUrl: string = 'http://127.0.0.1:8000/';
    token: any;

    constructor(private http: HttpClient){}

    sendLogin(value: LoginModel): Observable<LoginModel>{
        let body=value
        console.log('yasvika')
        return this.http.post<LoginModel>(this.baseUrl+'login/', body)
    }
    getToken(value: LoginModel){
        return this.sendLogin(value)
        .subscribe(data=>{this.token = data; console.log(data)});
    }

}

@Injectable()
export class UserInfoService {
    baseUrl: string = 'http://127.0.0.1:8000/';
    httpHeaders: any;
    regData: number=0;
    key: string = 'key';
    subject: any ;
    token: any;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService){}

    getToken(){
        this.subject = this.localStorageService.get(this.key)
        this.token = JSON.parse(this.subject)
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token.Authorization})
        return console.log(this.token.Authorization)
    } 

    Balance(): Observable<any>{
        return this.http.get<any>(this.baseUrl+'users/', {headers: this.httpHeaders})
    }
    getBalance(){
        this.Balance()
        .subscribe(data=>{this.regData=data; console.log(data)})
        return this.regData
    }
}