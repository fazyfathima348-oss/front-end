
import { createReducer, on } from "@ngrx/store";
import * as PropertyActions from './property.actions';
import { Property } from "../../models/property.model";
import { Staff } from "../../models/staff.model";
import { User } from "../../models/user.model";

export interface PropertyState {
    properties: Property[];
    owners: User[];
    verificationStaff: Staff[];
    selectedProperty: Property | null;
    loading: boolean;
    error: string;
}

export const initialState: PropertyState = {
    properties: [],
    owners: [],
    verificationStaff: [],
    selectedProperty: null,
    loading: false,
    error: ''
};

export const propertyReducer = createReducer(
    initialState,

    on(PropertyActions.loadProperties, (state) => ({ 
        ...state, 
        loading: true 
    })),

   on(PropertyActions.loadPropertySuccess, (state, { property }) => {
  console.log('🟢 Reducer received property:', property);
  return {
    ...state,
    selectedProperty: property,
    loading: false
  };
}),

    
    on(PropertyActions.loadPropertiesSuccess, (state, { properties }) => ({
        ...state,
        loading: false,
        properties,
    })),
    
    on(PropertyActions.loadPropertiesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PropertyActions.loadOwners, (state): PropertyState => ({
        ...state,
        loading: true,
        error: ''
    })),

    on(PropertyActions.loadOwnerSuccess, (state, { owners }): PropertyState => ({
        ...state,
        owners: owners, 
        loading: false
    })),

    on(PropertyActions.loadOwnerFailure, (state, { error }): PropertyState => ({
        ...state,
        error,
        loading: false
    })),
    
    
    on(PropertyActions.loadVerificationStaff, (state): PropertyState => ({
        ...state,
        loading: true,
        error: ''
    })),

    on(PropertyActions.loadVerificationStaffSuccess, (state, { verificationStaff }): PropertyState => ({
        ...state,
        verificationStaff: verificationStaff,  
        loading: false
    })),
    
    on(PropertyActions.loadVerificationStaffFailure, (state, { error }): PropertyState => ({
        ...state,
        error,
        loading: false
    })),

    on(PropertyActions.addPropertySuccess, (state, { property }) => ({
        ...state,
        properties: [...state.properties, property],
    })),
    
    on(PropertyActions.addPropertyFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(PropertyActions.updatePropertySuccess, (state, { property }) => ({
        ...state,
        properties: state.properties.map((p) => (p.pid === property.pid ? property : p)),
    })),
    
    on(PropertyActions.updatePropertyFailure, (state, { error }) => ({
        ...state,
        error,
    })),

  
    on(PropertyActions.deletePropertySuccess, (state, { pid }) => ({
        ...state,
        properties: state.properties.filter((p) => p.pid !== pid),
    })),
    
    on(PropertyActions.deletePropertyFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);