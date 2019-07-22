import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { RentalService } from './rental.service';

import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RentalGuard implements CanActivate {

  constructor(private rentalService: RentalService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      const rentalId = route.params.rentalId;
      console.log('rentalId ' + rentalId);
      return this.rentalService.verifyRentalUser(rentalId).pipe(map(() => {
        return true;
      }), catchError(() => {
        this.router.navigate(['/rentals']);
        return observableOf(false);
      }), );
  }

}
