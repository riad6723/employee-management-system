import {AbstractControl, ValidationErrors} from "@angular/forms";


export class minmaxValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const minimumCharge = control.get('minimumCharge')?.value;
    const maximumCharge = control.get('maximumCharge')?.value;

    if(minimumCharge==null || minimumCharge=='')return null;
    if(maximumCharge==null || maximumCharge=='')return null;

    // Check if both values are provided and minimumCharge is greater than maximumCharge
    if (minimumCharge > maximumCharge) {
      return {
        invalidAmount: true
      };
    }

    return null;
  }
}
