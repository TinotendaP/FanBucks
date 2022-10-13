import { Component, OnInit } from '@angular/core';
import { Element, JoinTournModel, PlayerModel } from '../squadList.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { SquadEditService } from '../transfer_player.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css',  
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class EditTeamComponent implements OnInit {

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
  current_squad: any;
  squad_detail: any;
  name: string = '';
  edit: any = {status: true, name: ''}

  constructor(private router: Router, private squadEditService: SquadEditService) {      

    this.current_squad = this.router.getCurrentNavigation()?.extras.state;
    this.team = this.squadEditService.current_squad.team;
    this.team_bench = this.squadEditService.team_bench;
    this.squad_detail = this.squadEditService.squad_detail;
    this.fw = this.squadEditService.team_fw;
    this.mid = this.squadEditService.team_mf;
    this.def = this.squadEditService.team_df;
    this.gk = this.squadEditService.team_gk;
    
  }

  subIns(player:Element){
    if (this.edit.status == true){
      this.squadEditService.subIn(player) 
    }
  }

  subOuts(players:Element){
    if (this.edit.status == true){
      this.squadEditService.subOut(players)
    }
  }

  onDrops(event: CdkDragDrop<Element[]>){
    if (this.edit.status == true){
      this.squadEditService.onDrop(event)
    }
  }

  onSubmit(){
      this.submitData.team_name=this.name;
      this.submitData.squad = this.squad_detail;
      this.submitData.team = this.team;
      this.submitData.team_bench = this.team_bench;
      console.log(this.submitData)
      this.squadEditService.updateData(this.submitData)
      .subscribe(data=>(console.log(data)))
    
  }

  ngOnInit(): void { 
  //  this.squadEditService.transferActive().
  //  subscribe(data=>{this.edit = data; console.log(data)})
    if(this.current_squad){
      this.squadEditService.trial()
      this.team_bench = this.squadEditService.theBench()
      this.team = this.squadEditService.theTeam()
      for(let i=0; i<this.team.length; i++){
        if (this.team[i].element_type==1){
  
          this.gk.push(this.team[i])
  
        }
        else if (this.team[i].element_type==2){
  
          this.def.push(this.team[i])
  
        }
        else if (this.team[i].element_type==3){
          this.mid.push(this.team[i])
  
        }
        else if (this.team[i].element_type==4){
       
          this.fw.push(this.team[i])
          
        }
      }
      this.squad_detail = this.squadEditService.theSquad() 
      this.name = this.squadEditService.theName() 
      console.log(this.team)
      console.log(this.team_bench)
    }

    

  }
}
