import { Component } from '@angular/core';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { OrderService } from '../Shared/Services/order.service';
import { BookService } from '../Shared/Services/book.service';
import { Ibooks } from '../Shared/Interface/Ibooks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constant } from '../Shared/Interface/constant';
import { Router } from '@angular/router';

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
  updateOrderFrm!: FormGroup;
  updateFormData: IorderDetails = new IorderDetails();
  constructor(private _orderService: OrderService, private _booksService: BookService, private _fb: FormBuilder,
    private _rtr: Router) {
  }

  ngOnInit(): void {
    this.loginUserId = localStorage.getItem('uid');

    this.formInitilization();
    this.getOrderHistoryByUserID();
  }

  formInitilization() {
    this.updateOrderFrm = this._fb.group({
      id: [''],
      uid: [''],
      bookid: [''],
      studentName: [''],
      bookName: [''],
      author: [''],
      qty: [''],
      status: [''],
      remark: [''],
      issueDate: [''],
      submittedDate: [''],
      orderId: ['']
    });
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

    this._orderService.getOrderHistoryByUserID(this.loginUserId).subscribe((data: any[]) => {
      if (data) {
        this.datalist = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
        this.OrdersDataList = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == "Rejected");
      } else {
        this.datalist = [];
      }
    })
  }

  onEditBtnAction(selectedRowData: any) {
    console.warn(selectedRowData)
    this.updateOrderFrm.setValue(selectedRowData);
  }


  updateOrderDetailsAction() {
    this.updateFormData.id = this.updateOrderFrm.value.id;

    this.updateFormData.bookid = this.updateOrderFrm.value.bookid;
    this.updateFormData.uid = this.updateOrderFrm.value.uid;
    this.updateFormData.studentName = this.updateOrderFrm.value.studentName;
    this.updateFormData.bookName = this.updateOrderFrm.value.bookName;
    this.updateFormData.orderId = this.updateOrderFrm.value.orderId;
    this.updateFormData.author = this.updateOrderFrm.value.author;
    this.updateFormData.qty = Number(this.updateOrderFrm.value.qty);
    this.updateFormData.status = Constant.CREATED
    this.updateFormData.remark = "";
    this.updateFormData.issueDate = this.updateOrderFrm.value.issueDate;;
    this.updateFormData.submittedDate = this.updateOrderFrm.value.submittedDate;

    console.warn(this.updateFormData);
    this._orderService.updateOrder(this.updateFormData).subscribe((data: any) => {
      if (data) {
        this.getOrderHistoryByUserID();
        this.closeAndRedirect()
      }
    });
  }


  closeAndRedirect() {

    this._rtr.navigate(['/order-history']);
  }

  onDeleteAction(selectedRowData :any) {
    this._orderService.deleteOrder(selectedRowData.id).subscribe((data: any) => {
      if (data) {
        this.getOrderHistoryByUserID();
        this.closeAndRedirect()
      }
    })
  }
}
