import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import {ReviewService} from '../review/shared/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Review } from './shared/review';

import { ReviewModule } from './review.module';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent  {
  @Input() bookingId: string;

   @Output() reviewSubmitted: EventEmitter<ReviewModule> = new EventEmitter();

   modalRef: any;

   review: Review = {text: '', rating: 3};
   errors: any[];

   constructor(private modalService: NgbModal,
               private reviewService: ReviewService){}

   handleRatingChange(event) {
     this.review.rating = event.rating;
   }

   openReviewModal(content) {
     this.modalRef = this.modalService.open(content);
   }

   confirmReview() {

     this.reviewService.createReview(this.review, this.bookingId)
       .subscribe(
         (review: Review) => {
           this.reviewSubmitted.emit(review);
           this.modalRef.close();
         },
         (errorResponse: HttpErrorResponse) => {
           this.errors = errorResponse.error.errors;
         });
   }
}
