import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CurrentUserService } from '@core/services/current-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private _current: CurrentUserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this._current.isLoggedIn();
    if (isLoggedIn) {
      // Allow to access route cause user is logged in
      return true;
    }
    // not logged in so redirect to login page
    this._current.logOut();
    return false;
  }
}
