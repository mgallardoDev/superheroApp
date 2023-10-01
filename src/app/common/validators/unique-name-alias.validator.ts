import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroService } from 'src/app/modules/hero/services/hero.service';

export class UniqueNameAliasValidator {
  static createValidator(heroService: HeroService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.get('name')!.value;
      const alias = control.get('alias')!.value;

      console.log(typeof(name))

      return heroService.isUniqueNameAliasCombination(name, alias).pipe(
        map((result: boolean) => {
          console.log(result);
          return result ? null : {nameAliasCombinationAlreadyExists: true };
        })
      );
    };
  }
}
