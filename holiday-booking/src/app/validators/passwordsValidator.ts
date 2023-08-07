import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordOne: string, passwordTwo: string): ValidatorFn {
    return (control) => {
        return (passwordOne === passwordTwo) ? null : { matchPasswordsValidator: true}
        
    }
}