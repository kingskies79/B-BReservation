import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AppComponent } from '../app.component';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { RentalComponent } from '../rental/rental.component';
import { Routes, RouterModule } from '@angular/router';
import { RentalCreateComponent } from '../rental/rental-create/rental-create.component';
import { RentalDetailComponent } from '../rental/rental-detail/rental-detail.component';
import { RentalListComponent } from '../rental/rental-list/rental-list.component';
import { RentalSearchComponent } from '../rental/rental-search/rental-search.component';
import { RentalUpdateComponent } from '../rental/rental-update/rental-update.component';
import { StarRatingModule } from 'angular-star-rating';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from '../rental/shared/rental.guard';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FormsModule } from '@angular/forms';
import { PaymentModule } from '../payment/payment.module';
import { MapModule } from '../common/map/map.module';
import { ImageUploadModule } from '../common/image-upload/image-upload.module';
import { EditableModule } from '../common/editable/editable.module';
import { RentalService } from './shared/rental.service';


const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
      { path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard] },
      { path: ':rentalId', component: RentalDetailComponent },
      { path: ':city/homes', component: RentalSearchComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalCreateComponent,
    RentalCreateComponent,
    RentalDetailComponent,
    RentalListComponent,
    RentalSearchComponent,
    RentalUpdateComponent,
    RentalListItemComponent,
    RentalDetailBookingComponent,

  ],
  imports: [
    CommonModule,
  	RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    EditableModule,
    ImageUploadModule,
    PaymentModule,
    StarRatingModule.forChild()
  ],
  providers: [UcWordsPipe, RentalService, RentalGuard],
  bootstrap: [AppComponent]
})
export class RentalModule { }
