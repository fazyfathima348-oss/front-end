import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StaffEffects } from './store/staff-effects';
import { staffReducer } from './store/staff-reducers';

import { UserEffects } from './store/users/user.effects';
import { userReducer } from './store/users/user.reducers';

import { PropertyEffects } from './store/properties/property.effects';
import { propertyReducer } from './store/properties/property.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideStore({ staff: staffReducer, user: userReducer, property: propertyReducer }),
    provideEffects([StaffEffects, UserEffects, PropertyEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
   
]
};
