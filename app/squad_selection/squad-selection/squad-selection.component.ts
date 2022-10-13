import { Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, map, filter, debounceTime, tap, switchMap } from 'rxjs';
import { SquadlistService } from '../squadList.service';
import { Element, Crate, Squad } from '../squadList.model';
import { TeamValidator, TeamNumValidator, TeamCostValidator } from '../team_name.validators';
import { TeamService } from '../team_name.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-squad-selection',
  templateUrl: './squad-selection.component.html',
  styleUrls: ['./squad-selection.component.css', 
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})


export class SquadSelectionComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<Element[]> = new EventEmitter<Element[]>();

  squadListService: SquadlistService;
  tourn_slug: any;

  end_result: Element[] = [];
  goalkeepers: Element[];
  defenders: Element[]; 
  midfielders: Element[]; 
  forwards: Element[]; 
  players: Element[];

  positions:Crate[] = [{name:'all players'}, {name:'goalkeepers'}, 
                      {name:'defenders'}, {name:'midfielders'},
                      {name:'forwards'}]

  pos: string = '';
  cost: number = 0;
  final_value: number = 1000;
  cost_list: number[];
  token: any;

  x: Element[];
  mysquad: Squad = {name: '', players: []}; 

  team_form: FormGroup;        

  constructor(private el: ElementRef, private fb: FormBuilder,
     private teamService: TeamService, private router: Router,) {

    this.tourn_slug = this.router.getCurrentNavigation()?.extras.state;
    this.squadListService = new SquadlistService();
    this.goalkeepers=this.squadListService.gk;
    this.defenders=this.squadListService.df;
    this.midfielders=this.squadListService.mf; 
    this.forwards=this.squadListService.fw;
    this.players=this.squadListService.orderedList();
    this.x = this.squadListService.squad_detail;
    this.cost_list = [];
    this.token = this.router.getCurrentNavigation()?.extras.state;
    
    this.team_form = fb.group({
      name:['',Validators.required,
        TeamNumValidator.teamValidator(this.squadListService),
        TeamValidator.createValidator(teamService),
       ],
    })
   }


  ngOnInit(): Element[] {
    this.squadListService.orderedList()
    this.teamService.getTeamNames(this.token)
    fromEvent(this.el.nativeElement, 'keyup') 
    .pipe(map((e: any) => e.target.value),
    filter((text: string) => text.length>-1),
    debounceTime(250),
    tap(() => this.loading.emit(true)),
    switchMap((query: string) => this.squadListService.search(query)))
    .subscribe(
      (results: Element[]) => {
        this.loading.emit(false);
        this.results.emit(results)
        console.log(results)
        this.end_result = results
      }
    );
    console.log(this.end_result)
    return this.end_result
  }

  addingPlayer(player: Element){
    this.squadListService.addPlayer(player)
    this.cost_list = this.squadListService.cost_list
    console.log(this.x)
    console.log(this.cost_list) 
    this.cost=0
    for(let i=0; i<this.cost_list.length; i++){
      this.cost=this.cost+this.cost_list[i]
    }
    this.final_value = 1000-this.cost
     
  }

  removingPlayer(player: Element){
    this.squadListService.removePlayer(player)
    this.cost_list = [];
    this.cost_list = this.squadListService.cost_list
    this.cost=0
    console.log(this.cost_list) 
    for(let i=0; i<this.cost_list.length; i++){
      this.cost=this.cost+this.cost_list[i]
    }
    this.final_value = 1000-this.cost
  }
//WATCHOUT
  onClick(position:Crate){
    this.pos = position.name
    console.log(this.pos)
  }
 
  onSubmit(value: any){
    if(this.x.length==15){
      this.mysquad.name = value.name
      console.log(this.mysquad.name)
      this.mysquad.players = this.x
      this.router.navigateByUrl('/team-selection', {state: this.mysquad });
    }
    return this.x
  } 

}
