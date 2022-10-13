import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TeamService } from './team_name.service';
import { SquadlistService } from './squadList.service';
import { SquadEditService } from './transfer_player.service';

export class TeamValidator {
    static createValidator(teamService: TeamService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return teamService.checkTeamExists(control.value).pipe(
                map((result: boolean)=>
                result ? { teamAlreadyExists: true }: null)
            )
        }
    }
}

export class TeamNumValidator {
    static teamValidator(squadListService: SquadlistService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return squadListService.countPlayers(control.value).pipe(
                map((result: boolean)=>
                result ? { teamNotFull: true }: null) 
            )
        }
    }
}

export class TeamCostValidator {
    static costValidator(squadListService: SquadlistService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return squadListService.playersCost(control.value).pipe(
                map((result: boolean)=>
                result ? { costTooHigh: true }: null)
            )
        }
    }
}

export class TeamEditNumValidator {
    static teamValidator(squadEditService: SquadEditService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return squadEditService.countPlayers(control.value).pipe(
                map((result: boolean)=>
                result ? { teamNotFull: true }: null)
            )
        }
    }
}

export class TeamEditCostValidator {
    static costValidator(squadEditService: SquadEditService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return squadEditService.playersCost(control.value).pipe(
                map((result: boolean)=>
                result ? { costTooHigh: true }: null)
            )
        }
    }
}