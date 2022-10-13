import fantasy_football_api from '../fantasy_football_api.json';
import { Element, ApiModel, Event, JoinTournModel } from './squadList.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Input, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local_storage.service';

@Injectable()
export class SquadEditService {
  team_gk: Element[]=[];
  team_df: Element[]=[];
  team_mf: Element[]=[];
  team_fw: Element[]=[];
  team_bench: Element[]=[]; 
  team: Element[]=[];
  x: number = 0;
  y: number = 0;
  subout:any;  
  name: string = '';
  key: string = 'key'; 
  subject: any ;
  token: any; 

  player_teams: number[]=[];
  cost_list: number[]=[];
  total_cost: number=0;
  squad: number[] = []; 
  gk: Element[]=[]; 
  df: Element[]=[]; 
  mf: Element[]=[];
  fw: Element[]=[];
  transfer_in: Element[]=[];
  transfer_out: Element[]=[];
  squad_detail: Element[]=[];
  info: ApiModel = fantasy_football_api
  all_players:Element[]= this.info.elements;
  players_num: boolean = true;
  valid_cost: boolean=true;
  httpHeaders: any;
  baseUrl: string = 'http://127.0.0.1:8000/'

  current_squad: JoinTournModel = {owner: 0,
    tournament: 0,
    team_name: '',
    points: 0,
    squad: '',
    team: '',
    team_bench: ''};
    removed: Element[] = [];

  constructor(private http:HttpClient, private localStorageService: LocalStorageService){ 
    this.subout='';
  }

