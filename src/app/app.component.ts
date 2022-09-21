import { Component, NgZone } from '@angular/core';
import { NavigationCancel, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'revent-management';
  public showpageLoader$: Observable<boolean> = of(false);
  constructor(    
    private ngZone: NgZone,   private router: Router,){
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof RouteConfigLoadStart) {
      // We wanna run this function outside of Angular's zone to
      // bypass change detection
      this.ngZone.runOutsideAngular(() => {
        this.showpageLoader$ = of(true);
      });
    }
    if (event instanceof RouteConfigLoadEnd) {
      this._hideSpinner();
    }
    // Set loading state to false in both of the below requestEvents to
    // hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this._hideSpinner();
    }
    if (event instanceof NavigationError) {
      this._hideSpinner();
    }
  }

  private _hideSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      this.showpageLoader$ = of(false);
    });
  }
}
