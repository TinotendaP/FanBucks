import fantasy_football_api from '../fantasy_football_api.json';
import { Element, ApiModel, Event, GW } from './squadList.model';
import { Input, Injectable } from '@angular/core';
import { of, delay, Observable, map } from 'rxjs';
import { LocalStorageService } from '../local_storage.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class SquadlistService {
  player_teams: number[]=[];
  cost_list: number[]=[];
  total_cost: number=0;
  squad: number[] = []; 
  gk: Element[]=[]; 
  df: Element[]=[]; 
  mf: Element[]=[];
  fw: Element[]=[];
  squad_detail: Element[]=[];
  info: ApiModel = fantasy_football_api
  the_list:Element[]= this.info.elements;
  all_players:Element[]= [];
  players_num: boolean = true; 
  valid_cost: boolean=true;
  key: string = 'key';
  subject: any ;
  token: any;

  httpHeaders: any;
  baseUrl: string = 'http://127.0.0.1:8000/'

  constructor(){ 
  }

  orderedList(){
    let points = []
    let new_player_list = []
    for(let i=0; i<this.the_list.length; i++){
      points.push(this.the_list[i].total_points)
    }
    points.sort((a, b)=>{return b-a})
    for(let n=0; n<points.length; n++){
      for(let i=0; i<this.the_list.length; i++){
        if(this.the_list[i].total_points==points[n]){
          let result = new_player_list.filter(x => x == this.the_list[i]);
          if(!result[0]){
            new_player_list.push(this.the_list[i])
          } 
        }
      }
    }
    this.all_players = new_player_list
    console.log(this.all_players)
    return this.all_players
  }
  
 //CHANGE POS TO ELEMENTTYPE
  addPlayer( player: any){
      console.log(player)
      let mynumbers = this.player_teams.filter(x => x == player.team);
      let myplayer = this.squad_detail.filter(y => y == player);
      console.log(mynumbers)
      if (myplayer.length==0){
        if (mynumbers.length<3){
          if (Number(player.element_type)==1){ 
            if (this.gk.length<2){
              this.cost_list.push(player.now_cost)
              this.gk.push(player)
              this.player_teams.push(player.team) 
              this.squad.push(player.id)
              this.squad_detail.push(player)
            }
          }
          else if (Number(player.element_type)==2) {
            if (this.df.length<5){
              this.cost_list.push(player.now_cost)
              this.df.push(player)
              this.player_teams.push(player.team)
              this.squad.push(player.id)
              this.squad_detail.push(player)
            }
          }
          else if (Number(player.element_type)==3) {
            if (this.mf.length<5){
              this.cost_list.push(player.now_cost)
              this.mf.push(player)
              this.player_teams.push(player.team)
              this.squad.push(player.id)
              this.squad_detail.push(player)
            }
          }
          else if (Number(player.element_type)==4) {
            if (this.fw.length<3){
              this.cost_list.push(player.now_cost)
              this.fw.push(player)
              this.player_teams.push(player.team)
              this.squad.push(player.id)
              this.squad_detail.push(player)
            }
          }
        }
    }
    console.log(this.squad)
    this.total_cost=0
    for(let i=0; i<this.cost_list.length; i++){
      this.total_cost=this.total_cost+this.cost_list[i]
    }
    console.log(this.total_cost)
  }

  cost(){
    return this.total_cost
  }
  
  removePlayer(player: any){

    let i=0
    if (Number(player.element_type)==1){
      for (let i=0; i<this.gk.length; i++){
        if (this.gk[i].id==player.id){
          delete this.gk[i]
          this.gk.sort()
          this.gk.pop()
        }

      }
    }
    else if (Number(player.element_type)==2) {
      for (let i=0; i<this.df.length; i++){
        if (this.df[i].id==player.id){
          delete this.df[i]
          this.df.sort()
          this.df.pop()
        }

      }
    }
    else if (Number(player.element_type)==3) {
      for (let i=0; i<this.mf.length; i++){
        if (this.mf[i].id==player.id){
          delete this.mf[i]
          this.mf.sort()
          this.mf.pop()
        }

      }
    }
    else if (Number(player.element_type)==4) {
      for (let i=0; i<this.fw.length; i++){
        if (this.fw[i].id==player.id){
          delete this.fw[i]
          this.fw.sort()
          this.fw.pop()
        }

      }
    }
    for (let t=0; t<this.squad.length; t++){
      console.log(player.id) 
      if(this.squad_detail[t].id==player.id){
        console.log(this.squad[t])
        console.log(player.id)
        delete this.squad[t]
        this.squad.sort()
        this.squad.pop()
        delete this.squad_detail[t]
        this.squad_detail.sort()
        this.squad_detail.pop()  
      }
    }
    this.player_teams = []
    this.cost_list = []

    for (let i=0; i< this.squad_detail.length; i++){
      this.cost_list.push(this.squad_detail[i].now_cost)
      this.player_teams.push(this.squad_detail[i].team)
    }
    console.log(this.cost_list)
    this.total_cost=0
    for(let i=0; i<this.cost_list.length; i++){
      this.total_cost=this.total_cost+this.cost_list[i]
    }
    console.log(this.total_cost)
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
    if(this.squad_detail.length!=15 && this.total_cost>1000){
      this.players_num=true
    } else {
      this.players_num=false
    }
    return of(this.players_num)
  }

  playersCost(value:string): Observable<boolean>{
    console.log(this.squad_detail.length)
    if(this.total_cost>1000){
      this.valid_cost=true
    } else {
      this.valid_cost=false
    }
    return of(this.valid_cost)
  }

}