import { Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, map, filter, debounceTime, tap, switchMap } from 'rxjs';
import { SquadEditService } from '../transfer_player.service';
import { Element, Crate, Squad } from '../squadList.model';
import { TeamEditNumValidator, TeamEditCostValidator } from '../team_name.validators';
import { TeamService } from '../team_name.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-player', 
  templateUrl: './transfer-player.component.html',
  styleUrls: ['./transfer-player.component.css', 
  '../bootstrap-4.3.1-dist/css/bootstrap.min.css',
  '../fontawesome-free-6.1.2-web/css/all.css']
})
export class TransferPlayerComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<Element[]> = new EventEmitter<Element[]>();

;
  tourn_slug: any;
  tourn_name: any;


  end_result: Element[] = [];
  goalkeepers: Element[]=[];
  defenders: Element[]=[];
  midfielders: Element[]=[]; 
  forwards: Element[]=[]; 
  players: Element[]=[];
  transfer: any = {status: true, name: ''};
  current_squad: any;

  team_form: FormGroup;

  positions:Crate[] = [{name:'all players'}, {name:'goalkeepers'}, 
                      {name:'defenders'}, {name:'midfielders'},
                      {name:'forwards'}]
  pos: string = '';
  cost_list: number[] = [];
  final_value: number = 1000;
  cost: number = 0;
  initial_cost: number = 0;

  x: Element[];
  mysquad: Squad = {name: '', players: []};        

  constructor(private el: ElementRef, private fb: FormBuilder,
     private teamService: TeamService, private router: Router,
     private squadEditService: SquadEditService) {


    this.tourn_name = this.router.getCurrentNavigation()?.extras.state;
    this.x = this.squadEditService.squad_detail;
    this.current_squad = this.squadEditService.current_squad
    

    this.team_form = fb.group({
      name:['',TeamEditNumValidator.teamValidator(this.squadEditService),
        TeamEditCostValidator.costValidator(this.squadEditService),
       ],
    })
    }

  addingPlayer(player: Element){
    console.log(this.x)
    if(this.transfer.status=true){
      this.squadEditService.addPlayer(player)
      this.cost_list = this.squadEditService.cost_list
      console.log(this.x)
      console.log(this.cost_list) 
      this.cost=0
      for(let i=0; i<this.cost_list.length; i++){
        this.cost=this.cost+this.cost_list[i]
      }
      if (this.initial_cost>1000){
        this.final_value = this.initial_cost-this.cost
      }
      else {
        this.final_value = 1000-this.cost
      }
    }
       
  }

  removingPlayer(player: Element){
    if(this.transfer.status=true){
      this.squadEditService.removePlayer(player)
      this.cost_list = [];
      this.cost_list = this.squadEditService.cost_list
      console.log(this.cost_list) 
      this.cost=0
      console.log(this.cost_list) 
      for(let i=0; i<this.cost_list.length; i++){
        this.cost=this.cost+this.cost_list[i]
      }
      if (this.initial_cost>1000){
        this.final_value = this.initial_cost-this.cost
      }
      else {
        this.final_value = 1000-this.cost
      }
      
    }
  }
//WATCHOUT
  onClick(position:Crate){
    this.pos = position.name
    console.log(this.pos)
  }
 
  onSubmit(){
    this.mysquad.players = this.x
    this.router.navigateByUrl('/team-edit', { state: this.current_squad }); 
    for (let i=0; i<this.x.length; i++){
      console.log(this.x[i].web_name)
    } 
  }

  ngOnInit(): Element[] {
    this.squadEditService.getToken()
    fromEvent(this.el.nativeElement, 'keyup')
    .pipe(map((e: any) => e.target.value),
    filter((text: string) => text.length>2),
    debounceTime(250),
    tap(() => this.loading.emit(true)),
    switchMap((query: string) => this.squadEditService.search(query)))
    .subscribe(
      (results: Element[]) => {
        this.loading.emit(false);
        this.results.emit(results)
        console.log(results)
        this.end_result = results
      }
    );
  //  this.squadEditService.transferActive().
  //  subscribe(data=>{this.transfer = data; console.log(data)})
  //  console.log(this.transfer)
  this.cost_list = this.squadEditService.cost_list
  this.cost=0
  for(let i=0; i<this.cost_list.length; i++){
    this.cost=this.cost+this.cost_list[i]
  }
  console.log(this.tourn_slug)
  this.tourn_slug = this.tourn_name.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
  console.log(this.tourn_slug)
  this.squadEditService.grabSquad(this.tourn_slug)
  .subscribe(data=>{this.current_squad=data; console.log(data)})
  console.log(this.current_squad)
  setTimeout(() => { this.squadEditService.clickDOM(this.current_squad)
    this.goalkeepers=this.squadEditService.gk;
    this.defenders=this.squadEditService.df;
    this.midfielders=this.squadEditService.mf; 
    this.forwards=this.squadEditService.fw;
    this.players=this.squadEditService.all_players;
    console.log(this.current_squad)
    this.cost_list = this.squadEditService.cost_list
    console.log(this.cost_list) 
    this.cost=0
    console.log(this.cost_list) 
    for(let i=0; i<this.cost_list.length; i++){
      this.initial_cost=this.initial_cost+this.cost_list[i]
    }
    this.final_value=1000
    if (this.initial_cost>1000){
      this.final_value = this.initial_cost
    }
    else {
      this.final_value = 1000
    }}, 2000)
  return this.end_result
  }
}
