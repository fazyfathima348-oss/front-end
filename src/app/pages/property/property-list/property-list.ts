import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Property } from '../../../models/property.model';
import { AppState } from '../../../store/app.state';
import * as PropertyActions from '../../../store/properties/property.actions';
import { selectAllProperties, selectPropertyLoading, selectPropertyError } from '../../../store/properties/property.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';


@Component({
  standalone: true,
  selector: 'app-property-list',
  imports: [CommonModule, RouterModule ],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList implements OnInit{

  properties$: Observable<Property[]>;


  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.properties$ = this.store.select(selectAllProperties);
    this.loading$ = this.store.select(selectPropertyLoading);
    this.error$ = this.store.select(selectPropertyError);

    this.properties$.subscribe(properties => {
  console.log('🏠 Raw Properties:', properties);
  if (properties && properties.length > 0) {
    console.log('📋 First Property Keys:', Object.keys(properties[0]));
    console.log('👤 Owner ID:', properties[0].owner_id);
    console.log('👤 Owner object exists?', 'owner' in properties[0]);
    console.log('👨‍💼 Staff ID:', properties[0].verification_staff_id);
    console.log('👨‍💼 Staff object exists?', 'verification_staff' in properties[0]);
  }
});
  }

   ngOnInit(): void {
    this.loadProperties();
  }
  
   loadProperties(): void {
    this.store.dispatch(PropertyActions.loadProperties());
  }

  deleteProperty(pid: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.store.dispatch(PropertyActions.deleteProperty({ pid }));
    }
  }

   getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}




