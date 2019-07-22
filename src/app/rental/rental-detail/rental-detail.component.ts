import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { ReviewService } from '../../review/shared/review.service';
@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  rental: any;
  rating: number;
  reviews: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private rentalService: RentalService,
              private reviewService: ReviewService) { }

  ngOnInit() {
    const rentalId = this.route.snapshot.paramMap.get('rentalId');
    this.getRental(rentalId);

  }
  getRental(id: string) {
    this.rentalService.getRentalById(id)
      .subscribe(rentalFound => {
      this.rental = rentalFound;
      this.getReviews(rentalFound._id);
      this.getOverallRating(rentalFound._id);
      }, (error) => {
        console.log(error);
      });
  }
  getReviews(rentalId: string) {
    this.reviewService.getRentalReview(rentalId)
      .subscribe(reviewsFound => { console.log('reviewsFound', reviewsFound); this.reviews = reviewsFound; }, (error) => {
        console.log(error);
      });
  }
  getOverallRating(rentalId: string) {
    this.reviewService.getOverallRating(rentalId)
    .subscribe(rating => {this.rating = rating; }, (error) => { console.log(error); });
  }

}
