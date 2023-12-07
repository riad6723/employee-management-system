import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class DataProviderService{

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<any[]>(this._url).subscribe(
      (data) => {
        this.dataSubject.next(data);
        console.log((this.dataSubject));
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
  private _url='/assets/employee-data.json';

  updateEmployee(newData: any[],id:number): void {
    const currentData = this.dataSubject.value;
    const index = currentData.findIndex(employee => employee.id === id);
    currentData[index] = { ...currentData[index], ...newData };
    currentData[index].id=id;
    this.dataSubject.next([...currentData]);
  }
  addEmployee(newEmployee: any): void {
    const currentData = this.dataSubject.value;
    const updatedData = [...currentData, newEmployee];
    this.dataSubject.next(updatedData);
  }
  getEmployeeById(id: number): any | undefined {
    const currentData = this.dataSubject.value;
    return currentData.find(employee => employee.id === id);
  }

}
