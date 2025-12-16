import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private ownerUrl = 'http://127.0.0.1:8000/api/property-staff/owners';
 
  constructor(private http: HttpClient) {}

  getOwners(): Observable<User[]>
  {
    return this.http.get<User[]>(this.ownerUrl);
  }
}
