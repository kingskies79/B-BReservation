import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  rental: Rental ;
  errors: any [] = [];
  rentalCategories = Rental.CATEGORIES;
  constructor(private rentalService: RentalService, private router: Router) {
  }

  ngOnInit() {
    this.rental = new Rental();
    this.rental.shared = false;
  }
  handleImageChange() {
    this.rental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }



  handleImageUpload(imageUrl: string) {
    this.rental.image = imageUrl;
    console.log('urlImage ' + imageUrl);
  }

  handleImageError() {
    this.rental.image = '';
  }
  createRental() {
    this.rentalService.createRental(this.rental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });

    }
}
