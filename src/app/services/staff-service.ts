import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {

  private StaffUrl = 'http://127.0.0.1:8000/api/admin/staff';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all staff...
  getStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.StaffUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Get single staff....
  getSingleStaff(sid: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.StaffUrl}/${sid}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add staff....
  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.StaffUrl, staff, {
      headers: this.getAuthHeaders()
    });
  }

  // Update staff....
  updateStaff(staff: Staff): Observable<Staff> {
    if (!staff.sid) throw new Error('Staff ID is required for update!');
    return this.http.put<Staff>(`${this.StaffUrl}/${staff.sid}`, staff, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete staff....
  deleteStaff(sid: number): Observable<void> {
    return this.http.delete<void>(`${this.StaffUrl}/${sid}`, {
      headers: this.getAuthHeaders()
    });
  }

}
