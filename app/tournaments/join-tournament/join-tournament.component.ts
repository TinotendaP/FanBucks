import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService, SlugValidator } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-tournament',
  templateUrl: './join-tournament.component.html',
  styleUrls: ['./join-tournament.component.css']
})
export class JoinTournamentComponent implements OnInit {

  join_form: FormGroup;
  All: any;

  constructor(private fb: FormBuilder, private router: Router, private tournamentService: TournamentService) {
    this.join_form = fb.group({
      league_token:['',Validators.required, SlugValidator.createValidator(tournamentService)]
    })
   }

  ngOnInit(): void {
    this.tournamentService.getTourns()
    this.tournamentService.theTourn()
  }

  onSubmit(value:any): void {
    console.log(value)
    this.router.navigateByUrl('/confirm-join', {state: value.league_token});
  }
}
