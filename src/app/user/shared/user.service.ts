import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3002';
  constructor(private http: HttpClient) { }

  getUsers(userId: string): Observable<any> {
    return this.http.get(this.apiUrl + '/api/v1/users/' + userId);
  }
}
