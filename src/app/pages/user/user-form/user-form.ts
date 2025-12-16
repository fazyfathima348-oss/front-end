import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/users/user.actions';
import { selectUserState } from '../../../store/users/user.selectors';
import { Observable } from 'rxjs';
import { selectUSerMessage } from '../../../store/users/user.selectors';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit{

  user: User = {

     id: 0,
    name: '',
    email: '',
    contact: '',
    address: '',
    role: 'customer'

  };
   
  isEdit = false;
  message$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService, 
    private store: Store) {
      this.message$ = this.store.select(selectUSerMessage);
    }
 

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEdit = true;
      this.userService.getUser(id).subscribe((data) => {
        this.user = data;
      });

    }
    
  }


  saveUser() {

     if (this.isEdit) {
      this.store.dispatch(UserActions.updateUser({ user: this.user }));
    } else {
      this.store.dispatch(UserActions.addUser({ user: this.user }));
    }

    this.router.navigate(['/users']);
  }

 
  cancel() {
    this.router.navigate(['/users']);
  }
}
