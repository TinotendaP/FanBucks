import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';
import { JoinTournamentModel } from '../tournament.model';

@Component({
  selector: 'app-confirm-join',
  templateUrl: './confirm-join.component.html',
  styleUrls: ['./confirm-join.component.css']
})
export class ConfirmJoinComponent implements OnInit {

  closeResult: string = '';
  currentTourn : JoinTournamentModel = {creator:-1,
    tourn_name: '',
    tourn_type: '',
    entry_fee: 0,
    currency: '',
    start_date: '',
    end_date: '',
    min_teams: 0,
    slug: '',
    is_active: true,
    number_of_teams: 0,
    privacy: true,
    tourn_closed: false,
  }
  data: any;
  winnings: number = 0;

  constructor(private modalService: NgbModal, private router: Router,
    private tournamentService: TournamentService) { 
      this.data = this.router.getCurrentNavigation()?.extras.state;
    }

  ngOnInit(): void {
    this.currentTourn = this.tournamentService.findFee(this.data)
    this.winnings = this.currentTourn.number_of_teams*(this.currentTourn.entry_fee-(0.1*this.currentTourn.entry_fee))
  }

  onSubmit(){
    this.router.navigateByUrl('/squad-selection', {state: this.data})
  }

}
