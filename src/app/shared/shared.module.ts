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

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LayoutComponent,
    SidebarComponent,
    ReportCardComponent,
    NavbarComponent,
    MainHeaderComponent,
    SkeletonLoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    GlobalLoaderComponent,
    MaterialModule,
    MainHeaderComponent,
    ReportCardComponent,
    SkeletonLoaderComponent,
  ],
})
export class SharedModule {}
