import { Component } from '@angular/core';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { OrderService } from '../Shared/Services/order.service';
import { BookService } from '../Shared/Services/book.service';
import { Ibooks } from '../Shared/Interface/Ibooks';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  loginUserId: any;
  datalist!: IorderDetails[];
  OrdersDataList!: IorderDetails[];
  IsAdmin = false;
  searchText!: string;
  statusChangeValue !: string;
  viewBookData: IorderDetails = new IorderDetails();
  OrdersDataListByUser!: IorderDetails[];
  constructor(private _orderService: OrderService, private _booksService: BookService) {
  }

  ngOnInit(): void {
    this.loginUserId = localStorage.getItem('uid');

    console.warn(this.loginUserId)

    this._orderService.getOrderHistoryByUserID(this.loginUserId).subscribe(data => {
      if (data) {
        this.datalist = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
        this.OrdersDataList = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
      } else {
        this.datalist = [];
      }
    });


    this.getOrderHistoryByUserID();
  }

  onSearchBookHistory(searchValue: string) {
    this.searchText = searchValue;
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



  onViewBookDeatils(order: any) {
    console.warn(order)
    this.viewBookData = order;
  }


  getOrderHistoryByUserID() {
    this.loginUserId=2
    this._orderService.getOrderHistoryByUserID(this.loginUserId).subscribe((data: any[])=>{
      this.OrdersDataListByUser = data;
      console.warn(data)
    })
  }
}
