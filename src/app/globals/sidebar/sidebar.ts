import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {

  role$: Observable<string | null>;
  isLogged$: Observable<boolean>;
  userName$: Observable<string | null>;

  constructor(private router: Router, private auth: Auth) {
    this.role$ = this.auth.role$.pipe(
      map(role => role ? role.toLowerCase() : null)
    );

    this.isLogged$ = this.auth.loggedIn$;

    this.userName$ = this.auth.name$;


  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
