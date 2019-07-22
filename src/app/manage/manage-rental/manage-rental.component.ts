import { Component, OnInit } from '@angular/core';

import {RentalService} from '../../rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.css']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[];
  rentalDeleteIndex: number;
  constructor(private rentalService: RentalService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserRental();
  }
getUserRental() {
  this.rentalService.getUserRental()
  .subscribe((rentals) => {
    this.rentals = rentals;
  }, (error) => {
    console.log(error);
  });
}
deleteRental(rentalId: string) {
  this.rentalService.deleteRental(rentalId).subscribe(
    () => {
      this.rentals.splice(this.rentalDeleteIndex, 1);
      this.rentalDeleteIndex = undefined;
    },
    (errorResponse: HttpErrorResponse) => {
      this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!');
    });
}

}
