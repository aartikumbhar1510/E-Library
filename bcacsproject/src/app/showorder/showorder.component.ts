import { Component } from '@angular/core';
import { ILoginInfo } from '../Shared/Interface/ILoginInfo';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { AdmindashboardService } from '../Shared/Services/admindashboard.service';
import { OrderService } from '../Shared/Services/order.service';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.component.html',
  styleUrls: ['./showorder.component.scss']
})
export class ShoworderComponent {
  loginUserRole: any;
  datalist!: IorderDetails[];
  OrdersDataList!: IorderDetails[];
  IsAdmin = false;
  searchText!: string;
  constructor(private _adservice: AdmindashboardService,
    private _orderService:OrderService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }
    this._orderService.getAvailableBooks().subscribe(userdata => {

      console.warn(userdata)
      if (userdata) {
        this.datalist = userdata.filter(x=>x.status =="Created");
        this.OrdersDataList = userdata.filter(x=>x.status =="Created");
      }else{
        this.datalist=[];
      }
    });

  }

  onSearchPlacedOrder(searchText :string)
  {
    this.searchText = searchText;
    this.OrdersDataList = this.datalist?.filter((item)=>{
      const regex = new RegExp(this.searchText,"i");
      return regex.test(item.studentName)||regex.test(item.bookName)||regex.test(item.author)||regex.test(item.status);
    })
  }


}
