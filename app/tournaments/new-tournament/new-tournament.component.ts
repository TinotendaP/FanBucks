import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TournamentValidator } from '../tournament.validator';
import { TournamentService } from '../tournament.service';
import { TournFormModel, Slug } from '../tournament.model';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
}) 
export class NewTournamentComponent implements OnInit {
  
  tourn_form: FormGroup;
  tournament: TournFormModel = {creator: 0,
    tourn_name: '',
    tourn_type: '',
    entry_fee: 0,
    currency: '',
    start_date: '',
    end_date: '',
    min_teams: 0,
    slug: '',
  }
  slug: Slug = {slug:''};
  
  constructor(private fb: FormBuilder, private tournamentService:TournamentService) { 
    this.tourn_form = fb.group({
      tourn_name:['Gota', Validators.required,TournamentValidator.createValidator(tournamentService)],
      tourn_type:['', Validators.required],
      max_teams:['', Validators.required],
      entry_fee:['',Validators.required],
      currency:['', Validators.required],
      start_date:['',Validators.required],
      end_date:['',Validators.required] 
    });
  }

  ngOnInit(){
    this.tournamentService.getToken()
  }

  onSubmit(value: any){
    this.tournament.tourn_name = value.tourn_name;
    this.tournament.tourn_type = value.tourn_type;
    this.tournament.min_teams = value.min_teams;
    this.tournament.entry_fee = value.entry_fee;
    this.tournament.currency = value.currency;
    this.tournament.start_date = value.start_date;
    this.tournament.end_date = value.end_date;
    this.tournament.slug =  value.tourn_name.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
    this.tournamentService.createLeague(this.tournament)
    .subscribe((result)=>{this.slug=result; console.log(result)})
    console.log(this.slug)
  }
}
