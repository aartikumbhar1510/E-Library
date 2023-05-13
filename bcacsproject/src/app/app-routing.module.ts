import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { StatusChartComponent } from './charts/status-chart/status-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PagenotfoundComponent } from './Shared/Error/pagenotfound/pagenotfound.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { DuecalculationComponent } from './duecalculation/duecalculation.component';
import { DueCollectionComponent } from './due-collection/due-collection.component';

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
    path: 'order-history',
    component:  OrderHistoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin-charts',
    component:  StatusChartComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component:  AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path: 'show-order',
    component:  ShoworderComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'due-calculation', component:DuecalculationComponent,canActivate:[AuthGuard]
  },
  {
    path:'due-collection',component:DueCollectionComponent,canActivate:[AuthGuard]
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
