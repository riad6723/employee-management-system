import {AbstractControl, ValidationErrors} from "@angular/forms";


export class fromtoValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const fromAmount = control.get('fromAmount')?.value;
    const toAmount = control.get('toAmount')?.value;

    if(fromAmount==null || fromAmount=='')return null;
    if(toAmount==null || toAmount=='' || toAmount==undefined || fromAmount>toAmount)return {
      invalidSlabAmount: true
    };

    return null;
  }
}
