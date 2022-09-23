import { ConfirmationDialogComponent } from './../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { ICurrentUser } from '@core/models/user.model';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Base } from '@core/base/base-component';
import { pageSizeOptionsDTO } from '@core/models/response.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogModel } from '@core/models/dialog.model';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private _sub: Subscription = new Subscription();
  public usersLoading: boolean = false;
  public dataSource!: MatTableDataSource<ICurrentUser>;
  public sortUsers: ICurrentUser[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public users$!: Observable<ICurrentUser[]>;
  public pageSizeOptions: number[] = pageSizeOptionsDTO;
  constructor(
    private base: Base,
    private _admin: AdminService,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersLoading = true;
    this._sub.add(
      this._admin.getUsers().subscribe({
        next: (res: ICurrentUser[]) => {
          this.usersLoading = false;
          this.sortUsers = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this._changeDetectorRef.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.users$ = this.dataSource.connect();
        },
        error: (e) => {
          this.usersLoading = false;
          console.log(e);
        },
      })
    );
  }

  public applyFilter(filterValue: any) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  sortData(sort: Sort) {
    const data = this.sortUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<any>(data);
      return;
    }
    const sortUsersByTag = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.fullName, b.fullName, isAsc);
        case 'role':
          return this.compare(a.role, b.role, isAsc);
        case 'age':
          return this.compare(a.dob, b.dob, isAsc);
        case 'date':
          return this.compare(a.created_at, b.created_at, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<any>(sortUsersByTag);
  }

  public compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public view(id: number): void {
    this.router.navigate(['admin/users', id]);
  }

  public delete(user: ICurrentUser): void {
    user.isDeleting$ = of(true);
    setTimeout(() => {
      user.isDeleting$ = of(false);
    }, 1000);
    this._sub.add(
      this._admin.deleteUserById(user.id).subscribe({
        next: (res: any) => {
          user.isDeleting$ = of(false);
          console.log(res);
          // this.user = res;
          this.getUsers();
        },
        error: (e) => {
          user.isDeleting$ = of(false);
          console.log(e);
        },
      })
    );
  }

  public userDialog(
    payload: { isEditing?: boolean; editObj?: any } | any
  ): void {
    let object: DialogModel<ICurrentUser> = payload;
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: payload,
    });
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<ICurrentUser>) => {
        console.log(event);
        if (event?.isEditing) {
          const index = this.sortUsers.findIndex((user: ICurrentUser) => {
            return user.id == event?.editObject?.id;
          });
          this.sortUsers[index] = event?.editObject;
          this.getUsers();
          // this.dataSource = new MatTableDataSource<any>(this.sortUsers);
          // this._changeDetectorRef.detectChanges();
        } else {
          const newUsers = [event?.editObject, ...this.sortUsers];
          this.getUsers();
          // console.log(newUsers);
          // this.dataSource = new MatTableDataSource<any>(newUsers);
          // this._changeDetectorRef.detectChanges();
        }
      }
    );
  }
  public openConfirmationDialog(user: ICurrentUser): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'modal-width',
    });
    dialogRef.componentInstance.event.subscribe((action: boolean) => {
      action && this.delete(user);
    });
  }
  ngOnDestroy(): void {
    this.base.clearSubscription();
  }
}
