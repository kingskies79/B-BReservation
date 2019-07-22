import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StarRatingModule} from 'angular-star-rating';


@NgModule({
  declarations: [
    ReviewComponent
  ],
  exports: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    StarRatingModule.forRoot()
  ],
})
export class ReviewModule { }
