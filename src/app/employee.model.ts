import { FormControl, FormGroup, Validators } from '@angular/forms';

export class EmployeeForm {

            EmployeeAddForm= new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            contactNumber: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required, Validators.min(0)]),
            dob: new FormControl('', [Validators.required]),
            salary: new FormControl('', [Validators.required, Validators.min(0)]),
            address: new FormControl('', [Validators.required]),
        })
}
