import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl = 'http://localhost:3002/api/v1/';
  constructor(private http: HttpClient) { }

 public getRentalReview(rentalId: string): Observable<any> {

    return this.http.get(this.apiUrl + `reviews?rentalId=${rentalId}`);
  }
 public getOverallRating(rentalId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'reviews/' + rentalId + '/rating');
  }

  public createReview(review, bookingId): Observable<any> {

    return this.http.post(this.apiUrl + `reviews?bookingId=${bookingId}`, review);
  }
}
