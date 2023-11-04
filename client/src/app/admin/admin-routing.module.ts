import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/cpmponents/admin-layout/admin-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

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
      },
      {
        path: 'create',
        component: CreatePageComponent,
        pathMatch: 'full',
      },
      {
        path: 'post/:id/edit',
        component: EditPageComponent,
        pathMatch: 'full',
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
