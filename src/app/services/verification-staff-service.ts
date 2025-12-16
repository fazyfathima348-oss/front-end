import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';


@Injectable({
  providedIn: 'root',
})
export class VerificationStaffService {
  
    private verificationStaffUrl = 'http://127.0.0.1:8000/api/property-staff/verification-staff';

    constructor(private http: HttpClient) {}

   getVerificationStaff(): Observable<Staff[]>
   {
      return this.http.get<Staff[]>(this.verificationStaffUrl);
   }
}
