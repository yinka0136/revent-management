import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}



  public getInitial(username: any) {
    if (username) {
      let firstName = username.split(' ')[0];
      let lastName = username.split(' ')[1];
      return (
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    }

    return;
  }
}
