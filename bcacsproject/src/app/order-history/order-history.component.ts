import { Component } from '@angular/core';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { OrderService } from '../Shared/Services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  loginUserRole: any;
  datalist!: IorderDetails[];
  OrdersDataList!: IorderDetails[];
  IsAdmin = false;
  searchText!: string;
  constructor(private _orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');

    this._orderService.getAvailableBooks().subscribe(data => {
      if (data) {
        this.datalist = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
        this.OrdersDataList = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
      } else {
        this.datalist = [];
      }
    });

  }

  onSearchBookHistory(searchValue: string) {
    this.searchText = searchValue;
    this.OrdersDataList = this.datalist?.filter((item) => {
      const regex = new RegExp(this.searchText, "i");
      return regex.test(item.studentName) || regex.test(item.bookName) || regex.test(item.author) || regex.test(item.status);
    })
  }

}
