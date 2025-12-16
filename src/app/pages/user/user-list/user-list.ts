import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/users/user.actions';
import { selectAllUsers, selectUserState } from '../../../store/users/user.selectors';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  users: User[] = [];
  selectedRole: string = 'customer';

  constructor(private router: Router, private store: Store)  {}
 

  ngOnInit() {
    this.loadUsers();

      this.store.select(selectAllUsers).subscribe((data) => {
      this.users = data;
    });
  }


  loadUsers() {
    this.store.dispatch(UserActions.loadUsers({ role: this.selectedRole}));
  }

  
   onRoleChange(event: any) {
    const selectedRole = event.target.value;
    this.store.dispatch(UserActions.loadUsers({ role: selectedRole }));
  }


  changeRole(role: string) {
    this.selectedRole = role;
    this.loadUsers();
  }


  addUser() {
    this.router.navigate(['/users/add']);
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit', id])
  }

  deleteUser(id:number) {
    if(confirm('Are Sure You Want To Delete This User??')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }



}
