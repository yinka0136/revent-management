import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { currentPlan, ICurrentUser } from '@core/models/user.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUser: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private _localStorageAS: LocalStorageService,
    private router: Router
  ) {}

  public logOut(): void {
    localStorage.clear();
    this._localStorageAS.clear();
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    const revent_user = JSON.parse(
      localStorage.getItem('revent_user') || 'null'
    );

    if (revent_user !== null && revent_user !== undefined) {
      return true;
    }
    return false;
  }

  public storeUserDetails(userDetails: any) {
    this._localStorageAS.remove('revent_user');
    this._localStorageAS.set('revent_user', userDetails);
    this.setUser();
  }

  public setUser() {
    this.currentUser.next(this.getUser());
  }

  public getUser() {
    const { jwToken, ...user } = this.getCurrentUser();
    return user;
  }

  public getUserRole(): string {
    return this.getCurrentUser()?.role ?? null;
  }

  public getCurrentUser(): ICurrentUser {
    const user = JSON.parse(this._localStorageAS.get('revent_user')) || false;
    return user;
  }



  public getAuthToken(): string | void {
    const user = this.getCurrentUser();
    if (user) {
      return user.jwToken;
    } else {
      this.logOut();
    }
  }



  public getCurrentUserObservable() {
    return this.currentUser.asObservable();
  }
 
}
