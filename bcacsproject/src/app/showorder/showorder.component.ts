import { Component } from '@angular/core';
import { ILoginInfo } from '../Shared/Interface/ILoginInfo';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { AdmindashboardService } from '../Shared/Services/admindashboard.service';
import { OrderService } from '../Shared/Services/order.service';
import { Constant } from '../Shared/Interface/constant';
import { Router } from '@angular/router';
import { BookService } from '../Shared/Services/book.service';
import { Ibooks } from '../Shared/Interface/Ibooks';


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
  isDataLoaded: boolean = false;
  statusChangeValue !: string;
  responseMessage: string = "";
  isNotification: boolean = false;
  updateFormData: IorderDetails = new IorderDetails();
  bookid: number = 2;
  qty: number = 2;
  updateBookDataStock: Ibooks = new Ibooks();

  constructor(private _adservice: AdmindashboardService,
    private _orderService: OrderService, private _rtr: Router, private _bookService: BookService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }
    this.getAllNewOrders();
    this.isNotification = false;
  }

  getAllNewOrders() {
    this._orderService.getAvailableBooks().subscribe(userdata => {

      console.warn(userdata)
      if (userdata) {
        this.isDataLoaded = false;
        this.datalist = userdata.filter(x => x.status == "Created");
        this.OrdersDataList = userdata.filter(x => x.status == "Created");
      } else {
        this.datalist = [];
        this.isDataLoaded = true;
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

  onApprovedAction(selectedRowData: any) {

    let todyasDate = new Date();
    this.updateFormData.id = selectedRowData.id;

    this.updateFormData.bookid = selectedRowData.bookid;
    this.updateFormData.uid = selectedRowData.uid;
    this.updateFormData.studentName = selectedRowData.studentName;
    this.updateFormData.bookName = selectedRowData.bookName;
    this.updateFormData.orderId = selectedRowData.orderId;
    this.updateFormData.author = selectedRowData.author;
    this.updateFormData.qty = Number(selectedRowData.qty);
    this.updateFormData.status = Constant.APPROVED
    this.updateFormData.remark = Constant.APPROVEDCMT;
    this.updateFormData.issueDate = selectedRowData.issueDate;;
    this.updateFormData.submittedDate = new Date(todyasDate.setDate(todyasDate.getDate() + 7));
    console.warn(this.updateFormData);
    this._orderService.updateOrder(this.updateFormData).subscribe((data: any) => {
      if (data) {
        this.responseMessage = Constant.APPROVEDMSG
        this.updateMasterStock(this.updateFormData.bookid, this.updateFormData.qty);
        this.showNotofication(this.responseMessage);
        this._rtr.navigateByUrl('/show-order')
      }
    });

  }



  onRejectAction(selectedRowData: any) {
    let todyasDate = new Date();
    this.updateFormData.id = selectedRowData.id;
    this.updateFormData.bookid = selectedRowData.bookid;
    this.updateFormData.uid = selectedRowData.uid;
    this.updateFormData.studentName = selectedRowData.studentName;
    this.updateFormData.bookName = selectedRowData.bookName;
    this.updateFormData.orderId = selectedRowData.orderId;
    this.updateFormData.author = selectedRowData.author;
    this.updateFormData.qty = Number(selectedRowData.qty);
    this.updateFormData.status = Constant.REJECTED
    this.updateFormData.remark = Constant.REJECTEDCMT;
    this.updateFormData.issueDate = selectedRowData.issueDate;;
    this.updateFormData.submittedDate = new Date(todyasDate.setDate(todyasDate.getDate() + 0));
    console.warn(this.updateFormData);
    this._orderService.updateOrder(this.updateFormData).subscribe((data: any) => {
      if (data) {
        this.responseMessage = Constant.REJECTEDMSG
        this.showNotofication(this.responseMessage);
        this._rtr.navigateByUrl('/show-order')
      }
    });
  }


  showNotofication(message: string) {

    var that = this;
    this.responseMessage = message;
    this.isNotification = true;

    setTimeout(function () {
      that.isNotification = false;
      that.getAllNewOrders();

    }, 3000);

  }

  updateMasterStock(bookid: number, qty: number) {

    this._bookService.getStockByBookId(bookid).subscribe((data: Ibooks) => {
      if (data) {
        this.updateBookDataStock = data;
        this.updateBookDataStock.qty =  data.qty - qty;

        if (this.updateBookDataStock.qty != null) {
          this._bookService.updateStock(this.updateBookDataStock).subscribe(data => {
            console.warn(data);
          })
        }
      }
    })


  }

}
