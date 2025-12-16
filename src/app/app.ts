import { Component, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './globals/sidebar/sidebar';
import { Footer } from './globals/footer/footer';
import { Auth } from './services/auth';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Sidebar, Footer, AsyncPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('EliteEstates');
  isLogged$: Observable<boolean>;

  constructor(private auth: Auth) {
    this.isLogged$ = this.auth.loggedIn$;
  }
}
