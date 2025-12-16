import { createAction, props } from "@ngrx/store";
import { Property } from "../../models/property.model";
import { User } from "../../models/user.model";
import { Staff } from "../../models/staff.model";



export const loadProperties = createAction('[Property] Load Properties');
export const loadPropertiesSuccess = createAction('[Property] Load Properties Success', props<{ properties: Property[] }>());
export const loadPropertiesFailure = createAction('[Property] Load Properties Failure', props<{ error: string }>());


export const loadProperty = createAction('[Property] Load Property',props<{ pid: number }>());
export const loadPropertySuccess = createAction('[Property] Load Property Success',props<{ property: Property }>());




export const loadOwners = createAction('[Property] Load Owners');
export const loadOwnerSuccess = createAction('[Property] Load Owner Success', props<{ owners: User[]}>());
export const loadOwnerFailure = createAction('[Property] Load Owner Failure', props<{ error: string}>());


export const loadVerificationStaff = createAction('[Property] Load VerificationStaff');
export const loadVerificationStaffSuccess = createAction('[Property] Load VerificationStaff Success', props<{ verificationStaff: Staff[]}>());
export const loadVerificationStaffFailure = createAction('[Property] Load VerificationStaff Failure', props<{ error: string}>());


export const addProperty = createAction('[Property] Add Property', props<{ property: FormData}>());
export const addPropertySuccess = createAction('[Property] Add Property Success', props<{ property: Property}>());
export const addPropertyFailure = createAction('[Property] Add Property Failure', props<{ error: string}>());


export const updateProperty = createAction('[Property] Update Property',props<{ update: { pid: number; property: FormData } }>() );
export const updatePropertySuccess = createAction('[Property] Update Property Success', props<{property: Property}>());
export const updatePropertyFailure = createAction('[Property] Update Property Failure', props<{ error: string}>());



export const deleteProperty = createAction('[Property] Delete Property', props<{ pid: number}>());
export const deletePropertySuccess = createAction('[Property] Delete Property Success', props<{ pid: number}>());
export const deletePropertyFailure = createAction('[Property] Delete Property Failure', props<{ error: string}>());


