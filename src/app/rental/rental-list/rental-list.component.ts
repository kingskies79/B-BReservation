import { Component, OnInit } from '@angular/core';
import {RentalService} from '../shared/rental.service';


@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  constructor(private rentalService: RentalService ) { }
  rentalList: any[] = [];
  ngOnInit() {
    this.getRental('');
  }
  getRental(city: string) {
    this.rentalService.getRentals()
    .subscribe((rentalfound) => {
      this.rentalList = rentalfound;
    }, (error) => {
      console.log(error);
    });
  }

}
