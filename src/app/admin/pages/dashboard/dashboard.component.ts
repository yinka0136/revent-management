import { Base } from '@core/base/base-component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { DasboardCount } from 'app/admin/models/dashboard.model';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isLoadingDashboardCount: boolean = false;
  public isLoadingAccessKey: boolean = false;
  public key: string = '';
  public error_message: string = '';
  public dashboardCount: DasboardCount | undefined;
  public userName!: string;

  public hour!: number;
  constructor(
    private _localStorageAs: LocalStorageService,
    private _base: Base
  ) {
    this._base.addSubscription(
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
        this.userName = res?.userName;
      }
    });
  }

  ngOnInit(): void {
    // this.getDashboard();
  }

  // public getDashboard(): void {
  //   this.isLoadingDashboardCount = true;
  //   this._auth.getDashboard().subscribe({
  //     next: (res: ResponseModel<DasboardCount>) => {
  //       this.isLoadingDashboardCount = false;
  //       this.dashboardCount = res.data;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isLoadingDashboardCount = false;
  //     },
  //   });
  // }
}
