import { Component } from '@angular/core';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { OrderService } from '../Shared/Services/order.service';
import { BookService } from '../Shared/Services/book.service';
import { Ibooks } from '../Shared/Interface/Ibooks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constant } from '../Shared/Interface/constant';
import { Router } from '@angular/router';
import { IDueEntryModel } from '../Shared/Interface/IDueEntryModel';

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
  isApproved: boolean = false;
  dueEntryModel : IDueEntryModel= new IDueEntryModel();
  isReturnBook:boolean=false;
  updateBookDataStock: Ibooks = new Ibooks();
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
      this.isReturnBook=true;
      return this.statusChangeValue = "badge bg-warning";
    } else if (statusValue === "Rejected") {
      return this.statusChangeValue = "badge bg-danger";
    } else  if(statusValue === Constant.RETURN)
    {
      this.isReturnBook=true;
      return this.statusChangeValue = "badge bg-warning";
    }else{
      this.isReturnBook=false;
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
        this.datalist = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == Constant.RETURN || x.status==Constant.REJECTED);
        this.OrdersDataList = data.filter(x => x.status == "Created" || x.status == "Approved" || x.status == Constant.RETURN || x.status==Constant.REJECTED);
        this.calculateDueAndCreateNewEntry(data);
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
    this.updateFormData.remark = Constant.DEFAULTCMT;
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

  onDeleteAction(selectedRowData: any) {
    this._orderService.deleteOrder(selectedRowData.id).subscribe((data: any) => {
      if (data) {
        this.getOrderHistoryByUserID();
        this.closeAndRedirect()
      }
    })
  }

  calculateDueAndCreateNewEntry(data: any[]) {

    data.forEach(record => {
      const today = new Date();
      const date1 = new Date(record.submittedDate);
      console.warn(date1)
      const diffInMs = Math.abs(today.getTime() - date1.getTime());
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays < 1 && (record.status!=Constant.CREATED || record.status!=Constant.REJECTED)) {
        this.updateFormData.id = record.id;
          this.updateFormData.bookid = record.bookid;
          this.updateFormData.uid = record.uid;
          this.updateFormData.studentName = record.studentName;
          this.updateFormData.bookName = record.bookName;
          this.updateFormData.orderId = record.orderId;
          this.updateFormData.author = record.author;
          this.updateFormData.qty = record.qty;
          this.updateFormData.status = Constant.UNPAID;
          this.updateFormData.remark = record.remark;
          this.updateFormData.issueDate = record.issueDate;
          this.updateFormData.submittedDate = record.submittedDate;
          this.updateFormData.dueamount = Number(50) * record.qty;

          console.warn(this.updateFormData)

          this._orderService.createDueEntry(this.updateFormData).subscribe(data=>{
            if(data){
              console.warn(data)
            }
          })

      }
    });
  }

  onReturnBookAction(selectedRowData :any){
    let todyasDate = new Date();
    this.updateFormData.id = selectedRowData.id;

    this.updateFormData.bookid = selectedRowData.bookid;
    this.updateFormData.uid = selectedRowData.uid;
    this.updateFormData.studentName = selectedRowData.studentName;
    this.updateFormData.bookName = selectedRowData.bookName;
    this.updateFormData.orderId = selectedRowData.orderId;
    this.updateFormData.author = selectedRowData.author;
    this.updateFormData.qty = Number(selectedRowData.qty);
    this.updateFormData.status = Constant.RETURN
    this.updateFormData.remark = Constant.RETURNCMT;
    this.updateFormData.issueDate = selectedRowData.issueDate;
    this.updateFormData.submittedDate = new Date();
    console.warn(this.updateFormData);
    this._orderService.updateOrder(this.updateFormData).subscribe((data: any) => {
      if (data) {
       
        this.updateMasterStock(this.updateFormData.bookid, this.updateFormData.qty);
        
      }
    });
  }

  updateMasterStock(bookid: number, qty: number) {

    this._booksService.getStockByBookId(bookid).subscribe((data: Ibooks) => {
      if (data) {
        this.updateBookDataStock = data;
        this.updateBookDataStock.qty =  data.qty + qty;

        if (this.updateBookDataStock.qty != null) {
          this._booksService.updateStock(this.updateBookDataStock).subscribe((data: any) => {
            this.getOrderHistoryByUserID();
          })
        }
      }
    })


  }
}
