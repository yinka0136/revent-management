import { NoDataComponent } from './components/no-data/no-data.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AgePipe } from './pipes/age.pipe';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RbacDirective } from '@core/directives/rbac.directive';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LayoutComponent,
    SidebarComponent,
    ReportCardComponent,
    NavbarComponent,
    MainHeaderComponent,
    SkeletonLoaderComponent,
    AgePipe,
    NoDataComponent, ConfirmationDialogComponent, ProfileComponent,RbacDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [FormsModule,
    ReactiveFormsModule,
    GlobalLoaderComponent,
    MaterialModule,
    MainHeaderComponent,
    ReportCardComponent,
    SkeletonLoaderComponent,
    AgePipe,
    NoDataComponent, ConfirmationDialogComponent, ProfileComponent,RbacDirective
  ],
})
export class SharedModule {}
