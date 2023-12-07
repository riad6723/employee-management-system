import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class slabMinMaxValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const slabMinCharge = formGroup.get('slabMinCharge')?.value;
    const slabMaxCharge = formGroup.get('slabMaxCharge')?.value;

    // Convert values to numbers (assuming these should be numbers)
    const minCharge = parseFloat(slabMinCharge);
    const maxCharge = parseFloat(slabMaxCharge);

    // Check if both values are provided and minCharge is greater than maxCharge
    if (!isNaN(minCharge) && !isNaN(maxCharge) && minCharge > maxCharge) {
      return {
        invalidSlabMinMaxAmount: true
      };
    }

    return null;
  }
}
