import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'http://localhost:3002/api/v1/payments/';
  constructor(private http: HttpClient) { }

  getPendingPayments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  public acceptPayment(payment): Observable<any> {
    return this.http.post(this.apiUrl + 'accept', payment);
  }

  public declinePayment(payment): Observable<any> {
    return this.http.post(this.apiUrl + 'decline', payment);
  }


}

