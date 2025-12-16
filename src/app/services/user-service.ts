import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://127.0.0.1:8000/api/property-staff/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  getUsers(role?: string): Observable<User[]> {
    const url = role ? `${this.userUrl}?role=${role}` : this.userUrl;
    return this.http.get<User[]>(url, this.getAuthHeaders());
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`, this.getAuthHeaders());
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.userUrl, user, this.getAuthHeaders());
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.patch(`${this.userUrl}/${id}`, user, this.getAuthHeaders());
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`, this.getAuthHeaders());
  }

  getOwners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}?role=owner`, this.getAuthHeaders());
  }

  
}