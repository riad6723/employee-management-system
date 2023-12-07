import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {minmaxValidator} from "../../validators/minmax.validator";
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {fromtoValidator} from "../../validators/fromto.validator";
import {slabMinMaxValidator} from "../../validators/slabMinMax.validator";

@Component({
  selector: 'app-charge-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './charge-form.component.html',
  styleUrl: './charge-form.component.css'
})
export class ChargeFormComponent {
  totalForm: FormGroup;
  selectedOption!: string;
  rowCnt:number=0;

  constructor(private fb: FormBuilder) {

    this.totalForm = this.fb.group({
      fixedCharge: ['',[Validators.required]],
      minimumCharge: ['',],
      maximumCharge: ['',],
        option: [''],
        rows: this.fb.array([]),
    },
      {validators: [minmaxValidator.validate]} as AbstractControlOptions
    );
  }



  get rowForms() {
    return this.totalForm.get('rows') as FormArray; //getter method for accessing the rows control
  }

  addRow() {
    const row = this.fb.group({
      fromAmount: ['', Validators.required],
      toAmount: ['', Validators.required],
      slabCharge: ['', Validators.required],
      slabMinCharge: [''],
      slabMaxCharge: [''],
      lastSlab: [''],
      fixedSlab: ['']
    },
      {validators: [fromtoValidator.validate,slabMinMaxValidator.validate]} as AbstractControlOptions
    );

    this.rowForms.push(row);
      if (this.rowCnt > 0) {
          const toAmountValue = this.rowForms.at(this.rowCnt - 1)?.get('toAmount')?.value;
          this.rowForms.at(this.rowCnt)?.get('fromAmount')?.setValue(toAmountValue);
      } else {
          // First row
          this.rowForms.at(0)?.get('fromAmount')?.setValue(0);
      }
    this.rowCnt++;
  }

  checkLastSlab():boolean{
    if(this.rowForms.at(this.rowCnt-1)?.get('lastSlab')?.value==false ||
        this.rowForms.at(this.rowCnt-1)?.get('lastSlab')?.value=='' ||
      this.rowForms.at(this.rowCnt-1)?.get('lastSlab')?.value==null)return false;
    return true;
  }

  handleSubmit(): void {
    console.log(this.totalForm);
    if(this.totalForm.valid){
      console.log(JSON.stringify(this.totalForm.value));
    }
    else{
      if(this.selectedOption=='fixed'){
        this.totalForm.get('fixedCharge')?.markAsTouched();
      }
      else if(this.selectedOption=='percent'){
        this.totalForm.get('percentCharge')?.markAsTouched();
        this.totalForm.get('minimumCharge')?.markAsTouched();
        this.totalForm.get('maximumCharge')?.markAsTouched();
      }
      else if(this.selectedOption=='slab'){
        this.rowForms.markAllAsTouched();
      }
    }
  }

  submitValidator(){
    if(this.selectedOption=='fixed'){
      return !this.totalForm.get('charge')?.value;
    }
    if(this.selectedOption=='percent'){
      //return !this.totalForm.get('charge')?.value || this.checkMiniMax();
      return false;
    }
    if(this.selectedOption=='slab'){
      //return !this.checkLastSlab() || this.checkSlabCharge();
      return false;
    }
    return true;
  }

  toggleForm(option: string): void {
    this.selectedOption = option;
    this.totalForm.reset();


    if (option === 'fixed') {
      // Set validators to fixed
      //this.totalForm.get('fixedCharge')?.setValidators([Validators.required]);
      this.totalForm.get('option')?.setValue('fixed');
    } else if (option === 'percent') {
      // Set validators to percent
      //this.totalForm.get('percentCharge')?.setValidators([Validators.required]);
      //this.totalForm.setValidators([minmaxValidator.validate]);
      this.totalForm.get('option')?.setValue('percent');
    }
    else if(option=='slab'){
      this.totalForm.get('option')?.setValue('slab');
    }

    // Update value and validity for each control
    // this.totalForm.get('fixedCharge')?.updateValueAndValidity();
    // this.totalForm.get('percentCharge')?.updateValueAndValidity();
    // this.totalForm.get('minimumCharge')?.updateValueAndValidity();
    // this.totalForm.get('maximumCharge')?.updateValueAndValidity();
    // this.totalForm.updateValueAndValidity();
  }


}
