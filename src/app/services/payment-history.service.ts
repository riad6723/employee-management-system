
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  constructor(private http: HttpClient) { }

  fetchPaymentHistory(
    pageNumber: any,
    paymentsPerPage: any,
    fromDate: Date | null = null,
    toDate: Date | null = null,
    billerName: string | null = null,
    transactionID: string | null = null
  ): Observable<any> {


    const apiUrl = `https://sandbox.ekpay.gov.bd/agent/bill/payment-history`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTg3MDAwNTM3OCIsImV4cCI6MTcwMjA3Mzg0NCwiaWF0IjoxNzAyMDM3ODQ0fQ.JPhh7eyjfhgIWbTW2TcdNQ7XoioiogjPnsiKf89ifvo'
    });

    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', paymentsPerPage);

    if (fromDate !== null) {
      params = params.set('fromDate', formatDate(fromDate, 'EEE MMM dd yyyy', 'en-US'));
    }

    if (toDate !== null) {
      params = params.set('toDate', formatDate(toDate, 'EEE MMM dd yyyy', 'en-US'));
    }

    if (billerName !== null) {
      params = params.set('billerName', billerName);
    }

    if (transactionID !== null) {
      params = params.set('transactionId', transactionID);
    }

    return this.http.get(apiUrl, { headers, params});
  }
}

