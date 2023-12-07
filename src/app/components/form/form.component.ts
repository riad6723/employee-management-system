import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataProviderService} from "../../services/data-provider.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  employeeAddForm!: FormGroup;
  id: number = 0;

  constructor(private fb: FormBuilder,
              private dataProviderService: DataProviderService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'] || 0;
      this.initializeForm();
    });
  }

  initializeForm() {
    const employeeData = this.dataProviderService.getEmployeeById(this.id);
    if (employeeData) {
      this.employeeAddForm = this.fb.group({
        id: [employeeData.id, [Validators.required, Validators.min(1)]],
        username: [employeeData.username, [Validators.required, Validators.min(1)]],
        email: [employeeData.email, [Validators.required, Validators.email]],
        contactNumber: [employeeData.contactNumber, [Validators.required]],
        age: [employeeData.age, [Validators.required, Validators.min(0)]],
        dob: [employeeData.dob, [Validators.required]],
        salary: [employeeData.salary, [Validators.required, Validators.min(0)]],
        address: [employeeData.address, [Validators.required]],
      });
    } else {
      this.employeeAddForm = this.fb.group({
        id: ['', [Validators.required, Validators.min(1)]],
        username: ['', [Validators.required, Validators.min(1)]],
        email: ['', [Validators.required, Validators.email]],
        contactNumber: ['', [Validators.required]],
        age: ['', [Validators.required, Validators.min(0)]],
        dob: ['', [Validators.required]],
        salary: ['', [Validators.required, Validators.min(0)]],
        address: ['', [Validators.required]],
      });
    }

    if (this.id) {
      this.employeeAddForm.get('id')?.markAsDirty();
      this.employeeAddForm.get('id')?.updateValueAndValidity();
    }
  }


  handleSubmit(): void {
    //console.log(this.employeeAddForm.value);
    if (this.employeeAddForm.valid) {
      if (!this.id) {
        this.dataProviderService.addEmployee(this.employeeAddForm.value);
        this.router.navigate(['/']);
      } else {
        this.dataProviderService.updateEmployee(this.employeeAddForm.value, this.id);
        this.router.navigate(['/']);
      }
    }

  }
}
