import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { Staff } from '../../models/staff.model';
import * as StaffActions from '../../store/staff-actions'
import { selectAllStaff, selectStaffLoading, selectStaffMessage } from '../../store/staff-selectors';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-staff-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-list.html',
  styleUrl: './staff-list.css',
})
export class StaffList implements OnInit {

  staffList$: Observable<Staff[]>;
  loading$: Observable<boolean>;
  message$: Observable<string | null>;
  
  constructor(private store: Store, private router: Router) {
    this.staffList$ = this.store.select(selectAllStaff);
    this.loading$ = this.store.select(selectStaffLoading);

    this.message$ = this.store.select(selectStaffMessage);

  }

  ngOnInit(): void {
    this.store.dispatch(StaffActions.loadStaff());
  }

  delete(id: number) 
  {
     if(confirm('Are Sure You Want To Delete This Staff??')) {
     this.store.dispatch(StaffActions.deleteStaff({ sid: id }));
    }
    
  }

  edit(staff: Staff) {
  this.router.navigate(['/staff-form'], {
    queryParams: { sid: staff.sid }
  });
}


  selectedStaff: Staff | null = null;
  showForm = false;
  showEditPopup = false;
  

  openEdit(staff: Staff) {
  this.selectedStaff = { ...staff }; // copy values
  this.showEditPopup = true;
}

  closeEdit() {
  this.showEditPopup = false;
  this.selectedStaff = null;
}

  saveEdit() {
  if (!this.selectedStaff) return;

  this.store.dispatch(StaffActions.updateStaff({ staff: this.selectedStaff }));
  this.closeEdit();
}

  goToAdd() {
  this.showForm = false;
  this.selectedStaff = null;
}

  goToAddStaff() {
  this.router.navigate(['/staff-form']);
}



}
