import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Rental } from '../../shared/rental';
import { RentalService } from '../../shared/rental.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/booking/shared/booking';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { HelperService } from 'src/app/common/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.css']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent) private piker: DaterangePickerComponent;
  newBooking: Booking;
  rentalId: string;
  modalRef: any;
  dateRange: any = {};
  bookedOutDates: any [] = [];
  errors: any [] = [];
  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
};
  constructor(private rentalService: RentalService, private route: ActivatedRoute, public auth: AuthService,
              private bookingService: BookingService, private helper: HelperService, private modalService: NgbModal,
              private toastr: ToastrService, ) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }
  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }
  onPaymentConfirmed(paymentToken: any) {
    this.newBooking.paymentToken = paymentToken;
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }
  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDates(date)) || date.diff(moment(), 'days') < 0;
  }
  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }
  createBooking() {
    this.newBooking.rental = this.rental;

   // debugger;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking has been succesfuly created, check your booking detail in manage section', 'Success!');
      },
      (errorResponse: any) => {
        this.errors = errorResponse;
      });
  }
  selectedDate(value: any, datePiker ?: any ) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDates(value.start);
    this.newBooking.endAt = this.helper.formatBookingDates(value.end);
    this.newBooking.days = - (value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
}
private getBookedOutDate() {
  const bookings: Booking [] = this.rental.bookings;
  if(bookings && bookings.length > 0) {
    bookings.forEach((booking: Booking) => {
      const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
      this.bookedOutDates.push(dateRange);
    });
  }
}
private resetDatePicker() {
  this.piker.datePicker.setStartDate(moment());
  this.piker.datePicker.setEndDate(moment());
  this.piker.datePicker.element.val('');
}
}
