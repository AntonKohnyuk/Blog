import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: CreatePageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'post/:id/edit',
        component: EditPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      { path: '**', redirectTo: '/admin/dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
