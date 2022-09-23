import { LocalStorageService } from '@shared/services/local-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Base } from '@core/base/base-component';
import { ICurrentUser } from '@core/models/user.model';
import { AdminService } from 'app/admin/services/admin.service';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  private _sub: Subscription = new Subscription();
  public user!: ICurrentUser;
  public userLoading$: Observable<boolean> = of(false);
  public userId!: number;
  constructor(
    private _route: ActivatedRoute,
    public _admin: AdminService,
    private _base: Base,
    private _localStorageAS: LocalStorageService
  ) {
    _localStorageAS.watch('revent_user').subscribe((res: any) => {
      if (res) {
        this.user = res;
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._base.clearSubscription();
  }
}
