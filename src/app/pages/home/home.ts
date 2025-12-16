import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Auth } from '../../services/auth';
import { Observable } from 'rxjs';


export interface Property {
  id: number;
  title: string;
  type: string;
  location: string;
  description?: string;
  price: number | null; 
  size?: string;
  image?: string;
  status?: 'pending' | 'verified';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  isLogged$: Observable<boolean>;
  properties: Property[] = [];
  loading: boolean = true;
  error: string | null = null;
  showRegistrationForm: boolean = false;
  selectedProperty: Property | null = null;
  isSubmitting: boolean = false;
  
  private apiUrl = 'http://127.0.0.1:8000/api/public/properties';

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private router: Router
  ) {
    this.isLogged$ = this.auth.loggedIn$;
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.error = null;
    
    this.http.get<Property[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error loading properties:', error);
          
          let errorMessage = 'Failed to load properties';
          if (error.status === 0) {
            errorMessage = 'Cannot connect to server. Please check your connection.';
          } else if (error.status === 404) {
            errorMessage = 'Properties API not found.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          this.error = errorMessage;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (properties) => {
          if (properties && properties.length > 0) {
            this.properties = properties;
            console.log(`Loaded ${properties.length} properties from API`);
          } else {
            this.properties = [];
            console.log('No properties found');
          }
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }



  requestToBuy(property: Property) {
    this.selectedProperty = property;
    this.showRegistrationForm = true;
  }

  closeRegistrationForm() {
    this.showRegistrationForm = false;
    this.selectedProperty = null;
    this.isSubmitting = false;
  }

  submitRegistration() {
    this.isSubmitting = true;
    
    setTimeout(() => {
      alert(`Thank you for your interest in "${this.selectedProperty?.title}"!\nOur agent will contact you shortly.`);
      this.closeRegistrationForm();
    }, 1000);
  }

  
  
}