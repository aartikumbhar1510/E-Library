import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../Shared/Services/order.service';
import { Constant } from '../Shared/Interface/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAdmin=true ;
  sidebarExpanded = true;
  LoggedInUser :any|undefined;
  LoggedInRole : any|undefined;
  totalOrderCount:number=0;
  constructor(private _rtr: Router,private _orderService :OrderService) { }

  ngOnInit(): void {
    this.LoggedInUser = localStorage.getItem('username');
    this.LoggedInRole = localStorage.getItem('role');
    if(this.LoggedInRole=='admin'){
      this.isAdmin =true;
    }else{
      this.isAdmin =false;
    }
    this.getTotalOrderCount();
  }

  onSearchBtnClick(_searchText: String) {
    console.warn(_searchText);
    if (_searchText != null) {
      alert(_searchText);
    }
  }

  Logout() {
    localStorage.clear();    
    this._rtr.navigate(['account/login']);
    
  }

  getTotalOrderCount(){
    this._orderService.getTotalOrderCount().subscribe(data=>{
      this.totalOrderCount=data?.filter(x=>x.status===Constant.CREATED).length;
      console.warn(this.totalOrderCount)
    })
  }
}
