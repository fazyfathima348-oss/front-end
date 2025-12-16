import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Staff } from '../models/staff.model';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private baseUrl = 'http://127.0.0.1:8000/api/property-staff';
  
  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      console.warn('⚠️ No authentication token found! User may not be logged in.');
      this.router.navigate(['/login']);
    }

    
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`,
      'Accept': 'application/json'
    });
  }


  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/properties`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getProperty(pid: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/properties/${pid}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  createProperty(property: FormData): Observable<Property> {
    return this.http.post<Property>(`${this.baseUrl}/properties`, property, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateProperty(pid: number, property: FormData): Observable<Property> {
    return this.http.post<Property>(
      `${this.baseUrl}/properties/${pid}?_method=PATCH`, 
      property, 
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteProperty(pid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/properties/${pid}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getOwners(): Observable<User[]> {
  return this.http.get<any>('http://127.0.0.1:8000/api/property-staff/owners', {
    headers: this.getAuthHeaders()
  }).pipe(
    tap(response => console.log('📡 API Owners Response:', response)),
    map(response => {
   
      if (Array.isArray(response)) {
        return response;
      } else if (response && response.owners) {
        return response.owners;
      } else if (response && response.data) {
        return response.data;
      }
      console.warn('⚠️ Unexpected owners response format:', response);
      return [];
    })
  );
}

getVerificationStaff(): Observable<Staff[]> {
  return this.http.get<any>('http://127.0.0.1:8000/api/property-staff/verification-staff', {
    headers: this.getAuthHeaders()
  }).pipe(
    tap(response => console.log('📡 API Staff Response:', response)),
    map(response => {
      
      if (Array.isArray(response)) {
        return response;
      } else if (response && response.verificationStaff) {
        return response.verificationStaff;
      } else if (response && response.staff) {
        return response.staff;
      } else if (response && response.data) {
        return response.data;
      }
      console.warn('⚠️ Unexpected staff response format:', response);
      return [];
    })
  );
}
  
  private handleError(error: any) {
    console.error('API Error:', error);
    
    let errorMessage = 'An error occurred';
    if (error.status === 401) {

       errorMessage = 'Unauthorized: Please login again.';
       window.location.href = '/login';

    }

    else if (error.status === 403) 
    {
      errorMessage = 'Forbidden: You do not have permission.';
    } 
    
    else if (error.status === 404)
    {
      errorMessage = 'Resource not found.';
    }

     else if (error.status === 422) 
    {
      errorMessage = 'Validation error. Please check your input.';
    }


     else if (error.status >= 500)
    {
      errorMessage = 'Server error. Please try again later.';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}