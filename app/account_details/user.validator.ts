import { group } from '@angular/animations';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService, ConfirmService } from './registration.service';

export class EmailValidator {
    static createValidator(userService: UserService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null>=> {
            return userService.checkEmailExists(control.value).pipe(
                map((result: boolean)=>
                result ? { emailAlreadyExists: true }: null)
            )
        }
    }
}

export class EmailAddressValid {
    static isEmail (userService: UserService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return userService.checkEmail(control.value).pipe(
                map((result: boolean)=>
                result ? {isemail: false}: null)
            )
        }
    }
}

export class PasswordConfirmationValidator {

    static checkPassword (confirmService: ConfirmService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return confirmService.passwordConfirm(control.value).pipe(
                map((result: boolean)=>
                result ? {passConfirm: false}: null)
            )
        }
    }
}

export class PasswordValidator {
    static passwordValidation (confirmService: ConfirmService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return confirmService.passwordCheck(control.value).pipe(
                map((result: boolean)=>
                result ? {passwordStrength: false}: null)
            )
        }
    }
}

export class FonValidator {

    static checkFon (confirmService: ConfirmService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return confirmService.fonConfirm(control.value).pipe(
                map((result: boolean)=>
                result ? {fonConfirm: false}: null)
            )
        }
    }
}

export class TermsValidator {

    static termsConditions (confirmService: ConfirmService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return confirmService.checkTrue(control.value).pipe(
                map((result: boolean)=>
                result ? {terms_and_con: false}: null)
            )
        }
    }
}