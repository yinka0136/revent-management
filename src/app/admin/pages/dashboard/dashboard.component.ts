import { ICurrentUser } from '@core/models/user.model';
import { AdminService } from './../../services/admin.service';
import { Base } from '@core/base/base-component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { DasboardCount } from 'app/admin/models/dashboard.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _sub: Subscription = new Subscription();
  public isLoadingDashboardCount: boolean = false;
  public usersLength: number = 0;
  public todayUsersLength: number = 0;

  public user!: ICurrentUser;
  public hour!: number;

  constructor(
    private _localStorageAs: LocalStorageService,
    private _base: Base,
    private _admin: AdminService
  ) {
    this._sub.add(
      timer(0, 1000)
        .pipe(
          map(() => new Date().getHours()),
          share()
        )
        .subscribe((time) => {
          this.hour = time;
        })
    );
    this._localStorageAs.watch('revent_user').subscribe((res: any) => {
      if (res) {
        this.user = res;
      }
    });
  }

  ngOnInit(): void {
    this.getDashboard();
  }

  public getDashboard(): void {
    this.isLoadingDashboardCount = true;
    this._admin.getUsers().subscribe({
      next: (res: ICurrentUser[]) => {
        this.isLoadingDashboardCount = false;
        this.usersLength = res.length;
        this.todayUsersLength = res.filter(
          (u) => new Date(u.created_at).getDay() == new Date().getDay()
        ).length;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingDashboardCount = false;
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
