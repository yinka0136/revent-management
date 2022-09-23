import { ICurrentUser } from '@core/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}



  public getInitial(user: ICurrentUser) : string{
    if (user) {
      let firstName = user.firstName;
      let lastName = user.lastName;
      return (
        lastName.charAt(0).toUpperCase() + firstName.charAt(0).toUpperCase()
      );
    }

    return 'User';
  }
}
