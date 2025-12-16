import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PropertyService } from '../../services/property-service';
import * as PropertyActions from '../../store/properties/property.actions';

@Injectable()
export class PropertyEffects {

  private actions$ = inject(Actions);
  private propertyService = inject(PropertyService);

  loadProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadProperties),
      mergeMap(() =>
        this.propertyService.getProperties().pipe(
          map(properties => PropertyActions.loadPropertiesSuccess({ properties })),
          catchError(error => of(PropertyActions.loadPropertiesFailure({ error: error.message })))
        )
      )
    )
  );

  loadProperty$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PropertyActions.loadProperty),
    mergeMap(action =>
      this.propertyService.getProperty(action.pid).pipe(
        map(property =>
          PropertyActions.loadPropertySuccess({ property })
        )
      )
    )
  )
);


  loadOwners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadOwners),
      mergeMap(() =>
        this.propertyService.getOwners().pipe(
          map(owners => PropertyActions.loadOwnerSuccess({ owners })),
          catchError(error => of(PropertyActions.loadOwnerFailure({ error: error.message })))
        )
      )
    )
  );

  loadVerificationStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadVerificationStaff),
      mergeMap(() =>
        this.propertyService.getVerificationStaff().pipe(
          map(verificationStaff => PropertyActions.loadVerificationStaffSuccess({ verificationStaff })),
          catchError(error => of(PropertyActions.loadVerificationStaffFailure({ error: error.message })))
        )
      )
    )
  );

  addProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.addProperty),
      mergeMap((action) =>
        this.propertyService.createProperty(action.property).pipe(
          map(createdProperty => PropertyActions.addPropertySuccess({ property: createdProperty })),
          catchError(error => of(PropertyActions.addPropertyFailure({ error: error.message })))
        )
      )
    )
  );


updateProperty$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PropertyActions.updateProperty),
    mergeMap((action) => {
      const { pid, property } = action.update;
      return this.propertyService.updateProperty(pid, property).pipe(
        map(updatedProperty => PropertyActions.updatePropertySuccess({ property: updatedProperty })),
        catchError(error => of(PropertyActions.updatePropertyFailure({ error: error.message })))
      );
    })
  )
);

  deleteProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.deleteProperty),
      mergeMap((action) =>
        this.propertyService.deleteProperty(action.pid).pipe(
          map(() => PropertyActions.deletePropertySuccess({ pid: action.pid })),
          catchError(error => of(PropertyActions.deletePropertyFailure({ error: error.message })))
        )
      )
    )
  );
}