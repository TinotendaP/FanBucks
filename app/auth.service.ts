
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
 
@Injectable()
export class AuthService { 
 
    private isloggedIn: boolean;
    private userName:string='';
 
    constructor() {
        this.isloggedIn=false;
    }
 
    login(value: boolean) {
        if(value==true){
            this.isloggedIn=true;
        }
    }
 
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
    
    logoutUser(): void{
        this.isloggedIn = false;
    }
 
} 