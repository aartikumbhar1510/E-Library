import { Component } from '@angular/core';
import { AdmindashboardService } from '../Shared/Services/admindashboard.service';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.component.html',
  styleUrls: ['./showorder.component.scss']
})
export class ShoworderComponent {
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
