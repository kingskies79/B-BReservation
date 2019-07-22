import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from './rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'http://localhost:3002';
  constructor(private http: HttpClient) { }

  public getRentals(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/v1/rentals');
  }
  public getRentalsByCity(city: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/rentals?city=${city}`);
  }
  public createRental(rental: Rental): Observable<any> {
    return this.http.post(this.apiUrl + '/api/v1/rentals', rental);
  }
  public getUserRental(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/v1/rentals/manage');
  }
  public deleteRental(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/api/v1/rentals/' + id);
  }
  public updateRental(id: string, rentaldata: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/v1/rentals/' + id, rentaldata);
  }
  public verifyRentalUser(rentalId: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/rentals/${rentalId}/verify-user`);
  }
  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/v1/rentals/' + rentalId);
  }



}

