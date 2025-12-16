import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PropertyState } from "./property.reducer";


export const selectPropertyState = createFeatureSelector<PropertyState>('property');

export const selectAllProperties = createSelector(
    selectPropertyState,
    (state) => state.properties
);

export const selectOwners = createSelector(
  selectPropertyState,
  (state) => state.owners
);

export const selectVerificationStaff = createSelector(
  selectPropertyState,
  (state) => state.verificationStaff
);

export const selectPropertyLoading = createSelector(
   selectPropertyState,
   (state) => state.loading
);

export const selectPropertyError = createSelector(
    selectPropertyState,
    (state) => state.error
);

export const selectSelectedProperty = createSelector(
  selectPropertyState,
  state => state.selectedProperty
);
