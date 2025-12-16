export interface User {
  id: number;
  name: string;
  email: string;
  contact?: string;
  address?: string;
  role: 'owner' | 'customer';
  password?: string;   

}