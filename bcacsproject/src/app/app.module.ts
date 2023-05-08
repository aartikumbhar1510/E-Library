import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './Shared/Error/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { StatusChartComponent } from './charts/status-chart/status-chart.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderByPipe } from './Shared/pipes/orderBy';
import{NgChartsModule} from 'ng2-charts';
import { StudchartComponent } from './studchart/studchart.component';
import { ToastrModule } from 'ngx-toastr';
import { DuecalculationComponent } from './duecalculation/duecalculation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    AdminDashboardComponent,
    ShoworderComponent,
    StatusChartComponent,
    OrderHistoryComponent,
    OrderByPipe,
    StudchartComponent,
    DuecalculationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    ToastrModule 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
