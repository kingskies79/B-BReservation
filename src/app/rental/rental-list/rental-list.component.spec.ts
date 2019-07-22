import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalListComponent } from './rental-list.component';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental';
import { Observable } from 'rxjs';

describe('RentalListComponent', () => {
  let component: RentalListComponent;
  // tslint:disable-next-line:prefer-const
  let service: RentalService;


  beforeEach(() => {

  });

  it('it should set rental house with the item returned', () => {
    const rentals: Rental[] = [

      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c49b', bookings: [], title: 'Nice view on ocean', city: 'san francisco', street: 'Main street', category: 'condo', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 4, shared: false, description: 'Very nice apartment in center of the city.', dailyRate: 43, createdAt: '2019-04-14T09:29:54.968Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c49d', bookings: [], title: 'Modern apartment in center', city: 'new york', street: 'Time Square12', category: 'apartment', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 1, shared: true, description: 'Very nice apartment in center of the city.', dailyRate: 11, createdAt: '2019-04-14T09:29:54.971Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c49f', bookings: [], title: 'Old house in nature', city: 'spisska nova ves', street: 'Banicka 1', category: 'house', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 5, shared: false, description: 'Very nice apartment in center of the city.', dailyRate: 23, createdAt: '2019-04-14T09:29:54.972Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c4a1', bookings: [], title: 'Amazing modern place', city: 'san francisco', street: 'Green street', category: 'house', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 2, shared: false, description: 'Hiking routes 10 min walking away', dailyRate: 140, createdAt: '2019-04-14T09:29:54.972Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c4a5', bookings: [], title: 'House with Garden', city: 'new york', street: 'Long Island, Queens', category: 'house', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 6, shared: false, description: 'Very nice house in Long Island with garden', dailyRate: 189, createdAt: '2019-04-14T09:29:54.973Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c4a3', bookings: [], title: 'Apartment In China Town', city: 'san francisco', street: 'Union Street', category: 'apartment', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 3, shared: false, description: 'Very nice apartment in China Town', dailyRate: 89, createdAt: '2019-04-14T09:29:54.973Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cb2fd9253d2ac266485c4a7', bookings: [], title: 'Cozy modern Condo', city: 'new york', street: 'Penn Station', category: 'condo', image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg', bedrooms: 3, shared: true, description: 'Building close to Penn Station', dailyRate: 68, createdAt: '2019-04-14T09:29:54.974Z'},
      // tslint:disable-next-line:max-line-length
      {_id: '5cc32d202ea9a11ab08785f4', bookings: [], title: 'Vulcano Explorer', city: 'Belpasso', street: 'Via Sant\'Anna 125', category: 'HOUSE', image: 'http://res.cloudinary.com/fableo/image/upload/v1556294570/image/z7sagglzb1cubqp1dhjt.jpg', shared: true, bedrooms: 3, description: 'Ottima locazione per chi ama godersi una vacanza ai piedi del vulcano Etna.', dailyRate: 50, createdAt: '2019-04-26T16:09:04.486Z'}

    ];


    spyOn(service, 'getRentals').and.callFake(() => {
      return Observable.bind([rentals]);
    });
    component.ngOnInit();
    expect(component.rentalList).toEqual(rentals);
  });


});
