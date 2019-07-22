import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../shared/rental';

@Component({
  selector: 'app-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.css']
})
export class RentalListItemComponent implements OnInit {

  constructor() { }
  @Input() rental: Rental;
  ngOnInit() {
  }

}
