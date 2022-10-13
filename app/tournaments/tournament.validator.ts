import { group } from '@angular/animations';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TournamentService } from './tournament.service';

export class TournamentValidator {
    static createValidator(tournamentService: TournamentService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return tournamentService.checkTournamentsExists(control.value).pipe(
                map((result: boolean)=>
                result ? { tournamentAlreadyExists: true }: null)
            )
        }
    }
}