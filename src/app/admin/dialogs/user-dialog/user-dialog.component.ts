import { AdminService } from './../../services/admin.service';
import { ICurrentUser } from '@core/models/user.model';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogModel } from '@core/models/dialog.model';
import { Base } from '@core/base/base-component';
import { CustomValidator } from '@shared/helpers';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent implements OnInit, OnDestroy {
  public users: ICurrentUser[] = [];
  public sub: Subscription = new Subscription();
  //event for added user or updated user
  @ViewChild('close') close!: ElementRef;
  public userForm!: FormGroup;
  public isLoading$: Observable<boolean> = of(false);
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  @Output() event: EventEmitter<{
    editObject?: ICurrentUser;
    isEditing: boolean;
  }> = new EventEmitter<{ editObj?: ICurrentUser; isEditing: boolean }>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { editObject: ICurrentUser; isEditing: boolean },
    private fb: FormBuilder,
    private _admin: AdminService,
    public dialog: MatDialog,
    private _base: Base
  ) {
    if (this.data.isEditing) {
      this.initUserEditForm(this.data.editObject);
      return;
    } else {
      this.getUsers();
      this.initUserForm();
    }
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  public initUserEditForm(data: ICurrentUser): void {
    this.userForm = this.fb.group({
      email: [
        { value: data.email ?? '', disabled: true },
        [Validators.required, Validators.email],
      ],
      firstName: [data.firstName ?? '', [Validators.required]],
      lastName: [data.lastName ?? '', [Validators.required]],
      role: [data.role ?? '', [Validators.required]],
      dob: [data.dob ?? '', [Validators.required]],
      address: [data.address ?? '', [Validators.required]],
      phoneNumber: [
        data.phoneNumber ?? '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          Validators.pattern('[+]?[0-9]*'),
        ],
      ],
    });
  }
  public initUserForm(): void {
    this.userForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        role: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        address: ['', [Validators.required]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14),
            Validators.pattern('[+]?[0-9]*'),
          ],
        ],
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
        confirmPassword: ['', [Validators.required]],
      },
      { validator: CustomValidator.passwordMatchValidator }
    );
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }
  public submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const payload = this.userForm.value;
    if (!this.data.isEditing) {
      const user = this.users.find(
        (user: ICurrentUser) => user.email == this.userForm.value.email
      );
      if (user) {
        this._base.openSnackBar('Email already exists!!!');
        return;
      }
      payload.password = btoa(this.userForm.value.password);
      payload.created_at = Date.now();
      payload.reventToken = null;
      delete payload.confirmPassword;
    }
    this.isLoading$ = of(true);
    const operation = this.data.isEditing ? 'updateUser' : 'addUser';
    this.data.isEditing ? (payload.id = this.data.editObject.id) : null;
    this.sub.add(
      this._admin[operation](payload).subscribe({
        next: (user: ICurrentUser) => {
          this._base.openSnackBar('User Created Successfully!!!');
          this.isLoading$ = of(false);
          this.event.emit({
            isEditing: this.data.isEditing,
            editObject: user,
          });
          this.close.nativeElement.click();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading$ = of(false);
        },
      })
    );
  }

  public getUsers(): void {
    this.sub.add(
      this._admin.getUsers().subscribe({
        next: (res: ICurrentUser[]) => {
          this.users = res;
        },
        error: (e) => {
          console.log(e);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
