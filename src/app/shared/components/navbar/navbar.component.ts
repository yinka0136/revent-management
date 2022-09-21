import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '@core/services/current-user.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { UtilityService } from '@shared/services/utility.service';
import { Base } from '@core/base/base-component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: any | any;
  public isLoading: boolean = false;
  public initial!: string 

  constructor(
    private _loacalStorageAS: LocalStorageService,
    public _utils: UtilityService,
    private _currentUser: CurrentUserService,
    private _base: Base,
    private router: Router
  ) {
    this._loacalStorageAS.watch('revent_user').subscribe((_res: any) => {
      if (_res) {
        this.user = _res;
        this.initial = this._utils.getInitial(this.user.userName);
      }
    });
  }

  ngOnInit(): void {
  }

  


  public logout(): void {
    this._currentUser.logOut();
  }

 

}
