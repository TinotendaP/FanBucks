import { Component, OnInit } from '@angular/core';
import { TeamPointsService } from '../team-points.service';
import { Element } from '../squadList.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css',  
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class PointsComponent implements OnInit {
  fw: Element[] = [];
  mid: Element[] = [];
  def: Element[] = [];
  gk: Element[] = [];
  team: Element[];
  team_bench: Element[];
  points: number=0
  squadInfo: any;

  constructor(private teamPointsService: TeamPointsService, private http: HttpClient,
    private router: Router) { 
    this.squadInfo = this.router.getCurrentNavigation()?.extras.state;
    this.team = this.squadInfo[0]
    this.team_bench = this.squadInfo[1]
  }
  
  ngOnInit(): void {
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
    for (let i=0; i<this.team.length; i++){
      this.points = Number(this.team[i].event_points)+this.points
    }
  }

}
 