import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  loginUserRole:any;
  IsAdmin=false;
  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if(this.loginUserRole =="admin")
    {
      this.IsAdmin = true;
    }
  }
  
}
