import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { GraphComponent } from './components/graph/graph.component';
import { SharedModule } from '@shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewUserComponent } from './pages/view-user/view-user.component';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, GraphComponent, ViewUserComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, NgxChartsModule],
})
export class AdminModule {}
