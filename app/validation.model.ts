import { Injectable } from '@angular/core';

export class Authorization {
    Authorization: string;
    constructor(Authorization: string){
    this.Authorization = Authorization;
    }
}

export class ValidationCss {
    valid: boolean;
    invalid: boolean;

    constructor(valid:boolean, invalid:boolean){
        this.valid=valid;
        this.invalid=invalid;
    }
}

export class UserInfoModel {
    first_name: string;
    last_name: string;
    balance: number;

    constructor(first_name: string, last_name: string,
        balance: number){
            this.first_name = first_name;
            this.last_name = last_name;
            this.balance = balance
        }
}

export class Account {
    phone: number;
    terms_and_conditions: boolean;
    balance: number;

    constructor(phone: number,
        terms_and_conditions: boolean,
        balance: number,){
        this.phone = phone;
        this.balance = balance;
        this.terms_and_conditions = terms_and_conditions;
    }
}

export class RegistrationModel {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    account: Account;

    constructor(first_name: string,
        last_name: string,
        username: string,
        password: string,
        email: string,
        account: Account,){
        this.first_name= first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.account = account;
    }
}

export class ReturnData{
    email: string;
    phone: number;
    terms_and_conditions: boolean;
    token: string;

    constructor(email: string,
        phone: number,
        terms_and_conditions: boolean,
        token: string,){
            this.email = email;
            this.phone = phone;
            this.terms_and_conditions = terms_and_conditions;
            this.token = token;
        }
}

export class LoginModel {
    username: string;
    password: string;

    constructor(username: string,
        password: string,){
        this.username = username;
        this.password = password;
    }
}

export class Token {
    authorization: string;
    
    constructor(authorization: string,){
        this.authorization = authorization; 
    }
}