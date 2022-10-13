import { Injectable, OnInit } from '@angular/core';
import { of, delay, Observable, pipe, debounceTime, map } from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { TournFormModel, TeamsInTournamentModel, TournamentTeams, JoinTournamentModel } from './tournament.model';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LoginService } from '../login.service';
import { LocalStorageService } from '../local_storage.service';

@Injectable()
export class TournamentService{

    teams: any =[];

    tourn_names: any;

    currentTournaments: JoinTournamentModel[] = []
    currentTourn : JoinTournamentModel = {creator:-1,
        tourn_name: '',
        tourn_type: '',
        entry_fee: 0,
        currency: '',
        start_date: '',
        end_date: '',
        min_teams: 0,
        slug: '',
        is_active: true,
        number_of_teams: 0,
        privacy: true,
        tourn_closed: false,
      }

    regData: number = 0;
    entry_fee:number = 0;
  
    tourn_info: TournFormModel = {creator:-1,
    tourn_name: '',
    tourn_type: '',
    entry_fee: 0,
    currency: '',
    start_date: '',
    end_date: '',
    min_teams: 0,
    slug: '',};
    dummy_tourn: TournamentTeams={tourn_id: -1, tourn_name: '', tourn: []};
    existingTournaments: string[] = [];
    error: boolean = true;
    tournament_list: string[]=[];

    key: string = 'key';
    subject: any ;
    token: any;

    httpHeaders: any;
    baseUrl: string = 'http://127.0.0.1:8000/'

    constructor(private http: HttpClient, private loginService: LoginService,
        private localStorageService: LocalStorageService){}

    getToken(){
        this.subject = this.localStorageService.get(this.key)
        this.token = JSON.parse(this.subject)
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token.Authorization})
        return console.log(this.token.Authorization)
      } 

    createLeague(value: TournFormModel): Observable<TournFormModel>{
        let body = JSON.stringify(value)
        return this.http.post<TournFormModel>(this.baseUrl+'tournament/', body, {headers: this.httpHeaders})
    }
 
    activeLeague(): Observable<TeamsInTournamentModel>{
        return this.http.get<TeamsInTournamentModel>(this.baseUrl+'teams/', {headers: this.httpHeaders})
    }

    tournNames(value: number): Observable<TournFormModel>{
        return this.http.get<TournFormModel>(this.baseUrl+`tournament/${value}/`, {headers: this.httpHeaders})
    }

    childActiveLeague(){
        return this.http.get<TournFormModel>(this.baseUrl+`gameweek/`, {headers: this.httpHeaders})
    }   

    getAllTourns(): Observable<any>{
        return this.http.get<TournFormModel>(this.baseUrl+`tournament-slugs/`, {headers: this.httpHeaders})
    }
    getTourns(){
        return this.getAllTourns()
        .subscribe(data=>{this.existingTournaments=data; console.log(data)})
    }

    getTournament(): Observable<any>{
        return this.http.get<any>(this.baseUrl+'tournament/', {headers: this.httpHeaders})
    }

    fetchUserTeams(): Observable<any>{
        return this.http.get<any>(this.baseUrl+'team_list/', {headers: this.httpHeaders})
    }

    theTourn(){
        return this.getTournament()
        .subscribe(data=>{this.currentTournaments = data; console.log(data)})
    }

    findFee(value: string){
        if (this.currentTournaments){
            for(let i=0; i<this.currentTournaments.length; i++){
                if (this.currentTournaments[i].slug == value){
                    this.currentTourn = this.currentTournaments[i]
                }
            }
        }
        console.log(this.currentTourn)
        return this.currentTourn
    }

    checkTournamentsExists(value: string): Observable<boolean>{
        let slug = this.existingTournaments.some(a=>a===value);
        if(slug==true){
            this.error = false;
        } else {
            this.error = true
        }
        return of(this.error)
    }

}
export class SlugValidator {
    static createValidator(tournamentService: TournamentService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return tournamentService.checkTournamentsExists(control.value).pipe(
                map((result: boolean)=>
                result ? { slugDoesnotExists: true }: null)
            )
        }
    }
}