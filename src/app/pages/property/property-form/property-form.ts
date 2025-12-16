import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

import { Property } from '../../../models/property.model';
import { User } from '../../../models/user.model';
import { Staff } from '../../../models/staff.model';
import { AppState } from '../../../store/app.state';
import * as PropertyActions from '../../../store/properties/property.actions';
import { 
  selectOwners, 
  selectVerificationStaff, 
  selectPropertyLoading,
  selectPropertyError,
  selectSelectedProperty 
} from '../../../store/properties/property.selectors';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './property-form.html',
  styleUrls: ['./property-form.css']
})
export class PropertyForm implements OnInit {
  propertyForm!: FormGroup;

  owners$: Observable<User[]>;
  verificationStaff$: Observable<Staff[]>;
  loading$: Observable<boolean>;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  successMessage: string = '';
  errorMessage: string = '';

  propertyTypes = ['House', 'Apartment', 'Villa', 'Land', 'Commercial'];

  isEditMode = false;
  propertyId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {
    this.owners$ = this.store.select(selectOwners);
    this.verificationStaff$ = this.store.select(selectVerificationStaff);
    this.loading$ = this.store.select(selectPropertyLoading);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();

    // Listen for store errors
    this.store.select(selectPropertyError).subscribe(error => {
      if (error) {
        this.errorMessage = error;
        this.successMessage = '';
      }
    });

    const pid = this.route.snapshot.paramMap.get('pid');
    if (pid) {
      this.isEditMode = true;
      this.propertyId = +pid;

      this.store.dispatch(PropertyActions.loadProperty({ pid: this.propertyId }));

      this.store.select(selectSelectedProperty).subscribe(property => {
        if (property) {
          this.propertyForm.patchValue({
            title: property.title,
            type: property.type,
            location: property.location,
            price: property.price,
            size: property.size,
            description: property.description,
            owner_id: property.owner_id,
            verification_staff_id: property.verification_staff_id
          });

          this.imagePreview = property.image
            ? `http://127.0.0.1:8000/storage/${property.image}`
            : null;
        }
      });
    }

    
this.actions$.pipe(
    ofType(
      PropertyActions.addPropertySuccess,
      PropertyActions.updatePropertySuccess
    )
  ).subscribe(() => {
    this.successMessage = this.isEditMode
      ? 'Property updated successfully!'
      : 'Property added successfully!';

    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/properties']); 
    }, 1500);
  });
}

  initForm(): void {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      size: [''],
      description: [''],
      owner_id: ['', Validators.required],
      verification_staff_id: ['', Validators.required],
      image: [null]
    });
  }

  loadDropdownData(): void {
    this.store.dispatch(PropertyActions.loadOwners());
    this.store.dispatch(PropertyActions.loadVerificationStaff());
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(this.selectedImage);

      this.propertyForm.patchValue({ image: this.selectedImage });
    }
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      this.markFormGroupTouched(this.propertyForm);
      return;
    }

    const formData = new FormData();
    Object.keys(this.propertyForm.controls).forEach(key => {
      if (key !== 'image') {
        const value = this.propertyForm.get(key)?.value;
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
    });

    if (this.selectedImage) formData.append('image', this.selectedImage);

    if (this.isEditMode) {
      this.store.dispatch(PropertyActions.updateProperty({
        update: { pid: this.propertyId, property: formData }
      }));
    } else {
      this.store.dispatch(PropertyActions.addProperty({ property: formData }));
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) this.markFormGroupTouched(control);
    });
  }
}
