import { Observable, of } from 'rxjs';
import { ICurrentUser } from '@core/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '@shared/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
@Input()user!:ICurrentUser
@Input()loading$:Observable<boolean> = of(false)
public userForm!: FormGroup;
public initial!: string 

  constructor(  private fb: FormBuilder, private _utils: UtilityService) { }

  ngOnInit(): void {
    this.initial = this._utils.getInitial(this.user);
    this.initUserEditForm();

  }
  public initUserEditForm(): void {
    this.userForm = this.fb.group({
      email: [
        { value: this.user.email ?? '', disabled: true },
        [Validators.required, Validators.email],
      ],
      firstName: [this.user.firstName ?? '', [Validators.required]],
      lastName: [this.user.lastName ?? '', [Validators.required]],
      role: [this.user.role ?? '', [Validators.required]],
      dob: [this.user.dob ?? '', [Validators.required]],
      address: [this.user.address ?? '', [Validators.required]],
      phoneNumber: [
        this.user.phoneNumber ?? '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          Validators.pattern('[+]?[0-9]*'),
        ],
      ],
    });
    this.userForm.disable()
  }
}
