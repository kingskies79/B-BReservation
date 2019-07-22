import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import {Routes, RouterModule} from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageRentalBookingComponent } from './manage-rental-booking/manage-rental-booking.component';
import { AuthGuard } from '../auth/shared/auth.guard';
import { NgPipesModule } from 'ngx-pipes';
import { ReviewModule } from '../review/review.module';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
      { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard]}
    ]
  }
];



@NgModule({
  declarations: [ ManageComponent,
    ManageBookingComponent,
    ManageRentalComponent,
    ManageRentalBookingComponent,
    FormatDatePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule,
    ReviewModule
  ],
  exports: [

  ]
})
export class ManageModule { }
