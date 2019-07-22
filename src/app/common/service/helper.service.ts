import { Injectable } from '@angular/core';
import {Booking} from '../../booking/shared/booking';
import * as  moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

 private getRangeOfDates(startAt, endAt, dateFormat) {
   let mstartAt = moment(startAt);
   const mendDate = moment(endAt);
   const tempDates = [];
   while(mstartAt < mendDate) {
     tempDates.push(mstartAt.format(dateFormat));
     mstartAt = mstartAt.add(1, 'day');
   }
   tempDates.push(moment(mstartAt.format(dateFormat)));
   tempDates.push(mendDate.format(dateFormat));
   return tempDates;
 }
 private formatDate(date, dateFormat) {
  return moment(date).format(dateFormat);
 }
 public formatBookingDates(date) {
   return this.formatDate(date, Booking.DATE_FORMAT);
 }
 public getBookingRangeOfDates(startAt, endAt) {
   return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
 }
}
