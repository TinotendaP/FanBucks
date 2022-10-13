import { Element, JoinTournModel } from './squadList.model';
import { SquadlistService } from './squadList.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TournamentService } from '../tournaments/tournament.service';
import { LocalStorageService } from '../local_storage.service';


const baseUrl: string = 'http://127.0.0.1:8000/';
@Injectable() 
export class TeamPointsService{
  squadListService: SquadlistService;
  total_squad: Element[];
  team_gk: Element[]=[];
  team_df: Element[]=[];
  team_mf: Element[]=[];
  team_fw: Element[]=[];
  team_bench: Element[]=[]; 
  team: Element[]=[];
  x: number = 0;
  y: number = 0;
  subout:any;
  key: string = 'key';
  subject: any ;
  token: any;

  httpHeaders: any;
  baseUrl: string = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient, private tournamentService: TournamentService,
    private localStorageService: LocalStorageService) { 
    this.squadListService = new SquadlistService(); 
    this.subout=''
    this.total_squad = this.squadListService.squad_detail;
  }

  getToken(){
    this.subject = this.localStorageService.get(this.key)
    this.token = JSON.parse(this.subject)
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token.Authorization})
    return console.log(this.token.Authorization)
  } 
 
  sendPoints(value: number): Observable<any>{
      let body = JSON.stringify(value)
      return this.http.put<any>(this.baseUrl+`team/${value}/`, body, {headers: this.httpHeaders})
  }

  createTeam(value: JoinTournModel): Observable<JoinTournModel>{
    let body=JSON.stringify(value)
    return this.http.post<JoinTournModel>(baseUrl+`team/${this.tournamentService.currentTourn.slug}/`, value, {headers: this.httpHeaders})
  }

  theBench(): Element[]{
    return this.team_bench
  }

  theTeam(): Element[]{
    return this.team
  }

  onLoad(value: any){
    for(let i=0; i<value.length; i++){
      if (value[i].element_type==1){
        if(this.team_gk.length==0){
          this.team_gk.push(value[i])
          this.team.push(value[i])
        }
        else {
          this.team_bench.push(value[i])
        }
      }
      else if (value[i].element_type==2){
        if(this.team_df.length<4){
          this.team_df.push(value[i])
          this.team.push(value[i])
        }
        else {
          this.team_bench.push(value[i])
        }
      }
      else if (value[i].element_type==3){
        if(this.team_mf.length<4){
          this.team_mf.push(value[i])
          this.team.push(value[i])
        }
        else {
          this.team_bench.push(value[i])
        }
      }
      else if (value[i].element_type==4){
        if(this.team_fw.length<2){
          this.team_fw.push(value[i])
          this.team.push(value[i])
        }
        else {
          this.team_bench.push(value[i])
        }
      }
    }
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
            if(this.team[i].id==this.subout.id){
              delete this.team_gk[i]
              this.team_gk.sort()
              this.team_gk.pop()
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
          this.team_bench.push(this.subout)
          this.team.push(player)
          this.team_gk.push(player)
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
    console.log(this.team_bench)
    console.log(this.team)
    console.log(this.team[event.currentIndex])
    console.log(event.previousIndex)
    console.log(event.currentIndex)
    console.log(event.previousContainer.data)
    console.log(event.container.data)
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