import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { MapService } from './map.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() location: string;

  @Input() locationSubject: Subject<any>;

  isPositionError: boolean = false;

  lat: number;
  lng: number;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        console.log('lat ' + this.lat);
        this.ref.detectChanges();
      }, () => {
        console.log('isPositionError ' );
        this.isPositionError = true;
      });
  }

  mapReadyHandler() {
    console.log('map ' + this.location);
    this.getLocation(this.location);
  }
}
