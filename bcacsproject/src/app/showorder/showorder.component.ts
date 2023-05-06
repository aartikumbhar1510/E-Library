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
  isDataLoaded:boolean=false;
  statusChangeValue !: string;

  constructor(private _adservice: AdmindashboardService,
    private _orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }
    this.getAllNewOrders();
  }

  getAllNewOrders() {
    this._orderService.getAvailableBooks().subscribe(userdata => {

      console.warn(userdata)
      if (userdata) {
        this.isDataLoaded=false;
        this.datalist = userdata.filter(x => x.status == "Created");
        this.OrdersDataList = userdata.filter(x => x.status == "Created");
      } else {
        this.datalist = [];
        this.isDataLoaded=true;
      }
    });

  }

  onSearchPlacedOrder(searchText: string) {
    this.searchText = searchText;
    this.OrdersDataList = this.datalist?.filter((item) => {
      const regex = new RegExp(this.searchText, "i");
      return regex.test(item.studentName) || regex.test(item.bookName) || regex.test(item.author) || regex.test(item.status);
    })
  }

  onStatusChange(statusValue: string) {
    if (statusValue === "Created") {
      return this.statusChangeValue = "badge bg-warning";
    } else if (statusValue === "Rejected") {
      return this.statusChangeValue = "badge bg-danger";
    } else {
      return this.statusChangeValue = "badge bg-success";
    }
  }

  onApprovedAction(){

  }

  onRejectAction(){

  }

}
