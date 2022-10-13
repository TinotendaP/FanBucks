import { Injectable } from '@angular/core'
import { Element } from '../squad_selection/squadList.model';

export class TournamentTeams {
    tourn_id:number;
    tourn_name: string;
    tourn: TeamsInTournamentModel[];

    constructor(tourn_id: number, tourn_name: string, tourn: TeamsInTournamentModel[]){
        this.tourn_id=tourn_id;
        this.tourn=tourn;
        this.tourn_name=tourn_name;
    }
} 

export class TournFormModel {
    creator: number;
    tourn_name: string;
    tourn_type: string;
    entry_fee: number;
    currency: string;
    start_date: string;
    end_date: string;
    min_teams: number;
    slug: string;
    constructor(creator: number,
        tourn_name: string,
        tourn_type: string,
        entry_fee: number,
        currency: string,
        start_date: string,
        end_date: string,
        min_teams: number,
        slug: string,){
        this.creator = creator;
        this.tourn_name = tourn_name;
        this.tourn_type = tourn_type;
        this.entry_fee = entry_fee;
        this.currency = currency;
        this.start_date = start_date;
        this.end_date = end_date;
        this.min_teams = min_teams;
        this.slug = slug;
    }
}

export class JoinTournamentModel {
    creator: number;
    tourn_name: string;
    tourn_type: string;
    entry_fee: number;
    currency: string;
    start_date: string;
    end_date: string;
    min_teams: number;
    slug: string;
    is_active: boolean;
    number_of_teams: number;
    privacy: boolean;
    tourn_closed: boolean;
  
    constructor(creator: number,
        tourn_name: string,
        tourn_type: string,
        entry_fee: number,
        currency: string,
        start_date: string,
        end_date: string,
        min_teams: number,
        slug: string,
        is_active: boolean,
        number_of_teams: number,
        privacy: boolean,
        tourn_closed: boolean,){
        this.creator = creator;
        this.tourn_name = tourn_name;
        this.tourn_type = tourn_type;
        this.entry_fee = entry_fee;
        this.currency = currency;
        this.start_date = start_date;
        this.end_date = end_date;
        this.min_teams = min_teams;
        this.slug = slug;
        this.is_active = is_active;
        this.number_of_teams = number_of_teams;
        this.privacy = privacy;
        this.tourn_closed = tourn_closed;
    }
  }

export class Slug {
    slug: string;

    constructor(slug:string){
        this.slug=slug;
    }
}

export class TeamsInTournamentModel {
    owner: number;
    tournament: number;
    tournament_name: string;
    team_name: string;
    points: number;
    squad: any;
    team: any;
    team_bench: any;

    constructor(owner: number,
        tournament: number,
        tournament_name: string,
        team_name: string,
        points: number,
        squad: any,
        team: any,
        team_bench: any,){
        this.owner = owner;
        this.tournament = tournament;
        this.tournament_name = tournament_name;
        this.team_name = team_name;
        this.points = points;
        this.squad = squad;
        this.team = team;
        this.team_bench = team_bench;
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