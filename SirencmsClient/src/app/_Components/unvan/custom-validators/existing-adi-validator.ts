import { AbstractControl } from '@angular/forms';
import { UnvanService } from '../shared/unvan.service';

export class ValidateAdiExist {
    static createValidator(unvanService: UnvanService) {
      return (control: AbstractControl) => {
        return unvanService.getUnvanByAdi(0,control.value).then(
            result => {
                debugger;
                return (!result) ? { "adiExists": true } : null;
            }
        );
      };
    }
  }