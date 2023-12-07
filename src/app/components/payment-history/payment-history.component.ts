import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentHistoryService} from "../../services/payment-history.service";
import {AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent implements OnInit{
  constructor(private paymentHistoryService: PaymentHistoryService,
              private fb: FormBuilder,
             ) {}

  monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
  ];

  paymentList: any[]=[];
  pageIndexesArray: number[]=[1,2,3];
  searchingCandidates: {}={};
  paymentHistoryPaginationForm!: FormGroup;
  paymentHistorySearchForm!: FormGroup;
  currDate: Date=new Date();
  totalElements: any=0;
  totalPages: any=0;
  lastPage: boolean=false;
  firstPage: boolean=true;
  paymentsPerPage:any=10;
  offset: any=0;
  numberOfElements: any=0;
  pageNumber: any=0;
  isEmpty: boolean=false;
  fromDate: Date | null = null;
  toDate: Date | null = null;
  billerName: string | null = null;
  transactionID: string | null = null;
  ngOnInit(){
    this.fetchPaymentHistory();
    this.initializePaymentHistoryPaginationForm();
    this.initializePaymentHistorySearchForm();
  }

  initializePaymentHistoryPaginationForm(): void{
    this.paymentHistoryPaginationForm= this.fb.group({
      paymentsPerPage: [`${this.paymentsPerPage}`],
    })
  }

  initializePaymentHistorySearchForm(): void{
    this.paymentHistorySearchForm= this.fb.group({
      fromDate: [''],
      toDate: [''],
      billerName: [''],
      transactionID: ['']
    },
      {validators: []} as AbstractControlOptions)
  }

  handlePaymentsPerPage(): void {
    this.pageNumber=0;
    this.paymentsPerPage = this.paymentHistoryPaginationForm.get('paymentsPerPage')?.value;
    this.fetchPaymentHistory();
  }

  handleLastPage(): void{
    this.pageNumber=this.totalPages-1;
    this.fetchPaymentHistory();
  }

  handleFirstPage(): void{
    this.pageNumber=0;
    this.fetchPaymentHistory();
  }

  handleGoingLeft(): void{
    if(this.firstPage==false){
      this.pageNumber--;
      this.fetchPaymentHistory();
    }
  }

  handleGoingRight(): void{
      if(this.lastPage==false){
          this.pageNumber++;
          this.fetchPaymentHistory();
      }
  }

  handlePageIndexing(index: number): void{
    this.pageNumber=index-1;
    this.fetchPaymentHistory();
  }

getFormattedDate(str:string): string{
    const date = new Date(str);
    const month=this.monthNames[date.getMonth()].slice(0,3);
    const year = date.getFullYear();
    const day=date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

  fetchPaymentHistory(): void {
    this.paymentHistoryService
      .fetchPaymentHistory(this.pageNumber, this.paymentsPerPage,this.fromDate,this.toDate,this.billerName,this.transactionID)
      .subscribe(
        (data) => {
          this.paymentList = [...data.content];
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.lastPage = data.last;
          this.firstPage = data.first;
          this.offset=data.pageable?.offset;
          this.numberOfElements=data.numberOfElements;
          this.isEmpty=data.empty;

          this.pageIndexesArray=[];

          if(this.totalPages==1 && !this.isEmpty){
            this.pageIndexesArray.push(1);
          }
          else if(this.totalPages==2  && !this.isEmpty){
            this.pageIndexesArray.push(1);
            this.pageIndexesArray.push(2);
          }
          else if(this.firstPage  && !this.isEmpty){
              this.pageIndexesArray.push(1);
              this.pageIndexesArray.push(2);
              this.pageIndexesArray.push(3);
          }
          else if(this.lastPage  && !this.isEmpty){
              this.pageIndexesArray.push(this.totalPages-2);
              this.pageIndexesArray.push(this.totalPages-1);
              this.pageIndexesArray.push(this.totalPages);
          }
          else if(!this.isEmpty){
              this.pageIndexesArray.push(this.pageNumber);
              this.pageIndexesArray.push(this.pageNumber+1);
              this.pageIndexesArray.push(this.pageNumber+2);
          }
        },
        (error) => console.log(error)
      );
  }

  handleFromDate(): void{
    this.addToObjectForSearching('fromDate',this.paymentHistorySearchForm.get('fromDate')?.value);
  }

  handleToDate(): void{
    this.addToObjectForSearching('toDate',this.paymentHistorySearchForm.get('toDate')?.value);
  }

  addToObjectForSearching(key:string,value:any): void{
     //@ts-ignore
     this.searchingCandidates[key]=value;
  }

  handleApply():void{
    // @ts-ignore
    if(this.searchingCandidates['fromDate']){
      // @ts-ignore
      this.fromDate=this.searchingCandidates['fromDate'];
    }
    else this.fromDate=null;
    // @ts-ignore
    if(this.searchingCandidates['toDate']){
      // @ts-ignore
      this.toDate=this.searchingCandidates['toDate'];
    }
    else this.toDate=null;

    // @ts-ignore
    this.billerName=this.searchingCandidates['billerName'];
    // @ts-ignore
    this.transactionID=this.searchingCandidates['transactionID'];
    this.fetchPaymentHistory();
  }

  handleReset(): void{
    this.paymentHistorySearchForm.reset();
    this.paymentsPerPage=10;
    this.pageNumber=0;
    this.fromDate=null;
    this.toDate=null;
    this.billerName=null;
    this.transactionID=null;
    this.searchingCandidates = {};
  }

  checkApply(): boolean{
    //console.log(this.searchingCandidates==null);
    return this.searchingCandidates === null || Object.keys(this.searchingCandidates).length === 0;
  }

  handleMaxDate(): string{
    const toDateValue = this.paymentHistorySearchForm.get('toDate')?.value;
    //console.log(typeof this.currDate);
    const toDateValueObject = toDateValue ? new Date(toDateValue) : null;
    // Check if toDate is a valid Date object
    if (toDateValueObject instanceof Date && !isNaN(toDateValueObject.getTime()) && toDateValueObject < this.currDate) {
      return toDateValueObject.toISOString().split('T')[0];
    }
    return this.currDate.toISOString().split('T')[0];
  }

}

