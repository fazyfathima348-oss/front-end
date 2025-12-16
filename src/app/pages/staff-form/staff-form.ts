import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Staff } from '../../models/staff.model';
import * as StaffActions from '../../store/staff-actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-staff-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-form.html',
  styleUrl: './staff-form.css'
})
export class StaffForm {

  name = "";
  email = "";
  password = "";
  role = "";
  
  successMessage = "";
  errorMessage = "";

  constructor(private store: Store, private router: Router) {}

  save() {
    if (!this.name || !this.email || !this.password || !this.role) {
      this.errorMessage = "All fields are required!";
      this.successMessage = "";
      return;
    }

    const staff: Staff = {
      sid: 0,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.store.dispatch(StaffActions.addStaff({ staff }));

    this.successMessage = "Staff added successfully!";
    this.errorMessage = "";

    // clear form
    this.name = "";
    this.email = "";
    this.password = "";
    this.role = "";
  }

  cancel() {
    this.router.navigate(['/staff-list']);
  }
}
