import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { RouteGuard } from '@core/guards/route.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [RouteGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [RoleGuard],
      },
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'admin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
