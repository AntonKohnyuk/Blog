import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AdminLayoutComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSortModule,
  ],
  providers: [AlertService],
})
export class AdminModule {}
