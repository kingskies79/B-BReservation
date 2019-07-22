import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/booking/shared/booking';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { PaymentService } from 'src/app/payment/shared/payment.service';
import * as moment from 'moment';
import { Review } from 'src/app/review/shared/review';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];
  payments: any[];

  constructor(private bookingService: BookingService,
              private paymentService: PaymentService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      () => {

      })

    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payments: any) => {
        this.payments = payments;
        console.log(this.payments);
      },
      () => {

      })
  }

  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (json) => {
        payment.status = 'paid';
      },
      err => {});
  }

  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
        payment.status = 'declined';
      },
      err => {})
  }

  isExpired(endAtText: string) {
    const timeNow = moment();
    const endAt = moment(endAtText);

    return endAt.isBefore(timeNow);
  }

  reviewPublished(bookingIndex: number, review: Review) {
    debugger;
    this.bookings[bookingIndex]['review'] = review;
  }
}
