import { Staff } from "./staff.model";
import { User } from "./user.model";

export interface Property {




  pid: number;

  owner_id: number;
  property_staff_id: number;
  verification_staff_id: number;

  title: string;
  type: string;
  location: string;
  description?: string;

  price: number;
  size?: string;

  image?: string; 
  status?: 'pending' | 'verified';

    
  owner?: User;
  propertyStaff?: Staff;
  verification_staff?: Staff;


  created_at?: string;
  updated_at?: string;
}

