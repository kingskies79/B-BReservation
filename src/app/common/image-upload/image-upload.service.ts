import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  apiUrl = 'http://localhost:3002';
  constructor(private http: HttpClient){}


  public uploadImage(image: File): Observable<string | any> {
    const formData = new FormData();
    console.log('image ' + image);
    formData.append('image', image);
    console.log('image ' + image);
    return this.http.post(this.apiUrl + '/api/v1/imageUpload', formData).pipe(map(((json: any) =>  json.imageUrl)));
  }
}
