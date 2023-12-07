import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {DataProviderService} from "../../services/data-provider.service";


interface Employee {
  id: number;
  username: string;
  email: string;
  contactNumber: string;
  age: number;
  dob: string;
  salary: number;
  address: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dataProviderService: DataProviderService) {
  }

  employees: Employee[] = [];

  ngOnInit() {
   this.dataProviderService.data$.subscribe((data) => {
      this.employees = data;
    });
  }

  handleEmployeeDelete(employee: Employee): void {
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1);
  }

  handleAddEmployee(): void {
    this.router.navigate(['/create'])
  }

  handleEditEmployee(employeeId:number):void{
    this.router.navigate(['/create',employeeId]);
  }
}
