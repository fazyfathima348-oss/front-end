import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';





@Injectable({
  providedIn: 'root',
})
export class PublicProperty {
  private publicUrl = 'http://127.0.0.1:8000/api/public/properties';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.publicUrl}/public/properties`);
  }

}
