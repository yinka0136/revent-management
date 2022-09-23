import { ICurrentUser } from '@core/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Subscription, timer, map, share } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit , OnDestroy{
  private _sub: Subscription = new Subscription()
  public user!: ICurrentUser;

  public hour!: number;
  constructor( private _localStorageAs: LocalStorageService,) { 
    this._sub.add(
      timer(0, 1000)
        .pipe(
          map(() => new Date().getHours()),
          share()
        )
        .subscribe((time) => {
          this.hour = time;
        })
    ); this._localStorageAs.watch('revent_user').subscribe((res: any) => {
      if (res) {
        this.user= res;
      }
    });
  }
  ngOnDestroy(): void {
   this._sub.unsubscribe()
  }

  ngOnInit(): void {
  }

  

}
