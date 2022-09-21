import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUserService } from '@core/services/current-user.service';

@Directive({
  selector: '[rbacAllow]',
})
export class RbacDirective {
  public allowedRoles: string[] = [];
  public userRole: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _current: CurrentUserService
  ) {
    this.userRole = this._current.getUserRole();
  }
  @Input()
  set rbacAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfUserAllowed();
  }

  public showIfUserAllowed(): void {
    if (
      this.userRole == null ||
      this.userRole == undefined ||
      !this.allowedRoles ||
      this.allowedRoles.length == 0
    ) {
      this.viewContainer.clear();
      return;
    }
    // is the role allowed to access view?
    const allowed =  this.allowedRoles.includes(this.userRole)

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
    return;
  }
}
