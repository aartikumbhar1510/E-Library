import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './Shared/Error/pagenotfound/pagenotfound.component';
import { ShoworderComponent } from './showorder/showorder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'
  },
  {
    path: 'account/login',
    component: LoginComponent
  },
  {
    path: 'account/register',
    component: RegisterComponent
  },
  {
    path: 'student-dashboard',
    component:  DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component:  AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path: 'showorder',
    component:  ShoworderComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
