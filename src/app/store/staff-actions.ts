import { createAction, props } from "@ngrx/store";
import { Staff } from "../models/staff.model";

//load staff....
export const loadStaff = createAction('[Staff] Load Staff');

export const loadStaffSuccess = createAction(
    '[Staff] Load Staff Success',
    props<{ staff: Staff[] }>()

);

export const loadStaffFailure = createAction(
    '[Staff] Load Staff Failure',
    props<{ error:string }>()
);


//Add Satff....
export const addStaff = createAction(
    '[Staff] Add Staff',
    props<{ staff: Staff }>()

);

export const addStaffSuccess = createAction(
     '[Staff] Add Staff Success',
    props<{ staff: Staff }>()
)

//Update Stafff...
export const updateStaff = createAction(
  '[Staff] Update Staff',
  props<{ staff: Staff }>()
);

export const updateStaffSuccess = createAction(
  '[Staff] Update Staff Success',
  props<{ staff: Staff }>()
);

export const updateStaffFailure = createAction(
  '[Staff] Update Staff Failure',
  props<{ error: string }>()
);

//Delete Staff....
export const deleteStaff = createAction(
  '[Staff] Delete Staff',
  props<{ sid: number }>()
);

export const deleteStaffSuccess = createAction(
  '[Staff] Delete Staff Success',
  props<{ sid: number }>()
);
export const deleteStaffFailure = createAction(
  '[Staff] Delete Staff Failure',
  props<{ error: string }>()
);


// Global messages
export const setMessage = createAction(
  '[Staff] Set Message',
  props<{ message: string }>()
);
export const clearMessage = createAction('[Staff] Clear Message');
