export interface Role {
  id: string;
  role: string;
} 

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  role: Role;
  token: string;
}
 