import { Component, OnInit } from '@angular/core';
import { Element, JoinTournModel, PlayerModel } from '../squadList.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { TeamPointsService } from '../team-points.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.css',  
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class TeamSelectionComponent implements OnInit {
  team: Element[];
  team_bench: Element[];
  fw: Element[];
  mid: Element[];
  def: Element[];
  gk: Element[];
  squad: any;
  submitData: JoinTournModel = {owner: 0,
    tournament: 0,
    team_name: '',
    points: 0,
    squad: '',
    team: '',
    team_bench: ''};  
  results: any; 
  slug: any;
 
  constructor(private router: Router, private teamPointsService: TeamPointsService) {  

    this.squad = this.router.getCurrentNavigation()?.extras.state;

    this.team = this.teamPointsService.team;
    this.team_bench = this.teamPointsService.team_bench;
    this.fw = this.teamPointsService.team_fw;
    this.mid = this.teamPointsService.team_mf;
    this.def = this.teamPointsService.team_df;
    this.gk = this.teamPointsService.team_gk;
  }

  subIns(player:Element){
    this.teamPointsService.subIn(player) 
    console.log(player)
  }

  subOuts(players:Element){
    this.teamPointsService.subOut(players)
    console.log(players)
  }

  onDrops(event: CdkDragDrop<Element[]>){
    this.teamPointsService.onDrop(event)
  }

  onSubmit(){
    if(this.squad){
      this.submitData.team_name=this.squad.name;
      this.submitData.squad = this.squad.players;
      this.submitData.team = this.team;
      console.log(this.team_bench)
      this.submitData.team_bench = this.team_bench;
      console.log(this.submitData)
      this.teamPointsService.createTeam(this.submitData)
      .subscribe(data=>(console.log(data)))
      this.router.navigateByUrl('/home')
    }
  }

  ngOnInit(): void { 
    this.teamPointsService.getToken()
    if(this.squad){
      this.teamPointsService.onLoad(this.squad.players)
      this.team = this.teamPointsService.team;
      this.team_bench = this.teamPointsService.team_bench;
      console.log(this.squad)
    }

  }

}
