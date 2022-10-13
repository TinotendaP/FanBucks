import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TournamentTeams, TournFormModel, TeamsInTournamentModel } from '../tournament.model';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-tournaments',
  templateUrl: './active-tournaments.component.html',
  styleUrls: ['./active-tournaments.component.css', 
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class ActiveTournamentsComponent implements OnInit {

  teams: any=[];
  myteam: any;
  allteams: any;
  token: any;

  tourn_names: any;

  @Output() balance = new EventEmitter<number>();

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

  tournament_list: TournamentTeams[]=[]

  new_list: TeamsInTournamentModel[] = []

  new_tournament: TournamentTeams[]=[]
 
  ordered_points: TournamentTeams[]=[];

  max_tourn_id: number=0;
  pre_list: number[] = [];
  final_list:any;
  data_list: any[] = [];

  constructor(private tournamentService: TournamentService, private router: Router) { 
    this.final_list = '';
  }

  getBalance(value: number){
    this.balance.emit(value)
  }
   
  loadTourn(){
    this.tournamentService.activeLeague()
    .subscribe(data=>{console.log(data); this.teams = data})
    this.tournament_list=[]
    console.log(this.teams)
    for (let i=0; i<this.teams.length; i++){
      if (this.teams[i].tournament == this.dummy_tourn.tourn_id){
        this.dummy_tourn.tourn_id = this.teams[i].tournament
        this.tournamentService.tournNames(this.dummy_tourn.tourn_id)
        .subscribe(data=>this.tourn_info = data)
        console.log(this.tourn_info)
        this.dummy_tourn.tourn_name = this.tourn_info.tourn_name 
        this.dummy_tourn.tourn.push(this.teams[i])
      }
      else if (this.teams[i].tournament != this.dummy_tourn.tourn_id){
        this.tournament_list.push(this.dummy_tourn)
        this.dummy_tourn.tourn = []
        this.dummy_tourn.tourn_id = this.teams[i].tournament
        this.tournamentService.tournNames(this.dummy_tourn.tourn_id)
        .subscribe(data=>this.tourn_info = data)
        this.dummy_tourn.tourn_name = this.tourn_info.tourn_name
        this.dummy_tourn.tourn.push(this.teams[i])
      }
      console.log(this.tournament_list)
    }
    console.log(this.tournament_list)
    
  }

  sendData(value: any){
    this.router.navigateByUrl('/edit-squad', {state: value})
  } 

  getPoints(team: any, team_bench: any){
    this.data_list = [team, team_bench]
    this.router.navigateByUrl('/points', {state: this.data_list})
  }

  ngOnInit(): void {
    this.tournamentService.getToken()
    this.tournamentService.activeLeague()
    .subscribe(data =>{console.log(data); this.myteam = data})
    console.log(this.myteam)
    this.tournamentService.fetchUserTeams()
    .subscribe(data =>{console.log(data); this.allteams = data})
    setTimeout(() => {
      this.tournament_list=[]
      this.new_tournament=[]
      this.dummy_tourn={tourn_id: -1, tourn_name: '', tourn: []}
      console.log(this.myteam.length)
      for (let i=0; i<this.myteam.length; i++){
        console.log(i)
        console.log('yes')
        if (this.myteam[i].tournament == this.dummy_tourn.tourn_id){
          console.log('yes1')
          console.log(this.dummy_tourn)
          this.dummy_tourn.tourn.push(this.myteam[i])
        }
        else if (this.dummy_tourn.tourn.length==0){
          console.log('yes2')
          console.log(this.myteam[i].tournament)
          console.log(this.dummy_tourn.tourn_id)
          this.dummy_tourn.tourn_id = this.myteam[i].tournament
          this.dummy_tourn.tourn_name = this.myteam[i].tournament_name
          this.dummy_tourn.tourn.push(this.myteam[i])
          console.log(this.myteam[i].tournament)
          console.log(this.dummy_tourn.tourn)
        }
        else if (this.myteam[i].tournament != this.dummy_tourn.tourn_id){
          console.log('yes3')
          console.log(this.dummy_tourn)
          let dummy_tourns = JSON.parse(JSON.stringify(this.dummy_tourn))
          this.tournament_list.push(dummy_tourns)
          console.log(this.tournament_list)
          if (this.tournament_list.length!=0){
            console.log('yes4')
            this.dummy_tourn.tourn_id = this.myteam[i].tournament
            this.dummy_tourn.tourn_name = this.myteam[i].tournament_name
            this.dummy_tourn.tourn=[]
            this.dummy_tourn.tourn.push(this.myteam[i])
          }
        }
      }
      this.tournament_list.push(this.dummy_tourn)
      console.log(this.tournament_list[0].tourn.length)
      console.log(this.tournament_list[0].tourn)
      for(let i=0;i<this.tournament_list.length;i++){
        for (let t=0; t<this.tournament_list[i].tourn.length; t++){
          this.pre_list.push(this.tournament_list[i].tourn[t].points)
          this.pre_list.sort(function(a,b){return b-a})
          console.log(i)
          console.log(t)
        }
        console.log(this.pre_list)
        for (let u=0; u<this.pre_list.length; u++){
          for (let t=0; t<this.tournament_list[i].tourn.length; t++){
            if(this.tournament_list[i].tourn[t].points==this.pre_list[u]){
              if (this.tournament_list[i].tourn.length == this.new_list.length){
                break;
              }
              this.new_list.push(this.tournament_list[i].tourn[t])
            }
          }
        }
        console.log(this.new_list)
        this.tournament_list[i].tourn = this.new_list
        this.new_tournament.push(this.tournament_list[i])
        this.pre_list=[]
        this.new_list=[]
      }
      console.log(this.new_tournament)
      console.log(this.tournament_list)
    }, 5000)
  }

  trial(){
    this.tournament_list=[]
    this.new_tournament=[]
    this.dummy_tourn={tourn_id: -1, tourn_name: '', tourn: []}
    console.log(this.myteam.length)
    for (let i=0; i<this.myteam.length; i++){
      console.log('yes')
      if (this.myteam[i].tournament == this.dummy_tourn.tourn_id){
        console.log('yes1')
        console.log(this.dummy_tourn)
        this.dummy_tourn.tourn.push(this.myteam[i])
      }
      else if (this.dummy_tourn.tourn.length==0){
        console.log('yes2')
        console.log(this.myteam[i].tournament)
        console.log(this.dummy_tourn.tourn_id)
        this.dummy_tourn.tourn_id = this.myteam[i].tournament
        this.dummy_tourn.tourn_name = this.myteam[i].tournament_name
        this.dummy_tourn.tourn.push(this.myteam[i])
        console.log(this.myteam[i].tournament)
        console.log(this.dummy_tourn.tourn)
      }
      else if (this.myteam[i].tournament != this.dummy_tourn.tourn_id){
        console.log('yes3')
        console.log(this.dummy_tourn)
        let dummy_tourns = JSON.parse(JSON.stringify(this.dummy_tourn))
        this.tournament_list.push(dummy_tourns)
        console.log(this.tournament_list)
        if (this.tournament_list.length!=0){
          console.log('yes4')
          this.dummy_tourn.tourn_id = this.myteam[i].tournament
          this.dummy_tourn.tourn_name = this.myteam[i].tournament_name
          this.dummy_tourn.tourn=[]
          this.dummy_tourn.tourn.push(this.myteam[i])
        }
      }
    }
    this.tournament_list.push(this.dummy_tourn)
    for(let i=0;i<this.tournament_list.length;i++){
      for (let t=0; t<this.tournament_list[i].tourn.length; t++){
        this.pre_list.push(this.tournament_list[i].tourn[t].points)
        this.pre_list.sort(function(a,b){return b-a})
      }
      console.log(this.pre_list)
      for (let u=0; u<this.pre_list.length; u++){
        for (let t=0; t<this.tournament_list[i].tourn.length; t++){
          if(this.tournament_list[i].tourn[t].points==this.pre_list[u]){
            this.new_list.push(this.tournament_list[i].tourn[t])
          }
        }
      }
      console.log(this.new_list)
      this.tournament_list[i].tourn = this.new_list
      this.new_tournament.push(this.tournament_list[i])
      this.pre_list=[]
      this.new_list=[]
    }
    console.log(this.new_tournament)
    console.log(this.tournament_list)
  }
}