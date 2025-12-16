import { createReducer, on } from '@ngrx/store';
import { Staff } from '../models/staff.model';
import * as StaffActions from './staff-actions'

export interface StaffState {
  staff: Staff[];
  loading: boolean;
  error: string | null;
  message: string | null; 
}

export const initialState: StaffState = {
  staff: [],
  loading: false,
  error: null,
  message: null,
};

export const staffReducer = createReducer(
  initialState,

  on(StaffActions.loadStaff, state => ({ ...state, loading: true, error: null })),
  on(StaffActions.loadStaffSuccess, (state, { staff }) => ({ ...state, staff, loading: false })),
  on(StaffActions.loadStaffFailure, (state, { error }) => ({ ...state, error, loading: false })),


  on(StaffActions.addStaffSuccess, (state, { staff }) => ({
    ...state,
    staff: [...state.staff, staff],
    message: "Staff Saved Successfully!!"
  })),


  on(StaffActions.updateStaffSuccess, (state, { staff }) => ({
    ...state,
    staff: state.staff.map(s => s.sid === staff.sid ? staff : s),
    message: "Staff Updated Successfully!!"
  })),


  on(StaffActions.deleteStaffSuccess, (state, { sid }) => ({
    ...state,
    staff: state.staff.filter(s => s.sid !== sid),
    message: "Staff Removed Successfully!!"
  })),

  
  on(StaffActions.setMessage, (state, { message }) => ({ ...state, message })),
  on(StaffActions.clearMessage, (state) => ({ ...state, message: null }))
);
