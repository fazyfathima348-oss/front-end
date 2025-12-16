import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})


export class Auth {


  private apiUrl = 'http://127.0.0.1:8000/api/staff/login';


  private roleSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('role'));
  role$ = this.roleSubject.asObservable();


  private loggedInSubject = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));
  loggedIn$ = this.loggedInSubject.asObservable();

  private nameSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('name'));
  name$ = this.nameSubject.asObservable();

  


  constructor(private http: HttpClient, private router: Router) {}



  login(email: string, password: string) {
   return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((res) => {

        const role = res.staff.role ? res.staff.role.toLowerCase() : '';
        const name = res.staff.name ?? res.staff.email;
        const staffId = res.staff.sid;


        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('email', res.staff.email);
        sessionStorage.setItem('role', res.staff.role ?? '');
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('staff_id', staffId);

        this.roleSubject.next(role);
        this.nameSubject.next(name);
        this.loggedInSubject.next(true);

        

      })
    );
  }





  logout() {
    sessionStorage.clear();
    this.loggedInSubject.next(false);
    this.nameSubject.next(null);
  }


   getRole(): string | null {
    return sessionStorage.getItem('role');
  }



  isLogged(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getCurrentStaffId(): number | null 
  {
    const staffId = sessionStorage.getItem('staff_id');
    return staffId ? parseInt(staffId, 10): null;
  }


  
}
