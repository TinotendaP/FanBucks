import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { LocalStorageService } from '../local_storage.service';
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable()
export class TeamService {
    existingTeams: string[] = []

    key: string = 'key';
    subject: any ;
    token: any;

    httpHeaders: any;
    baseUrl: string = 'http://127.0.0.1:8000/'


    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService){

    }

    getToken(){
        this.subject = this.localStorageService.get(this.key)
        this.token = JSON.parse(this.subject)
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token.Authorization})
        return console.log(this.token.Authorization)
      } 

    teamNames(value: any): Observable<any>{
        return this.http.get<any>(this.baseUrl+`join_tourn/${value}`, {headers: this.httpHeaders})
    }

    getTeamNames(value: any){
        this.teamNames(value)
        .subscribe(data=>{this.existingTeams = data})
    }

    checkTeamExists(value: string): Observable<boolean>{
        return of(this.existingTeams.some((a)=>a===value))
        .pipe(delay(1000));
    }
} 