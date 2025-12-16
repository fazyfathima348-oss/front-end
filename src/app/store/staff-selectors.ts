import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState } from './staff-reducers'

export const selectStaffState = createFeatureSelector<StaffState>('staff');

export const selectAllStaff = createSelector(
  selectStaffState,
  state => state.staff
);

export const selectStaffLoading = createSelector(
  selectStaffState,
  state => state.loading
);

export const selectStaffMessage = createSelector(
  selectStaffState,
  state => state.message
);

