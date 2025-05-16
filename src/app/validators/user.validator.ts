import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import { UserService } from "../services/user.service";
import {catchError, debounceTime, map, of, switchMap, take} from 'rxjs';

export function usernameExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(username =>
        userService.checkUsernameExists(username).pipe(
          map(exists => (exists ? { usernameTaken: true } : null)),
          catchError(() => of(null)) // gestion des erreurs (ex. backend KO)
        )
      ),
      take(1)
    );
  };
}


