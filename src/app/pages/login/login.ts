import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

 login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => {
      const role = res.staff.role ? res.staff.role.toLowerCase() : '';

      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('email', res.staff.email);

      // Save name
      sessionStorage.setItem('name', res.staff.name ?? res.staff.email);
      sessionStorage.setItem('sid', res.staff.sid ?? res.staff.sid);
      sessionStorage.setItem('role', role);
      

      // Navigate based on role
      if (role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    },
    error: () => {
      this.errorMessage = 'Invalid Credentials!!';
    }
  });
}



  cancel() {
  this.email = '';
  this.password = '';
  this.errorMessage = '';
  this.router.navigate(['/']); 
}


}
