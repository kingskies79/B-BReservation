import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import 'rxjs';

const jwt = new JwtHelperService();

class DecodedToken {
  exp = 0;
  username = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken;
  apiUrl = 'http://localhost:3002/';
  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();

   }

   private saveToken(token: string): string {
     this.decodedToken = jwt.decodeToken(token);
     localStorage.setItem('bwm_auth', token);
     localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
     return token;
   }
   private getExpiration() {
     return moment.unix(this.decodedToken.exp);
   }
   public register(userData: any): Observable<any> {
     return this.http.post(this.apiUrl + 'api/v1/users/register', userData);
   }
   public login(userData: string): Observable<any> {
     return this.http.post(this.apiUrl + 'api/v1/users/auth', userData).pipe(map(
      (token: string) => this.saveToken(token)));
   }
   public logout() {
     localStorage.removeItem('bwm_auth');
     localStorage.removeItem('bwm_meta');
     this.decodedToken = new DecodedToken();
   }
   public isAuthenticated(): boolean {
     return moment().isBefore(this.getExpiration());
   }
   public getAuthToken(): string {
     return localStorage.getItem('bwm_auth');
     }
  public getUsername(): string {
    return this.decodedToken.username;
  }
  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
