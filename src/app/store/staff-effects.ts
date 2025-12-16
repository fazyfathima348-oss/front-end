import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as StaffActions from './staff-actions';
import { StaffService } from '../services/staff-service';


@Injectable()
export class StaffEffects {
  private actions$ = inject(Actions);
  private staffService = inject(StaffService);
  
  loadStaff$ = createEffect(() =>
  this.actions$.pipe(
    ofType(StaffActions.loadStaff),
    switchMap(() =>
      this.staffService.getStaffs().pipe(
        map((staff) => StaffActions.loadStaffSuccess({ staff })),
        catchError((error) =>
          of(StaffActions.loadStaffFailure({ error: error.message }))
        )
      )
    )
  )
);


  addStaff$ = createEffect(() =>
  this.actions$.pipe(
      ofType(StaffActions.addStaff),
      switchMap(action =>
        this.staffService.addStaff(action.staff).pipe(
          map(staff => {
            return StaffActions.addStaffSuccess({ staff });
          }),
          catchError(error => of(StaffActions.loadStaffFailure({ error: error.message })))
        )
      )
    )
  );


  updateStaff$ = createEffect(() =>
  this.actions$.pipe(
    ofType(StaffActions.updateStaff),
    switchMap(action =>
      this.staffService.updateStaff(action.staff).pipe(
        map(staff => StaffActions.updateStaffSuccess({ staff })),
        catchError(error => of(StaffActions.updateStaffFailure({ error: error.message })))
      )
    )
  )
);

  deleteStaff$ = createEffect(() =>
  this.actions$.pipe(
    ofType(StaffActions.deleteStaff),
    switchMap(action =>
      this.staffService.deleteStaff(action.sid).pipe(
        map(() => StaffActions.deleteStaffSuccess({ sid: action.sid })),
        catchError(error => of(StaffActions.deleteStaffFailure({ error: error.message })))
      )
    )
  )
);

}