  getToken(){
    this.subject = this.localStorageService.get(this.key)
    this.token = JSON.parse(this.subject)
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token.Authorization})
    return console.log(this.token.Authorization)
  } 

  transferActive(): Observable<any>{
    return this.http.get<any>(this.baseUrl+`gameweek/`, {headers: this.httpHeaders})
  }

  grabSquad(value: string): Observable<any>{
    console.log('tapfuura nepo')
    return this.http.get<any>(this.baseUrl+`team/${value}/`, {headers: this.httpHeaders}) 
  } 

  clickDOM(value: any){
    this.gk = [];
    this.df = [];
    this.mf = [];
    this.fw = [];
    this.player_teams = [];
    this.squad = [];
    this.squad_detail = [];
    this.cost_list = []
    for(let i=0; i<value.squad.length; i++){
    let mynumbers = this.player_teams.filter(x => x == value.squad[i].team);
    let myplayer = this.squad.filter(y => y == value.squad[i].id);
    if (myplayer.length==0){
      if (mynumbers.length<3){
        if (Number(value.squad[i].element_type)==1){ 
          if (this.gk.length<2){
            this.gk.push(value.squad[i])
            this.player_teams.push(value.squad[i].team) 
            this.squad.push(value.squad[i].id)
            this.squad_detail.push(value.squad[i])
            this.cost_list.push(value.squad[i].now_cost)
          }
        }
        else if (Number(value.squad[i].element_type)==2) {
          if (this.df.length<5){
            this.df.push(value.squad[i])
            this.player_teams.push(value.squad[i].team)
            this.squad.push(value.squad[i].id)
            this.squad_detail.push(value.squad[i])
            this.cost_list.push(value.squad[i].now_cost)
          }
        }
        else if (Number(value.squad[i].element_type)==3) {
          if (this.mf.length<5){
            this.mf.push(value.squad[i])
            this.player_teams.push(value.squad[i].team)
            this.squad.push(value.squad[i].id)
            this.squad_detail.push(value.squad[i])
            this.cost_list.push(value.squad[i].now_cost)
          }
        }
        else if (Number(value.squad[i].element_type)==4) {
          if (this.fw.length<3){
            this.fw.push(value.squad[i])
            this.player_teams.push(value.squad[i].team)
            this.squad.push(value.squad[i].id)
            this.squad_detail.push(value.squad[i])
            this.cost_list.push(value.squad[i].now_cost)
          }
        }
      }
    }
    this.total_cost=0
    for(let i=0; i<this.cost_list.length; i++){
      this.total_cost=this.total_cost+this.cost_list[i]
    }
    console.log(this.total_cost) 
    }
  }


 //CHANGE POS TO ELEMENTTYPE
  addPlayer( player: any){
    let mynumbers = this.player_teams.filter(x => x == player.team);
    let myplayer = this.squad.filter(y => y == player.id);
    if (this.transfer_in.length<1){
        if (myplayer.length==0){
          if (mynumbers.length<4){
            if (Number(player.element_type)==1){ 
              if (this.gk.length<2){
                this.gk.push(player)
                this.player_teams.push(player.team) 
                this.squad.push(player.id)
                this.squad_detail.push(player)
                this.cost_list.push(player.now_cost)
                this.transfer_in.push(player)
              }
            }
            else if (Number(player.element_type)==2) {
              if (this.df.length<5){
                this.df.push(player)
                this.player_teams.push(player.team)
                this.squad.push(player.id)
                this.squad_detail.push(player)
                this.cost_list.push(player.now_cost)
                this.transfer_in.push(player)
              }
            }
            else if (Number(player.element_type)==3) {
              if (this.mf.length<5){
                this.mf.push(player)
                this.player_teams.push(player.team)
                this.squad.push(player.id)
                this.squad_detail.push(player)
                this.cost_list.push(player.now_cost)
                this.transfer_in.push(player)
              }
            }
            else if (Number(player.element_type)==4) {
              if (this.fw.length<3){
                this.fw.push(player)
                this.player_teams.push(player.team)
                this.squad.push(player.id)
                this.squad_detail.push(player)
                this.cost_list.push(player.now_cost)
                this.transfer_in.push(player)
              }
            }
          }
        }
    }
    this.total_cost=0
    for(let i=0; i<this.cost_list.length; i++){
      this.total_cost=this.total_cost+this.cost_list[i]
    }
   
  }
  
  removePlayer(player: any){

    if (this.transfer_out.length<1) {  
        if (Number(player.element_type)==1){
          for (let i=0; i<this.gk.length; i++){
            if (this.gk[i].id==player.id){
                delete this.gk[i]
                this.gk.sort()
                this.gk.pop()
                this.transfer_out.push(player)
                this.removed.push(player)
                
            }
          }
        }
        else if (Number(player.element_type)==2) {
          for (let i=0; i<this.df.length; i++){
            if (this.df[i].id==player.id){
              delete this.df[i]
              this.df.sort()
              this.df.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
              console.log(this.removed)
            }
          }
        }
        else if (Number(player.element_type)==3) {
          for (let i=0; i<this.mf.length; i++){
            if (this.mf[i].id==player.id){
              delete this.mf[i]
              this.mf.sort()
              this.mf.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
            }
          }
        }
        else if (Number(player.element_type)==4) {
          for (let i=0; i<this.fw.length; i++){
            if (this.fw[i].id==player.id){
              delete this.fw[i]
              this.fw.sort()
              this.fw.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
            }
          }
        }
        for (let t=0; t<this.squad.length; t++){
          if(this.squad[t]==player.id){
            delete this.squad[t]
            this.squad.sort()
            this.squad.pop()
            delete this.squad_detail[t]
            this.squad_detail.sort()
            this.squad_detail.pop()    
            delete this.player_teams[t]
            this.player_teams.sort()
            this.player_teams.pop()
            delete this.cost_list[t]
            this.cost_list.sort()
            this.cost_list.pop()        
          }
        }
        this.cost_list = []
        for (let i=0; i< this.squad_detail.length; i++){
          this.cost_list.push(this.squad_detail[i].now_cost)
        }
        console.log(this.cost_list)
        this.total_cost=0
        for(let i=0; i<this.cost_list.length; i++){
          this.total_cost=this.total_cost+this.cost_list[i]
        }
        console.log(this.total_cost)
    } 
    else if (player.id == this.transfer_in[0].id) {  
        this.transfer_in.pop()
        this.transfer_in.pop()
        if (Number(player.element_type)==1){
          for (let i=0; i<this.gk.length; i++){
            if (this.gk[i].id==player.id){
                delete this.gk[i]
                this.gk.sort()
                this.gk.pop()
                this.transfer_out.push(player)
                this.removed.push(player)
            }
          }
        }
        else if (Number(player.element_type)==2) {
          for (let i=0; i<this.df.length; i++){
            if (this.df[i].id==player.id){
              delete this.df[i]
              this.df.sort()
              this.df.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
              console.log('player')
            }
          }
        }
        else if (Number(player.element_type)==3) {
          for (let i=0; i<this.mf.length; i++){
            if (this.mf[i].id==player.id){
              delete this.mf[i]
              this.mf.sort()
              this.mf.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
            }
          }
        }
        else if (Number(player.element_type)==4) {
          for (let i=0; i<this.fw.length; i++){
            if (this.fw[i].id==player.id){
              delete this.fw[i]
              this.fw.sort()
              this.fw.pop()
              this.transfer_out.push(player)
              this.removed.push(player)
            }
          }
        }
        for (let t=0; t<this.squad.length; t++){
          if(this.squad[t]==player.id){
            delete this.squad[t]
            this.squad.sort()
            this.squad.pop()
            delete this.squad_detail[t]
            this.squad_detail.sort()
            this.squad_detail.pop()    
            delete this.player_teams[t]
            this.player_teams.sort()
            this.player_teams.pop()
            delete this.cost_list[t]
            this.cost_list.sort()
            this.cost_list.pop()        
          }
        }
        this.total_cost=0
        for(let i=0; i<this.cost_list.length; i++){
          this.total_cost=this.total_cost+this.cost_list[i]
        }
    }
  }

  updateSquad(){
  }


  search (query: string) {
    let list: Element[] =[]
    let queries = RegExp(query, 'i')
    for(let t=0; t<this.all_players.length; t++){
      if (queries.test(this.all_players[t].web_name)==true){
        list.push(this.all_players[t])
      }
    }
    const ofobs = of(list)
    return ofobs
  }

  countPlayers(value:string): Observable<boolean>{
    console.log(this.squad_detail.length)
    if(this.squad_detail.length==15){
      this.players_num=false
    } else {
      this.players_num=true
    }
    return of(this.players_num)
  }

  playersCost(value:string): Observable<boolean>{
    console.log(this.squad_detail.length)
    if(this.total_cost>1000){
      this.valid_cost=false
    } else {
      this.valid_cost=true
    }
    return of(this.valid_cost)
  }

  updateData(value: any): Observable<any>{
    console.log('tapfuura nepo')
    return this.http.put<any>(this.baseUrl+`team_change/league-remandere/`, value, {headers: this.httpHeaders})
  }

  trial(){
    if (this.removed[0]){
      console.log(this.removed)
      let removed = this.removed
      let transfer_in = this.transfer_in
      this.current_squad.squad = this.x
      console.log('i am here')
      console.log(removed[0])
      console.log(removed[0].id) 
      for (let i=0; i<this.current_squad.team.length; i++){
        console.log(this.current_squad.team[i].id)
        console.log('i am here futi')
        console.log(this.current_squad.team[i].length)
        if (this.current_squad.team[i].id==removed[0].id){
          console.log('Are you there')
          delete this.current_squad.team[i]
          this.current_squad.team.sort()
          this.current_squad.team.pop()
          this.current_squad.team.push(transfer_in[0])
          console.log('removed2')
        }
      }
      for (let i=0; i<this.current_squad.team_bench.length; i++){
        if (this.current_squad.team_bench[i]==removed[0]){
          delete this.current_squad.team_bench[i]
          this.current_squad.team_bench.sort()
          this.current_squad.team_bench.pop()
          this.current_squad.team_bench.push(transfer_in[0])
          console.log('this.removed1')
        }
      }
    }

    console.log(this.current_squad)
    this.name = this.current_squad.team_name
    this.team = this.current_squad.team
    this.team_bench = this.current_squad.team_bench
  }
  

  theBench(): Element[]{
    return this.team_bench
  }

  theFw(): Element[]{
    return this.team_fw
  }

  theDf(): Element[]{
    return this.team_df
  }

  theMf(): Element[]{
    return this.team_mf
  }

  theGk(): Element[]{
    return this.team_gk
  }

  theTeam(): Element[]{
    return this.team
  }

  theSquad(): Element[]{
    return this.squad_detail
  }

  theName(): string{
    return this.name
  }
  onLoad(){
    this.team_gk = []
    this.team_df = []
    this.team_mf = []
    this.team_fw = []
    for(let i=0; i<this.team.length; i++){
      if (this.team[i].element_type==1){

        this.team_gk.push(this.team[i])

      }
      else if (this.team[i].element_type==2){

        this.team_df.push(this.team[i])

      }
      else if (this.team[i].element_type==3){
        this.team_mf.push(this.team[i])

      }
      else if (this.team[i].element_type==4){
     
        this.team_fw.push(this.team[i])
        
      }
    }
    console.log(this.team_gk)
    console.log(this.team_df)
    console.log(this.team_mf)
    console.log(this.team_fw)
  }

  subIn(player:Element){
    if( this.subout != 0){
      console.log(this.subout)
      if (player.element_type==1){
        if (this.subout.element_type==1){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            console.log('missed')
            if(this.team[i].id==this.subout.id){
              console.log('passed')
              delete this.team_gk[i]
              this.team_gk.sort()
              this.team_gk.pop()
              console.log(this.team_gk)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
            }
          }
          this.team_bench.push(this.subout)
          this.team.push(player)
          this.team_gk.push(player)
          console.log(this.team_gk)
        }
      }
      else if (player.element_type==2){
        if (this.subout.element_type==2){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team_df.length; i++){
            if(this.team_df[i].id==this.subout.id){
              delete this.team_df[i]
              this.team_df.sort()
              this.team_df.pop()
              console.log(this.subout)
            }
          }
          this.team_df.push(player)
          this.team.push(player)
          this.team_bench.push(this.subout)
        }
        else if (this.subout.element_type==3){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team_mf.length; i++){
            if(this.team_mf[i].id==this.subout.id){
              delete this.team_mf[i]
              this.team_mf.sort()
              this.team_mf.pop()
              console.log(this.subout)
            }
          }
          this.team_df.push(player)
          this.team.push(player)
          this.team_bench.push(this.subout)
        }
        else if (this.subout.element_type==4){
          console.log(this.subout)
          if (this.team_fw.length>1){
            console.log(this.subout)
            for (let i=0; i<this.team_bench.length; i++){
              if(this.team_bench[i].id==player.id){
                delete this.team_bench[i]
                this.team_bench.sort()
                this.team_bench.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team.length; i++){
              if(this.team[i].id==this.subout.id){
                delete this.team[i]
                this.team.sort()
                this.team.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team_fw.length; i++){
              if(this.team_fw[i].id==this.subout.id){
                delete this.team_fw[i]
                this.team_fw.sort()
                this.team_fw.pop()
                console.log(this.subout)
              }
            }
            this.team_df.push(player)
            this.team.push(player)
            this.team_bench.push(this.subout)
          }
        }
      }
      else if (player.element_type==3){
        if (this.subout.element_type==2){
          if (this.team_df.length>3){
            for (let i=0; i<this.team_bench.length; i++){
              if(this.team_bench[i].id==player.id){
                delete this.team_bench[i]
                this.team_bench.sort()
                this.team_bench.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team.length; i++){
              if(this.team[i].id==this.subout.id){
                delete this.team[i]
                this.team.sort()
                this.team.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team_df.length; i++){
              if(this.team_df[i].id==this.subout.id){
                delete this.team_df[i]
                this.team_df.sort()
                this.team_df.pop()
                console.log(this.subout)
              }
            }
            this.team_mf.push(player)
            this.team.push(player)
            this.team_bench.push(this.subout)
            console.log(this.subout)
          }
        }
        else if (this.subout.element_type==3){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team_mf.length; i++){
            if(this.team_mf[i].id==this.subout.id){
              delete this.team_mf[i]
              this.team_mf.sort()
              this.team_mf.pop()
              console.log(this.subout)
            }
          }
          this.team_mf.push(player)
          this.team.push(player)
          this.team_bench.push(this.subout)
        }
        else if (this.subout.element_type==4){
          if (this.team_fw.length>1){
            for (let i=0; i<this.team_bench.length; i++){
              if(this.team_bench[i].id==player.id){
                delete this.team_bench[i]
                this.team_bench.sort()
                this.team_bench.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team.length; i++){
              if(this.team[i].id==this.subout.id){
                delete this.team[i]
                this.team.sort()
                this.team.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team_fw.length; i++){
              if(this.team_fw[i].id==this.subout.id){
                delete this.team_fw[i]
                this.team_fw.sort()
                this.team_fw.pop()
                console.log(this.subout)
              }
            }
            this.team_mf.push(player)
            this.team.push(player)
            this.team_bench.push(this.subout)
            console.log(this.team_fw.length)
            console.log('pane error')
          }
        }
      }
      else if (player.element_type==4){
        if (this.subout.element_type==2){
          if (this.team_df.length>3){
            for (let i=0; i<this.team_bench.length; i++){
              if(this.team_bench[i].id==player.id){
                delete this.team_bench[i]
                this.team_bench.sort()
                this.team_bench.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team.length; i++){
              if(this.team[i].id==this.subout.id){
                delete this.team[i]
                this.team.sort()
                this.team.pop()
                console.log(this.subout)
              }
            }
            for (let i=0; i<this.team_df.length; i++){
              if(this.team_df[i].id==this.subout.id){
                delete this.team_df[i]
                this.team_df.sort()
                this.team_df.pop()
                console.log(this.subout)
              }
            }
            this.team_fw.push(player)
            this.team.push(player)
            this.team_bench.push(this.subout)
          }
        }
        else if (this.subout.element_type==3){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team_mf.length; i++){
            if(this.team_mf[i].id==this.subout.id){
              delete this.team_mf[i]
              this.team_mf.sort()
              this.team_mf.pop()
              console.log(this.subout)
            }
          }
          this.team_fw.push(player)
          this.team.push(player)
          this.team_bench.push(this.subout)
          console.log(this.subout)
        }
        else if (this.subout.element_type==4){
          for (let i=0; i<this.team_bench.length; i++){
            if(this.team_bench[i].id==player.id){
              delete this.team_bench[i]
              this.team_bench.sort()
              this.team_bench.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team.length; i++){
            if(this.team[i].id==this.subout.id){
              delete this.team[i]
              this.team.sort()
              this.team.pop()
              console.log(this.subout)
            }
          }
          for (let i=0; i<this.team_fw.length; i++){
            if(this.team_fw[i].id==this.subout.id){
              delete this.team_fw[i]
              this.team_fw.sort()
              this.team_fw.pop()
              console.log(this.subout)
            }
          }
          this.team_fw.push(player)
          this.team.push(player)
          this.team_bench.push(this.subout)
          console.log(this.subout)
        }
      }
    }
    this.subout=0
  }

  subOut(players:Element){
    this.subout =players
  }







  onDrop(event: CdkDragDrop<Element[]>) {
    this.x=Number(event.previousIndex)
    this.y=Number(event.currentIndex)

    if (event.previousContainer.data==this.team_bench){
      if (this.team[this.y]){
        if(this.team[this.y].element_type==1){
          if(this.team_bench[this.x].element_type==1){
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            if (this.team_bench.length<4){
              this.team_bench.push(this.team[(this.y+1)])
              delete this.team[(this.y+1)]
              this.team.sort()
              this.team.pop()
              this.team_gk = [this.team[this.y]]
            }
          }
        }
        else if (this.team_bench[this.x].element_type!=1){
          if (this.team[this.y].element_type==2){
            if (this.team_df.length>3){
              for (let i=0; i<this.team_df.length; i++){
                if(this.team[this.y].id==this.team_df[i].id){
                  delete this.team_df[i]
                  this.team_df.sort()
                  this.team_df.pop()
                }
              }
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              if (this.team_bench.length<4){
                this.team_bench.push(this.team[(this.y+1)])
                delete this.team[(this.y+1)]
                this.team.sort()
                this.team.pop()
              }
              if (this.team[this.y].element_type==2){
                this.team_df.push(this.team[this.y])
              }
              else if (this.team[this.y].element_type==3){
                this.team_mf.push(this.team[this.y])
              }
              else if (this.team[this.y].element_type==4){
                this.team_fw.push(this.team[this.y])
              } 
            }
            else if (this.team_bench[this.x].element_type==2){
              for (let i=0; i<this.team_df.length; i++){
                if(this.team[this.y].id==this.team_df[i].id){
                  delete this.team_df[i]
                  this.team_df.sort()
                  this.team_df.pop()
                }
              }
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              if (this.team_bench.length<4){
                this.team_bench.push(this.team[(this.y+1)])
                delete this.team[(this.y+1)]
                this.team.sort()
                this.team.pop()
                this.team_df.push(this.team[this.y])
              }

            }
          }
          else if (this.team[this.y].element_type==4){
            if (this.team_fw.length>1){
              for (let i=0; i<this.team_fw.length; i++){
                if(this.team[this.y].id==this.team_fw[i].id){
                  delete this.team_fw[i]
                  this.team_fw.sort()
                  this.team_fw.pop()
                }
              }
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              if (this.team_bench.length<4){
                this.team_bench.push(this.team[(this.y+1)])
                delete this.team[(this.y+1)]
                this.team.sort()
                this.team.pop()
              }
              if (this.team[this.y].element_type==2){
                this.team_df.push(this.team[this.y])
              }
              else if (this.team[this.y].element_type==3){
                this.team_mf.push(this.team[this.y])
              }
              else if (this.team[this.y].element_type==4){
                this.team_fw.push(this.team[this.y])
              } 
            }
            else if (this.team[this.y].element_type==4){
              for (let i=0; i<this.team_fw.length; i++){
                if(this.team[this.y].id==this.team_fw[i].id){
                  delete this.team_fw[i]
                  this.team_fw.sort()
                  this.team_fw.pop()
                }
              }
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              if (this.team_bench.length<4){
                this.team_bench.push(this.team[(this.y+1)])
                delete this.team[(this.y+1)]
                this.team.sort()
                this.team.pop()
                this.team_fw.push(this.team[this.y])
              }
            }
          }
          else if (this.team[this.y].element_type==3){
            for (let i=0; i<this.team_mf.length; i++){
              if(this.team[this.y].id==this.team_mf[i].id){
                delete this.team_mf[i]
                this.team_mf.sort()
                this.team_mf.pop()
              }
            }
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            if (this.team_bench.length<4){
              this.team_bench.push(this.team[(this.y+1)])
              delete this.team[(this.y+1)]
              this.team.sort()
              this.team.pop()
            }
            if (this.team[this.y].element_type==2){
              this.team_df.push(this.team[this.y])
            }
            else if (this.team[this.y].element_type==3){
              this.team_mf.push(this.team[this.y])
            }
            else if (this.team[this.y].element_type==4){
              this.team_fw.push(this.team[this.y])
            }
          }
        }
      }
    }
  }
}

