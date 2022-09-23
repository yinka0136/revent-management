import { ICurrentUser } from '@core/models/user.model';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Base } from '@core/base/base-component';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  private _sub: Subscription = new Subscription();
  public user!: ICurrentUser;
  public userLoading$:Observable< boolean> = of(false);
  public userId!: number;
  constructor(
    private _route: ActivatedRoute,
    public _admin: AdminService,
    private _base: Base
  ) {
    _route.params.subscribe((el) => {
      this.userId = el['id'];
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userLoading$ = of(true)
    this._sub.add(
      this._admin.getUserById(this.userId).subscribe({
        next: (res: any) => {
          this.userLoading$ = of(false);
          this.user = res;
        },
        error: (e) => {
          this.userLoading$ = of(false);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._base.clearSubscription();
  }
}
