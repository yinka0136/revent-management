import { Observable } from 'rxjs';

export interface ICurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  address: string;
  password:string;
  role: string;
  created_at: string;
  reventToken: string;
  isDeleting$: Observable<boolean>;
  isSuper: boolean
}

export interface IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  phoneNumber: string;
  address: string;
  role: string;
  created_at: string;
  reventToken: string;
  isDeleting$: Observable<boolean>;
}
