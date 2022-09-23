import { RolesEnum } from './../core/models/core.model';
import { ICurrentUser } from '@core/models/user.model';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from '@core/base/base-component';
import { CurrentUserService } from '@core/services/current-user.service';
import { CustomValidator } from '@shared/helpers';
import { AuthService } from '@core/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _sub: Subscription = new Subscription();
  public date: any = new Date().getFullYear();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public loginForm!: FormGroup;
  public isLoading$: Observable<boolean> = of(false);
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private _current: CurrentUserService,
    private router: Router
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          CustomValidator.patternValidator(/\d/, {
            hasNumber: true,
          }),
          CustomValidator.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          CustomValidator.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.login();
    }
  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading$ = of(true);
    this._sub.add(
      this._auth.login(this.loginForm.value).subscribe(
        (res: ICurrentUser[]) => {
          this.isLoading$ = of(false);
          const user = res.find(
            (user: ICurrentUser) => user.email == this.loginForm.value.email
          );
          if (!user) {
            this._base.openSnackBar('User does not exist!!!');
            return;
          }
          if (atob(user.password) != this.loginForm.value.password) {
            this._base.openSnackBar('Password is incorrect');
            return;
          }
          this._current.storeUserDetails(user);
          const redirectTo = user.role == RolesEnum.ADMIN ? 'admin' : 'user';
          this.router.navigateByUrl(redirectTo);
        },

        (error: HttpErrorResponse) => {
          this.isLoading$ = of(false);
        }
      )
    );
  }
}
