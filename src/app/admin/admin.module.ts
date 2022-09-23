import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { GraphComponent } from './components/graph/graph.component';
import { SharedModule } from '@shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    GraphComponent,
    ViewUserComponent,
    UserDialogComponent,
    AccountComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, NgxChartsModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
