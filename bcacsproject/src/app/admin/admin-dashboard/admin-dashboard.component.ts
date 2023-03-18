import { Component, OnInit } from '@angular/core';
import { AdmindashboardService } from 'src/app/Shared/Services/admindashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  loginUserRole: any;
  datalist!: any[];
  IsAdmin = false;
  constructor(private _adservice: AdmindashboardService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }
    this._adservice.getUsers().subscribe(userdata => {

      console.warn(userdata)
      if (userdata) {
        this.datalist = userdata;
      }else{
        this.datalist=[];
      }
    });

  }

}
